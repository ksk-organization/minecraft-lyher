import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    Package,
    Gamepad2,
    Layers,
    Search,
    ExternalLink,
    Ticket
} from 'lucide-react';
import { memo, useMemo } from 'react';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import AppLogo from './app-logo';
import type { NavItem } from '@/types';

// Updated Nav items with branding-specific icons
const MAIN_NAV_ITEMS: NavItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutGrid },
    { title: 'Products', href: '/admin/products', icon: Package },
    { title: 'Game Modes', href: '/admin/game-modes', icon: Gamepad2 }, // Replaced with Gamepad icon
    { title: 'Categories', href: '/admin/categories', icon: Layers },
    { title: 'Coupon', href: '/admin/coupons', icon: Ticket },
];

const FOOTER_NAV_ITEMS: NavItem[] = [
    { title: 'Public Store', href: '/', icon: ExternalLink },
    { title: 'Documentation', href: 'https://laravel.com/docs', icon: BookOpen },
];

export const AppSidebar = memo(() => {
    const { url } = usePage();

    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            // Theme Injection: Deep dark background matching the landing page
            className="border-r border-white/5 bg-[#0a0a0a]"
        >
            <SidebarHeader className="py-6">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent active:bg-transparent">
                            <Link
                                href="/admin/dashboard"
                                prefetch={['mount', 'hover']}
                                className="flex items-center justify-center"
                            >
                                {/* AppLogo should now use the #FF5500 orange from your landing page */}
                                <AppLogo className="w-auto h-10 transition-transform duration-300 hover:scale-105" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2">
                {/* Visual Separator: Minecraft-style glow effect */}
                <div className="mx-2 mb-4 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

                <NavMain items={MAIN_NAV_ITEMS} />
            </SidebarContent>

            <SidebarFooter className="border-t border-white/5 bg-[#0d0d0d]/50 p-4">
                <NavFooter items={FOOTER_NAV_ITEMS} />
                <div className="mt-4 rounded-xl bg-gradient-to-b from-white/5 to-transparent p-1">
                    <NavUser />
                </div>
            </SidebarFooter>
        </Sidebar>
    );
});

AppSidebar.displayName = 'AppSidebar';
