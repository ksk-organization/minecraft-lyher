import React, { useState, useEffect, useCallback } from 'react';
import {
    Users,
    ArrowRight,
    Gamepad2,
    ShoppingCart,
    Home,
    MessageCircle,
    Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from '@inertiajs/react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons'; // Import the Discord icon





export default function Navigation() {
    return (
        <nav className="fixed top-6 z-50 flex w-full justify-center px-4">
            <div className="flex items-center gap-6 rounded-full border border-border bg-card/90 px-5 py-2 shadow-2xl backdrop-blur-md">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-extrabold tracking-tighter uppercase transition-opacity hover:opacity-80"
                >
                    <Gamepad2 className="text-primary" size={18} />
                    Nomroti
                </Link>

                <div className="hidden gap-6 text-[13px] font-semibold text-muted-foreground md:flex">
                    <Link
                        href="/"

                        className="flex items-center gap-1.5 transition-colors hover:text-primary"
                    >
                        <Home size={14} /> Home
                    </Link>
                    <Link
                        href="/products"
                        className="flex items-center gap-1.5 transition-colors hover:text-primary"
                    >
                        <ShoppingCart size={14} /> Store
                    </Link>
                </div>

                <div className="flex items-center gap-4 border-l border-border pl-4">
                    <a
                        href="https://dsc.gg/nomrotismp"
                        target='blank'
                        className="text-muted-foreground transition-colors hover:text-[#5865F2]"
                        aria-label="Discord"
                    >
                        <FontAwesomeIcon icon={faDiscord} size="1x" />
                    </a>
                    <a
                        href="https://t.me/nomrotismp"
                        target='blank'
                        className="text-muted-foreground transition-colors hover:text-[#0088cc]"
                        aria-label="Telegram"
                    >
                        <Send size={18} />
                    </a>
                </div>

                <Button className="h-9 rounded-full bg-primary px-6 font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95">
                    PLAY NOW
                </Button>
            </div>
        </nav>
    );
}
