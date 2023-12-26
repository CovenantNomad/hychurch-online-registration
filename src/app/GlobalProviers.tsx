'use client'

import { Toaster } from '@/components/ui/toaster';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RecoilRoot } from 'recoil';

const GlobalProviers = ({
  children
}: {
  children: React.ReactNode
}) => {
  const queryClient = new QueryClient()

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default GlobalProviers;
