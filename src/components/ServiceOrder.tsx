
import React from 'react';
import { QuoteData } from '../types/types';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface ServiceOrderProps {
  quoteData: QuoteData;
  onBack: () => void;
}

const ServiceOrder: React.FC<ServiceOrderProps> = ({ quoteData, onBack }) => {
  return (
    <div className="container mx-auto max-w-3xl bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-4">
            <img 
              src="https://i.ibb.co/K07qbsY/LG-CREATIVE-512x512.png" 
              alt="Logo" 
              className="h-12 w-auto"
            />
            <h2 className="text-xl font-bold">ORDEM DE SERVIÇOS</h2>
          </div>
          <div className="mt-4 text-sm">
            <p><strong>Nome:</strong> {quoteData.name}</p>
            <p><strong>CPF/CNPJ:</strong> {quoteData.document}</p>
            <p><strong>Endereço:</strong> {quoteData.address}</p>
            <p><strong>Telefone:</strong> {quoteData.phone}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-sm">Nº Ordem</p>
          <p className="font-mono">{quoteData.orderNumber}</p>
          <p className="text-sm mt-2">Data: {new Date(quoteData.date).toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      <div className="border border-gray-300 rounded-md overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left w-20">Quant.</th>
              <th className="py-2 px-4 text-left">Descrição dos Serviços</th>
              <th className="py-2 px-4 text-right w-28">Valor</th>
            </tr>
          </thead>
          <tbody>
            {quoteData.products.map((product, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-2 px-4 border-t border-gray-200">{product.quantity}un</td>
                <td className="py-2 px-4 border-t border-gray-200">{product.name}</td>
                <td className="py-2 px-4 text-right border-t border-gray-200">R${product.total.toFixed(2)}</td>
              </tr>
            ))}
            {quoteData.discount > 0 && (
              <tr className="bg-gray-50">
                <td className="py-2 px-4 border-t border-gray-200"></td>
                <td className="py-2 px-4 border-t border-gray-200 font-medium">Desconto</td>
                <td className="py-2 px-4 text-right border-t border-gray-200 text-red-600">-R${quoteData.discount.toFixed(2)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center text-sm mb-6">
        <p>Este orçamento é válido por apenas 15 dias,</p>
        <p>após o prazo do mesmo vencer será realizado um novo orçamento com valores atualizados.</p>
      </div>

      <h2 className="text-center text-xl font-bold mb-4">
        VALOR TOTAL: R${quoteData.total.toFixed(2)}
      </h2>
      
      <p className="mb-6">O pagamento será realizado por: <strong>{quoteData.paymentMethod}</strong> em <strong>{quoteData.installments}</strong></p>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-4">
        <div className="text-center">
          <p className="mb-2">PAGUE ATRAVÉS DO NOSSO PIX:</p>
          <img 
            src="https://i.ibb.co/M1B1mDL/Qr-Code-Pix-512x512.png" 
            alt="QR Code" 
            className="h-32 w-auto mx-auto"
          />
          <p className="text-sm mt-2">
            Assim que o pagamento for<br />
            confirmado iniciaremos<br />
            a produção do seu material.
          </p>
        </div>
        
        <div className="text-right">
          <p className="font-bold mb-2">Dúvidas:</p>
          <p><strong>62 9 9873-7170</strong></p>
          <p>@creative.comunicacoes</p>
          <p>www.creativecomunicacoes.com.br</p>
          
          <div className="mt-6 flex gap-4 justify-end">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="no-print"
            >
              Voltar ao formulário
            </Button>
            <Button 
              onClick={() => window.print()}
              className="no-print"
            >
              <Printer className="mr-2 h-4 w-4" /> Imprimir
            </Button>
          </div>
        </div>
      </div>
      
      {quoteData.observations && (
        <div className="mt-4 border-t pt-4">
          <h3 className="font-medium mb-2">Observações:</h3>
          <p className="text-sm">{quoteData.observations}</p>
        </div>
      )}
    </div>
  );
};

export default ServiceOrder;
