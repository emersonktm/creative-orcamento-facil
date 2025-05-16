
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface QuoteData {
  name: string;
  date: string;
  document: string;
  phone: string;
  address: string;
  paymentMethod: string;
  installments: string;
  observations: string;
  discount: number;
  products: Product[];
  total: number;
  orderNumber: string;
}
