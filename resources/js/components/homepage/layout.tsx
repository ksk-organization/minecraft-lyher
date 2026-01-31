import React from 'react';
import {
    Gamepad2,
    Home,
    ShoppingCart,
    MessageCircle,
    Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import Navigation from './nav';
import Footer from './footer';
import { motion, AnimatePresence } from 'framer-motion';
interface LayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function Layout({
    children,
    title = 'NOMROTI - Network',
}: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    name="description"
                    content="The next generation of Minecraft gamemodes."
                />
            </Head>

            <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/30">
                {/* Navigation */}
                <Navigation />

                {/* Main Content Area */}
                <AnimatePresence mode="wait">
                    <motion.main
                        key={window.location.pathname} // Triggers animation on Inertia route change
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
