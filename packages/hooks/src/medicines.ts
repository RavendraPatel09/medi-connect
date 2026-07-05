import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

export const useCreateListing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      name: string;
      manufacturer?: string;
      description?: string;
      price: number;
      quantity: number;
      expiry_date: string;
    }) => {
      // 1. Create the medicine first
      const medResponse = await api.post('/medicines/medicine', {
        name: data.name,
        manufacturer: data.manufacturer,
        description: data.description,
      });
      const medicineId = medResponse.data.id;

      // 2. Create the listing linked to the medicine
      const listingResponse = await api.post('/medicines/', {
        medicine_id: medicineId,
        price: data.price,
        quantity: data.quantity,
        expiry_date: new Date(data.expiry_date).toISOString(),
      });
      
      return listingResponse.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};
