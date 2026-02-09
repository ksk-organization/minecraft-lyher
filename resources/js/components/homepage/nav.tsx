// resources/js/components/Navigation.tsx
import React from 'react';
import {
  Users,
  ArrowRight,
  Gamepad2,
  ShoppingCart,
  Home,
  MessageCircle,
  Send,
  ShoppingBasket,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function Navigation() {
  // Safely get order count from props (passed from backend)
  const { flash, orders_count = 0 } = usePage<{
    flash?: any;
    orders_count?: number;
  }>().props;

  // If you're still using flash.orders for some reason:
  // const orderCount = flash?.orders ?? orders_count ?? 0;
  const orderCount = orders_count; // ← preferred: dedicated prop

  return (
    <nav className="fixed top-6 z-50 flex w-full justify-center px-4">
      <div className="flex items-center gap-3 sm:gap-6 rounded-full border border-border/40 bg-card/90 px-5 py-2 shadow-2xl backdrop-blur-lg">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-extrabold tracking-tighter uppercase transition-opacity hover:opacity-80"
        >
          <Gamepad2 className="text-primary" size={18} />
          Nomroti
        </Link>

        {/* Main Nav Links */}
        <div className="hidden items-center gap-6 text-[13px] font-semibold text-muted-foreground md:flex">
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <Home size={14} /> Home
          </Link>
          <Link
            href="/#game-mode"
            className="flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <ShoppingCart size={14} /> Store
          </Link>

          {/* Purchase link with count badge */}
          <Link
            href="/purchase"
            className="relative flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <ShoppingBasket size={14} />
            Purchase
            {orderCount > 0 && (
              <span className="absolute -top-2 -right-4 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white shadow-md">
                {orderCount}
              </span>
            )}
          </Link>
        </div>

        {/* Social Icons */}
        <div className="hidden xs:flex items-center gap-4 border-l border-border/40 pl-4">
          <a
            href="https://dsc.gg/nomrotismp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-[#5865F2]"
            aria-label="Discord"
          >
            <FontAwesomeIcon icon={faDiscord} size="lg" />
          </a>
          <a
            href="https://t.me/nomrotismp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-[#0088cc]"
            aria-label="Telegram"
          >
            <Send size={18} />
          </a>
        </div>

        {/* CTA Button */}
        <Button className="h-7 sm:h-9 rounded-full bg-primary px-4 sm:px-6 font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95">
          PLAY NOW
        </Button>
      </div>
    </nav>
  );
}