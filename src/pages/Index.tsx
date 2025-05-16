
import React, { useState } from 'react';
import Header from '../components/Header';
import QuoteForm from '../components/QuoteForm';
import ServiceOrder from '../components/ServiceOrder';
import { QuoteData } from '../types/types';

const Index = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(true);
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);

  const handleQuoteSubmit = (data: QuoteData) => {
    console.log("Form submitted, switching to service order view", data);
    setQuoteData(data);
    setShowQuoteForm(false);
  };

  const handleBack = () => {
    setShowQuoteForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {showQuoteForm ? (
          <>
            <Header title="ORÇAMENTO DE SERVIÇOS" />
            <div className="bg-white p-6 rounded-lg shadow-md">
              <QuoteForm onSubmit={handleQuoteSubmit} />
            </div>
          </>
        ) : (
          quoteData && <ServiceOrder quoteData={quoteData} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default Index;
