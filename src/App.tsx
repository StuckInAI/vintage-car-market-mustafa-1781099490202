import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import ListingsPage from '@/pages/ListingsPage';
import ListingDetailPage from '@/pages/ListingDetailPage';
import SellPage from '@/pages/SellPage';
import AuctionPage from '@/pages/AuctionPage';
import AuctionDetailPage from '@/pages/AuctionDetailPage';
import CreateAuctionPage from '@/pages/CreateAuctionPage';
import AuthPage from '@/pages/AuthPage';
import { seedDemoData } from '@/lib/seedData';

export default function App() {
  useEffect(() => {
    seedDemoData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="listings/:id" element={<ListingDetailPage />} />
          <Route path="sell" element={<SellPage />} />
          <Route path="auctions" element={<AuctionPage />} />
          <Route path="auctions/:id" element={<AuctionDetailPage />} />
          <Route path="auctions/create" element={<CreateAuctionPage />} />
          <Route path="auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
