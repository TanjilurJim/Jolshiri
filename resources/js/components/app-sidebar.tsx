import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BarChart, BookOpen, Building, Folder, Home, LandPlot, LayoutGrid, Map, UserRoundCog } from 'lucide-react';
import AppLogo from './app-logo';

// Updated real estate specific navigation items
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Properties',
        href: '/properties',
        icon: Home,
    },
    {
        title: 'Land Plots',
        href: '/land-plots',
        icon: LandPlot,
    },
    {
        title: 'Developments',
        href: '/developments',
        icon: Building,
    },
    {
        title: 'Site Maps',
        href: '/maps',
        icon: Map,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: BarChart,
    },

    {
        title: 'Permissions',
        href: '/admin/permissions',
        icon: Folder, // or use `Shield` or `Lock` for better visual cue
    },
    {
        title: 'Role Manager',
        href: '/admin/roles',
        icon: UserRoundCog,
    },
    {
        title: 'User',
        href: '/admin/users',
        icon: UserRoundCog,
    },
    {
        title: 'Civilian Plot Registration',
        href: '/civilianPlotRegistration',
        icon: BookOpen,
    },
    {
        title: 'Officer Plot Registration',
        href: '/officer-plot-registration',
        icon: BookOpen,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-sidebar-hover">
                            <Link href="/dashboard" prefetch>
                                <AppLogo className="text-primary" />
                                <span className="ml-2 text-xl font-bold text-primary"></span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} activeClassName="bg-primary text-primary-foreground" hoverClassName="hover:bg-primary/40" />
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border pt-4">
                <NavFooter items={footerNavItems} className="mt-auto" hoverClassName="hover:text-primary" />
                <NavUser className="mt-4" />
            </SidebarFooter>
        </Sidebar>
    );
}
