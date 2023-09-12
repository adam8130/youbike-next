import React from 'react';
import { Header } from '@/layout/components/Header';

function LayoutWrapper({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export const getHomeLayout = (page) => (
  <>
    <LayoutWrapper>{page}</LayoutWrapper>
  </>
);
