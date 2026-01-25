import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import StoreLayout from './store/components/StoreLayout';
import BrandPage from './store/pages/BrandPage';
import ProductDetail from './store/pages/ProductDetail';
import StoreHome from './store/pages/StoreHome';

const AppStore: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<StoreHome />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/brand" element={<BrandPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppStore;

