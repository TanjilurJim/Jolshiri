import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { Toaster }   from 'react-hot-toast';
import FlashMessage  from '@/components/ui/flash-message';
import type { BreadcrumbItem } from '@/types';
import type { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
    <FlashMessage />                            {/* ① show flash → toast */}
    {children}
    <Toaster position="top-right" reverseOrder={false} />  {/* single global toaster */}
  </AppLayoutTemplate>
);
