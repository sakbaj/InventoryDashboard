import apiClient from '@/lib/axios';

/**
 * API call for fetching inventory.
 */
export const fetchInventoryData = async (filters = {}) => {
  return apiClient.get('/api/inventory', { params: filters });
};
