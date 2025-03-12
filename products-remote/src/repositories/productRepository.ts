import { httpClient } from '@/utils/httpClient';

export const productRepository = {
  async fetchProducts() {
    return httpClient.get('/products');
  },
};
