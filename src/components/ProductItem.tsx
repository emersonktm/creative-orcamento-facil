
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Product } from '../types/types';

interface ProductItemProps {
  product: Product;
  onRemove: (id: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onRemove }) => {
  return (
    <li className="bg-gray-50 p-3 rounded-md mb-2 flex justify-between items-center">
      <span className="flex-grow">
        {product.name} - {product.quantity}un - R${product.total.toFixed(2)}
      </span>
      <button 
        onClick={() => onRemove(product.id)}
        className="text-red-500 hover:text-red-700 bg-transparent border-none p-1 rounded-full hover:bg-gray-200 transition-colors"
        type="button"
        aria-label="Remover produto"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </li>
  );
};

export default ProductItem;
