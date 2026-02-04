// resources/js/components/nav-main.tsx
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  isActive?: boolean;
}

interface NavMainProps {
  items: NavItem[];
}

export function NavMain({ items }: NavMainProps) {
  return (
    <SidebarMenu>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              isActive={item.isActive}
              className={cn(
                // Default state
                "group transition-all duration-200",
                // Active state - very important styles
                item.isActive && [
                  "bg-gradient-to-r from-orange-950/60 to-orange-900/40",
                  "text-orange-400 font-medium",
                  "border-l-4 border-orange-500",
                  "shadow-sm shadow-orange-900/30",
                  "hover:bg-orange-900/50",
                ],
                // Hover effect (also for non-active)
                !item.isActive && "hover:bg-white/5 hover:text-orange-300"
              )}
            >
              <Link href={item.href} className="flex items-center gap-3">
                {Icon && <Icon className={cn("h-5 w-5", item.isActive ? "text-orange-400" : "text-zinc-400 group-hover:text-orange-300")} />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}