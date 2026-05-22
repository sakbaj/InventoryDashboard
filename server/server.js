import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Initialize lowdb with default data
const defaultData = { 
  inventory: [
    { id: 'ITM-001', name: 'Enterprise Server Rack 42U', category: 'Hardware', stock: 12, price: 1200.00, status: 'In Stock' },
    { id: 'ITM-002', name: 'Cisco Catalyst 9300', category: 'Networking', stock: 4, price: 3500.00, status: 'Low Stock' },
    { id: 'ITM-003', name: 'Dell Latitude 7420', category: 'Laptops', stock: 45, price: 1450.00, status: 'In Stock' },
    { id: 'ITM-004', name: 'Logitech MX Master 3', category: 'Peripherals', stock: 0, price: 99.99, status: 'Out of Stock' },
    { id: 'ITM-005', name: 'AWS Outposts Server', category: 'Hardware', stock: 2, price: 25000.00, status: 'Low Stock' },
    { id: 'ITM-006', name: 'Cat6 Ethernet Cable (1000ft)', category: 'Cables', stock: 120, price: 150.00, status: 'In Stock' },
  ],
  orders: [
    { id: 'ORD-2023-001', customer: 'Reliance Retail', date: '2023-10-25', status: 'Delivered', total: '₹1,20,000' },
    { id: 'ORD-2023-002', customer: 'Tata Consultancy', date: '2023-10-26', status: 'Processing', total: '₹3,45,000' },
    { id: 'ORD-2023-003', customer: 'Infosys Tech', date: '2023-10-26', status: 'Pending', total: '₹89,000' },
    { id: 'ORD-2023-004', customer: 'Wipro Limited', date: '2023-10-27', status: 'Cancelled', total: '₹5,00,000' },
    { id: 'ORD-2023-005', customer: 'HDFC Bank', date: '2023-10-28', status: 'Delivered', total: '₹12,40,000' },
  ],
  customers: [
    { id: 'CUST-001', name: 'Reliance Retail', contact: 'Ramesh Sharma', email: 'ramesh.sharma@reliance.in', phone: '+91 98765 43210', location: 'Mumbai, India' },
    { id: 'CUST-002', name: 'Tata Consultancy', contact: 'Priya Patel', email: 'p.patel@tcs.com', phone: '+91 99887 76655', location: 'Bengaluru, India' },
    { id: 'CUST-003', name: 'Infosys Tech', contact: 'Arjun Reddy', email: 'arjun.reddy@infosys.com', phone: '+91 91234 56789', location: 'Hyderabad, India' },
    { id: 'CUST-004', name: 'Wipro Limited', contact: 'Sneha Gupta', email: 'sneha.gupta@wipro.com', phone: '+91 90001 22334', location: 'Pune, India' },
  ],
  dashboard: [
    { name: 'Jan', revenue: 4000, orders: 2400 },
    { name: 'Feb', revenue: 3000, orders: 1398 },
    { name: 'Mar', revenue: 2000, orders: 9800 },
    { name: 'Apr', revenue: 2780, orders: 3908 },
    { name: 'May', revenue: 1890, orders: 4800 },
    { name: 'Jun', revenue: 2390, orders: 3800 },
    { name: 'Jul', revenue: 3490, orders: 4300 },
  ]
};

let db;

async function initDB() {
  if (process.env.VERCEL) {
    db = {
      data: defaultData,
      read: async () => {},
      write: async () => {}
    };
  } else {
    db = await JSONFilePreset('db.json', defaultData);
  }
}

// Middleware to ensure DB is initialized
app.use(async (req, res, next) => {
  if (!db) {
    await initDB();
  }
  next();
});

// API Routes

// --- INVENTORY ---
app.get('/api/inventory', async (req, res) => {
  await db.read();
  let items = db.data.inventory;

  const { search, category } = req.query;
  
  if (search) {
    const query = search.toLowerCase();
    items = items.filter(item => 
      item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query)
    );
  }
  if (category && category !== 'All') {
    items = items.filter(item => item.category === category);
  }

  res.json({ items, total: items.length });
});

app.post('/api/inventory', async (req, res) => {
  await db.read();
  const newItem = { id: `ITM-00${db.data.inventory.length + 1}`, ...req.body };
  db.data.inventory.push(newItem);
  await db.write();
  res.status(201).json(newItem);
});

// --- ORDERS ---
app.get('/api/orders', async (req, res) => {
  await db.read();
  let orders = db.data.orders;
  
  const { search } = req.query;
  if (search) {
    const query = search.toLowerCase();
    orders = orders.filter(o => 
      o.id.toLowerCase().includes(query) || 
      o.customer.toLowerCase().includes(query)
    );
  }

  res.json(orders);
});

// --- CUSTOMERS ---
app.get('/api/customers', async (req, res) => {
  await db.read();
  let customers = db.data.customers;
  
  const { search } = req.query;
  if (search) {
    const query = search.toLowerCase();
    customers = customers.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.email.toLowerCase().includes(query) ||
      c.id.toLowerCase().includes(query)
    );
  }

  res.json(customers);
});

app.post('/api/customers', async (req, res) => {
  await db.read();
  const newCustomer = { 
    id: `CUST-00${db.data.customers.length + 1}`, 
    ...req.body 
  };
  db.data.customers.push(newCustomer);
  await db.write();
  res.status(201).json(newCustomer);
});

// --- DASHBOARD ---
app.get('/api/dashboard', async (req, res) => {
  await db.read();
  const stats = {
    totalRevenue: '₹45,23,189.00',
    activeOrders: '1,245',
    lowStockItems: db.data.inventory.filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock').length,
    newCustomers: '892',
    chartData: db.data.dashboard
  };
  res.json(stats);
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  initDB().then(() => {
    app.listen(port, () => {
      console.log(`Backend server running at http://localhost:${port}`);
    });
  });
} else {
  initDB();
}

export default app;
