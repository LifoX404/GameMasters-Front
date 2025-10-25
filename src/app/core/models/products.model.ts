export interface Product {
  id: string;
  name: string;
  description: string;
  details: string;
  price: number;
  stock: number;
  imgUrl: string;
}

export interface UpdateProductRequest extends Omit<Product, 'id'> {
  categoryId: string;
}
