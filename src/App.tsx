import { QueryClient, QueryClientProvider } from 'react-query';

import RoutesApp from './RoutesApp';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RoutesApp />
    </QueryClientProvider>
  );
}
