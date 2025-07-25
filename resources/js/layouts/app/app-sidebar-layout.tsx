import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { Toaster } from '@/components/ui/sonner';
export default function AppSidebarLayout({ 
    children, 
    breadcrumbs = [] 
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent 
                variant="sidebar" 
                className="overflow-x-hidden bg-background text-foreground"
            >
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                <div className="flex-1 p-6 bg-background">
                    {children}
                </div>
            </AppContent>
        </AppShell>
    );
}