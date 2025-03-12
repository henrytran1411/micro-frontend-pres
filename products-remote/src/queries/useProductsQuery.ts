import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/productService';

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });
};
