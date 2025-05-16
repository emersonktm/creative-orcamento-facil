import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product, QuoteData } from '../types/types';
import { PlusCircle } from 'lucide-react';
import ProductList from './ProductList';

// Product options with their prices
const PRODUCTS = [
  { value: "170", label: "Cartão de Visita Verniz Total 250g FV 4x0 1.000un" },
  { value: "170", label: "Cartão de Visita Verniz Total 300g FV 4x0 1.000un" },
  { value: "170", label: "Cartão de Visita Verniz Total F 4x1 1.000un" },
  { value: "170", label: "Cartão de Visita Verniz Localizado 250g FV 4x4 1.000un" },
  { value: "170", label: "Cartão de Visita Verniz Localizado 300g FV 4x4 1.000un" },
  { value: "80", label: "Adesivo Metro Quadrado Leitoso" },
  { value: "80", label: "Adesivo Metro Quadrado Transparente" },
  { value: "20", label: "Adesivo A4 Leitoso" },
  { value: "80", label: "Lona Metro Quadrado" },
  { value: "300", label: "Convite de Casamento Clássico 250un" },
  { value: "250", label: "Papel Timbrado Sulfite 90g 4x0 500un" },
  { value: "10", label: "Cardápio A4 4x0" },
  { value: "20", label: "Cardápio A4 4x4" },
  { value: "15", label: "Cardápio A3 4x0" },
  { value: "25", label: "Cardápio A3 4x4" },
  { value: "20", label: "Blocos 15x21 100Fls 4un" },
  { value: "25", label: "Blocos 15x21 100Fls 8un" },
  { value: "28", label: "Blocos 15x21 100Fls 12un" },
  { value: "30", label: "Blocos 20x30 100Fls 4un" },
  { value: "35", label: "Blocos 20x30 100Fls 8un" },
  { value: "38", label: "Blocos 20x30 100Fls 12un" },
];

// Payment methods
const PAYMENT_METHODS = ["PIX", "DINHEIRO", "CARTÃO"];

// Installment options
const INSTALLMENTS = ["1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x", "11x", "12x"];

// Finishing options
const FINISHINGS = ["Sem Acabamento", "Com Acabamento", "Bordas Arredondadas", "Com Ilhós"];

// Quantity options
const QUANTITIES = [
  { value: "1", label: "1un" },
  { value: "2", label: "2un" },
  { value: "3", label: "3un" },
  { value: "4", label: "4un" },
  { value: "5", label: "5un" },
];

interface QuoteFormProps {
  onSubmit: (data: QuoteData) => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);
  const [installments, setInstallments] = useState(INSTALLMENTS[0]);
  const [observations, setObservations] = useState('');
  
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].value);
  const [selectedProductName, setSelectedProductName] = useState(PRODUCTS[0].label);
  const [selectedQuantity, setSelectedQuantity] = useState(QUANTITIES[0].value);
  const [finishing, setFinishing] = useState(FINISHINGS[0]);
  const [discount, setDiscount] = useState(0);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [nextId, setNextId] = useState(1);
  const [total, setTotal] = useState(0);

  const handleAddProduct = () => {
    const productPrice = parseFloat(selectedProduct);
    const quantity = parseInt(selectedQuantity);
    const productTotal = productPrice * quantity;
    
    const newProduct: Product = {
      id: nextId,
      name: selectedProductName,
      price: productPrice,
      quantity: quantity,
      total: productTotal
    };
    
    setProducts([...products, newProduct]);
    setNextId(nextId + 1);
    
    // Update total
    const newTotal = total + productTotal;
    setTotal(newTotal);
  };
  
  const handleRemoveProduct = (id: number) => {
    const productToRemove = products.find(p => p.id === id);
    if (productToRemove) {
      setTotal(total - productToRemove.total);
    }
    setProducts(products.filter(p => p.id !== id));
  };
  
  const handleProductChange = (value: string) => {
    setSelectedProduct(value);
    const product = PRODUCTS.find(p => p.value === value);
    if (product) {
      setSelectedProductName(product.label);
    }
  };
  
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setDiscount(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the order number
    const orderNumber = `#${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`;
    
    const finalTotal = Math.max(0, total - discount);
    
    const quoteData: QuoteData = {
      name,
      date,
      document,
      phone,
      address,
      paymentMethod,
      installments,
      observations,
      discount,
      products,
      total: finalTotal,
      orderNumber
    };
    
    // Ensure we have at least one product before submitting
    if (products.length > 0) {
      onSubmit(quoteData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Nome completo" 
            required 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Data</Label>
            <Input 
              id="date" 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="document">CPF/CNPJ</Label>
            <Input 
              id="document" 
              value={document} 
              onChange={(e) => setDocument(e.target.value)} 
              placeholder="000.000.000-00" 
              required 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="(00) 00000-0000" 
              required 
            />
          </div>
          <div>
            <Label htmlFor="address">Endereço</Label>
            <Input 
              id="address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              placeholder="Rua, número, bairro, cidade" 
              required 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="payment">Forma de Pagamento</Label>
            <Select 
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PAYMENT_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="installments">Parcelas</Label>
            <Select 
              value={installments}
              onValueChange={(value) => setInstallments(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o número de parcelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {INSTALLMENTS.map((installment) => (
                    <SelectItem key={installment} value={installment}>
                      {installment}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-4">Adicionar produtos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="product">Produto</Label>
            <Select 
              value={selectedProduct}
              onValueChange={handleProductChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PRODUCTS.map((product) => (
                    <SelectItem key={product.label} value={product.value}>
                      {product.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity">Quantidade</Label>
            <Select 
              value={selectedQuantity}
              onValueChange={setSelectedQuantity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a quantidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {QUANTITIES.map((quantity) => (
                    <SelectItem key={quantity.value} value={quantity.value}>
                      {quantity.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="finishing">Acabamento</Label>
            <Select 
              value={finishing}
              onValueChange={setFinishing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o acabamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FINISHINGS.map((finish) => (
                    <SelectItem key={finish} value={finish}>
                      {finish}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="discount">Desconto (R$)</Label>
            <Input 
              id="discount" 
              type="number" 
              min="0"
              step="0.01"
              value={discount || ''} 
              onChange={handleDiscountChange} 
              placeholder="0,00" 
            />
          </div>
        </div>
        
        <Button 
          type="button" 
          onClick={handleAddProduct}
          className="w-full mb-6"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Produto
        </Button>
        
        <ProductList 
          products={products} 
          onRemoveProduct={handleRemoveProduct} 
          total={Math.max(0, total - discount)}
        />
      </div>
      
      <div>
        <Label htmlFor="observations">Observações Adicionais</Label>
        <Textarea 
          id="observations" 
          value={observations} 
          onChange={(e) => setObservations(e.target.value)} 
          placeholder="Informações adicionais sobre o pedido..." 
          rows={4}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={products.length === 0}
      >
        Gerar Orçamento
      </Button>
    </form>
  );
};

export default QuoteForm;
