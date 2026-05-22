import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchInventory, 
  selectAllInventory, 
  selectInventoryStatus,
  selectInventoryError 
} from '../inventorySlice';
import { Search, Filter, AlertCircle, RefreshCcw } from 'lucide-react';
import { Skeleton } from '@/components/ui/Skeleton';
import clsx from 'clsx';

const CATEGORIES = ['All', 'Hardware', 'Networking', 'Laptops', 'Peripherals', 'Cables'];

const InventoryTable = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectAllInventory);
  const status = useSelector(selectInventoryStatus);
  const error = useSelector(selectInventoryError);

  // Local state for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  // Fetch data with debounce simulation
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(fetchInventory({ category, search: searchTerm }));
    }, 300);
    return () => clearTimeout(delay);
  }, [dispatch, category, searchTerm]);

  const handleRetry = () => {
    dispatch(fetchInventory({ category, search: searchTerm }));
  };

  // derived state for client side display (even though we simulate server-side in thunk)
  // useMemo ensures we don't re-compute unless items array changes
  const tableContent = useMemo(() => {
    if (status === 'loading') {
      return Array.from({ length: 5 }).map((_, idx) => (
        <tr key={idx} className="border-b border-gray-100">
          <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-20" /></td>
          <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-48" /></td>
          <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
          <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-12" /></td>
          <td className="px-6 py-4 whitespace-nowrap"><Skeleton className="h-4 w-24" /></td>
        </tr>
      ));
    }

    if (items.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
            No inventory items found matching your criteria.
          </td>
        </tr>
      );
    }

    return items.map((item) => (
      <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors last:border-0">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{item.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{item.name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.category}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-semibold">{item.stock}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={clsx(
            "px-2.5 py-1 text-xs font-medium rounded-full",
            item.status === 'In Stock' && "bg-green-100 text-green-800",
            item.status === 'Low Stock' && "bg-yellow-100 text-yellow-800",
            item.status === 'Out of Stock' && "bg-red-100 text-red-800"
          )}>
            {item.status}
          </span>
        </td>
      </tr>
    ));
  }, [status, items]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
      {/* Toolbar */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="input-field pl-10"
            placeholder="Search by ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <select 
              className="bg-transparent text-sm text-gray-700 dark:text-gray-200 outline-none w-32 cursor-pointer [&>option]:dark:bg-gray-800"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button 
            onClick={handleRetry}
            className="p-2.5 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-primary-500 outline-none"
            title="Refresh Data"
          >
            <RefreshCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Error State */}
      {status === 'failed' && (
        <div className="p-4 m-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error loading inventory</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <th className="px-6 py-4 font-semibold">Item ID</th>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Stock</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {tableContent}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer Placeholder */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50">
        <span>Showing {items.length} results</span>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50" disabled>Prev</button>
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-white dark:hover:bg-gray-700 disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
