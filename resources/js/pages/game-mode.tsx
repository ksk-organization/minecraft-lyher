import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Key, Dog, Map } from 'lucide-react';
import Layout from '@/components/homepage/layout';
import { Link, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
export default function GamemodeEco() {
    return (
        <Layout>
            <Head title="NOMROTI | Eco Gamemode" />
            
            {/* Short Hero Header - Performance: Eager loading for LCP */}
            <header className="relative flex h-[50vh] min-h-[400px] items-center justify-center overflow-hidden pt-20">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(26, 26, 26, 0.85), #1a1a1a), url('https://images.unsplash.com/photo-1599583724135-236357e937d3?q=80&w=1200&auto=format&fit=crop')`,
                    }}
                />
                <div className="relative z-10 container px-6 text-center animate-in fade-in zoom-in duration-500">
                    <h1 className="mb-4 text-5xl font-black tracking-tighter md:text-7xl italic uppercase">
                        NOMROTI <span className="text-primary drop-shadow-[0_0_15px_rgba(255,102,0,0.3)]">ECO</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg font-medium text-muted-foreground italic">
                        Dive into a player-driven economy. Build towns, trade
                        stocks, and dominate the leaderboard.
                        <span className="mt-4 block text-xs font-black tracking-[0.3em] text-foreground uppercase opacity-50">
                            Version: 1.20.4 • PvE & PvP Enabled
                        </span>
                    </p>
                </div>
            </header>

            <div className="container mx-auto space-y-24 py-20 px-6">
                {/* 1. RANK CARD - Pass data via Link for speed */}
                <section>
                    <SectionHeader title="Exclusive Rank" icon={<Crown className="text-primary" />} />
                    <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#121212] p-10 text-center shadow-2xl md:p-16 transition-all hover:border-primary/30">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
                        <div className="relative z-10">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                                <Crown size={48} className="animate-pulse text-primary" />
                            </div>
                            <h2 className="mb-4 text-5xl font-black tracking-tighter text-foreground italic">NOMROTI TITAN</h2>
                            <p className="mx-auto mb-8 max-w-xl text-muted-foreground font-medium">
                                The ultimate prestige. Includes Flight, 50 Homes, and Custom Particles to dominate the server.
                            </p>
                            
                            {/* Performance: Inertia Link with data transfer */}
                            <Link 
                                // href={route('product.detail', { name: 'NOMROTI TITAN', price: 25.00, img: '2317997' })}
                            >
                                <Button size="lg" className="rounded-2xl bg-primary px-12 py-8 text-xl font-black text-white shadow-[0_10px_40px_rgba(255,102,0,0.3)] hover:scale-105 active:scale-95 transition-all uppercase italic tracking-tighter">
                                    PURCHASE RANK — $25.00
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 2. CRATE KEYS */}
                <section>
                    <SectionHeader title="Crate Keys" subtitle="Live Inventory" icon={<Key className="text-primary" />} />
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
                        <ItemCard name="Vote Key" price="1.00" badge="Common" img="8051347" />
                        <ItemCard name="Iron Key" price="2.50" badge="Rare" img="2855546" />
                        <ItemCard name="Gold Key" price="5.00" badge="Legendary" img="2534168" color="text-yellow-400" />
                        <ItemCard name="Diamond Key" price="7.50" badge="Epic" img="7542190" color="text-cyan-400" />
                        <ItemCard name="God Key" price="20.00" badge="Ultimate" img="3144883" color="text-primary" />
                    </div>
                </section>

                {/* 3. COMPANIONS */}
                <section>
                    <SectionHeader title="Companions" icon={<Dog className="text-primary" />} />
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
                        <ItemCard name="Tiger Pet" price="5.00" img="616408" />
                        <ItemCard name="Dragon Pet" price="15.00" img="1998610" />
                        <ItemCard name="Bee Pet" price="3.00" img="2395796" />
                        <ItemCard name="Wolf Pet" price="4.00" img="616554" />
                        <ItemCard name="Bear Pet" price="6.00" img="802340" />
                    </div>
                </section>
            </div>
        </Layout>
    );
}

/* Reusable Components Optimized for Inertia */

function SectionHeader({ title, subtitle, icon }: { title: string; subtitle?: string; icon: React.ReactNode }) {
    return (
        <div className="mb-10 flex flex-col justify-between gap-4 border-l-4 border-primary pl-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
                <span className="rounded-xl border border-white/5 bg-white/5 p-3 shadow-inner">{icon}</span>
                <h2 className="text-4xl font-black tracking-tighter uppercase italic">{title}</h2>
            </div>
            {subtitle && <span className="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">{subtitle}</span>}
        </div>
    );
}

function ItemCard({ name, price, badge, img, color }: { name: string; price: string; badge?: string; img: string; color?: string }) {
    const imageUrl = `https://cdn-icons-png.flaticon.com/512/${img.substring(0, 4)}/${img}.png`;
    
    return (
        <Link 
            // href={route('product.detail', { name, price, img: imageUrl })}
            href={'/detail'}
            className="block"
        >
            <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} // Performance: only animate once
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <Card className="group relative flex cursor-pointer flex-col items-center overflow-hidden border-white/5 bg-[#121212] p-6 text-center shadow-xl">
                    {/* ... existing badge & content ... */}
                    <motion.img
                        src={imageUrl}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="h-20 w-20 object-contain drop-shadow-2xl"
                    />
                    <h4 className="mt-4 font-bold uppercase tracking-tight">{name}</h4>
                    <p className="text-xl font-black text-primary font-mono">${price}</p>
                </Card>
            </motion.div>
        </Link>
    );
}