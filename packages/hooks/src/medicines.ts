import { useQuery } from '@tanstack/react-query';
import api from './api';

export const useListings = (skip = 0, limit = 100) => {
  return useQuery({
    queryKey: ['listings', skip, limit],
    queryFn: async () => {
      const response = await api.get(`/medicines/?skip=${skip}&limit=${limit}`);
      return response.data;
    },
  });
};
