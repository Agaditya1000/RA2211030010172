import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SWRConfig } from 'swr';
import Layout from './components/Layout';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import Feed from './pages/Feed';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <SWRConfig
        value={{
          refreshInterval: 0,
          revalidateOnFocus: false,
          shouldRetryOnError: true,
          errorRetryCount: 3,
          errorRetryInterval: 1000,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<TopUsers />} />
              <Route path="trending" element={<TrendingPosts />} />
              <Route path="feed" element={<Feed />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SWRConfig>
    </ErrorBoundary>
  );
}

export default App;