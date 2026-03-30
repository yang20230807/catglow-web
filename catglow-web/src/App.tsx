import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { Search } from './pages/Search/Search';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/search" element={<Layout><Search /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
