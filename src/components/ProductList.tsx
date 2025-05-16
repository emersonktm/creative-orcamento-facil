
import React from 'react';
import { Product } from '../types/types';
import ProductItem from './ProductItem';

interface ProductListProps {
  products: Product[];
  onRemoveProduct: (id: number) => void;
  total: number;
}

const ProductList: React.FC<ProductListProps> = ({ products, onRemoveProduct, total }) => {
  if (products.length === 0) {
    return (
      <div className="mt-4 mb-4">
        <p className="text-muted-foreground text-center py-6">
          Nenhum produto adicionado ao orçamento
        </p>
      </div>
    );
  }
  
  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Produtos adicionados:</h3>
      <ul className="product-list space-y-2">
        {products.map((product) => (
          <ProductItem 
            key={product.id} 
            product={product} 
            onRemove={onRemoveProduct} 
          />
        ))}
      </ul>
      
      <div className="mt-4 text-right">
        <p className="text-green-700 font-bold text-lg">
          VALOR TOTAL: R${total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductList;
