import React from 'react';

// Простой провайдер без TON Connect для разработки
const SimpleTonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return React.createElement(React.Fragment, {}, children);
};

export default SimpleTonProvider;