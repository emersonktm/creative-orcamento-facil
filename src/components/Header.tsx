
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex items-center gap-4 mb-6 py-2">
      <img 
        src="https://i.ibb.co/K07qbsY/LG-CREATIVE-512x512.png" 
        alt="Logo Creative Comunicações" 
        className="h-16 w-auto"
      />
      <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
