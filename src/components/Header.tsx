
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 py-2">
      <div className="flex items-center gap-4">
        <img 
          src="https://i.ibb.co/K07qbsY/LG-CREATIVE-512x512.png" 
          alt="Logo Creative Comunicações" 
          className="h-16 w-auto"
        />
        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
      </div>
      
      <a 
        href="/export.html" 
        download="orcamento-creative.html"
        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Exportar como HTML
      </a>
    </header>
  );
};

export default Header;
