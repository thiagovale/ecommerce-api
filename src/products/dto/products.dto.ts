export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}
