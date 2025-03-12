import { productRepository } from '@/repositories/productRepository';

export const productService = {
  async getProducts() {
    return await productRepository.fetchProducts();
  },
};
