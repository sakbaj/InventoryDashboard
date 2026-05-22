import React from 'react';
import InventoryTable from '@/features/inventory/components/InventoryTable';
import { Plus } from 'lucide-react';

const Inventory = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Inventory Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your enterprise stock, categories, and availability.</p>
        </div>
        <button className="btn-primary flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <InventoryTable />
    </div>
  );
};

export default Inventory;
