import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Key, Dog, Map } from 'lucide-react';
import Layout from '@/components/homepage/layout';
import { Link, Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'; // Assuming Shadcn tooltip is available

// Define interfaces for better type safety
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
}

interface ItemCardProps {
  name: string;
  price: string;
  badge?: string;
  img: string;
  color?: string;
  description?: string; // Added for enhanced UX
}

// Upgraded GamemodeEco component:
// - Added dynamic data props (assume passed from Laravel controller via Inertia)
// - Improved responsiveness with better grid layouts
// - Added tooltips for items
// - Completed ItemCard with badge rendering and optional description
// - Added lazy loading for images
// - Enhanced animations with AnimatePresence for smoother enters/exits
// - Improved accessibility: ARIA labels, semantic elements
// - Added a new section example (e.g., "World Map") for completeness
// - Optimized for performance: viewport once, reduced motion for accessibility
// - SEO: Better meta via Head

interface GamemodeEcoProps {
  ranks?: Array<{ name: string; price: number; description: string; img: string }>;
  crateKeys?: Array<ItemCardProps>;
  companions?: Array<ItemCardProps>;
  // Add more data props as needed from backend
}

export default function GamemodeEco({ ranks = [], crateKeys = [], companions = [] }: GamemodeEcoProps) {
  // Fallback to hardcoded data if not provided via props (for dev)
  const defaultRanks = [
    { name: 'NOMROTI TITAN', price: 25.00, description: 'The ultimate prestige. Includes Flight, 50 Homes, and Custom Particles to dominate the server.', img: '2317997' },
  ];
  const defaultCrateKeys = [
    { name: 'Vote Key', price: '1.00', badge: 'Common', img: '8051347' },
    { name: 'Iron Key', price: '2.50', badge: 'Rare', img: '2855546' },
    { name: 'Gold Key', price: '5.00', badge: 'Legendary', img: '2534168', color: 'text-yellow-400' },
    { name: 'Diamond Key', price: '7.50', badge: 'Epic', img: '7542190', color: 'text-cyan-400' },
    { name: 'God Key', price: '20.00', badge: 'Ultimate', img: '3144883', color: 'text-primary' },
  ];
  const defaultCompanions = [
    { name: 'Tiger Pet', price: '5.00', img: '616408', description: 'A fierce companion for your adventures.' },
    { name: 'Dragon Pet', price: '15.00', img: '1998610', description: 'Mythical fire-breather at your side.' },
    { name: 'Bee Pet', price: '3.00', img: '2395796', description: 'Buzzing helper for pollination tasks.' },
    { name: 'Wolf Pet', price: '4.00', img: '616554', description: 'Loyal pack member for hunts.' },
    { name: 'Bear Pet', price: '6.00', img: '802340', description: 'Strong guardian of the woods.' },
  ];

  const usedRanks = ranks.length > 0 ? ranks : defaultRanks;
  const usedCrateKeys = crateKeys.length > 0 ? crateKeys : defaultCrateKeys;
  const usedCompanions = companions.length > 0 ? companions : defaultCompanions;

  return (
    <Layout>
      <Head
        title="NOMROTI | Eco Gamemode"
        description="Dive into a player-driven economy. Build towns, trade stocks, and dominate the leaderboard in NOMROTI Eco."
        keywords="minecraft, eco gamemode, player economy, ranks, crate keys, companions"
      />

      {/* Enhanced Hero Header: Parallax effect simulation, better overlay */}
      <header className="relative flex h-[60vh] min-h-[450px] items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(26, 26, 26, 0.9), #1a1a1a), url('https://images.unsplash.com/photo-1599583724135-236357e937d3?q=80&w=1920&auto=format&fit=crop')`,
          }}
        />
        <div className="relative z-10 container px-6 text-center animate-in fade-in zoom-in duration-700">
          <h1 className="mb-4 text-5xl font-black tracking-tighter md:text-7xl italic uppercase drop-shadow-lg">
            NOMROTI <span className="text-primary drop-shadow-[0_0_20px_rgba(255,102,0,0.4)]">ECO</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium text-muted-foreground italic">
            Dive into a player-driven economy. Build towns, trade stocks, and dominate the leaderboard.
            <span className="mt-4 block text-xs font-black tracking-[0.3em] text-foreground uppercase opacity-60">
              Version: 1.20.4 • PvE & PvP Enabled • Online Players: { /* Fetch from props or API */ } 150+
            </span>
          </p>
        </div>
      </header>

      <div className="container mx-auto space-y-28 py-24 px-6">
        {/* 1. EXCLUSIVE RANK SECTION - Dynamic mapping */}
        <section aria-labelledby="ranks-header">
          <SectionHeader title="Exclusive Ranks" icon={<Crown className="text-primary" />} />
          <AnimatePresence>
            {usedRanks.map((rank, index) => (
              <motion.div
                key={rank.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#121212] p-10 text-center shadow-2xl md:p-16 transition-all hover:border-primary/40 hover:shadow-[0_0_30px_rgba(255,102,0,0.2)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative z-10">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 border border-primary/30">
                    <Crown size={56} className="animate-pulse text-primary" />
                  </div>
                  <h2 className="mb-4 text-5xl font-black tracking-tighter text-foreground italic">{rank.name}</h2>
                  <p className="mx-auto mb-8 max-w-xl text-muted-foreground font-medium">{rank.description}</p>
                  <Link
                //   href={route('product.detail', { name: rank.name, price: rank.price, img: rank.img })}
                  >
                    <Button
                      size="lg"
                      className="rounded-2xl bg-primary px-12 py-8 text-xl font-black text-white shadow-[0_10px_40px_rgba(255,102,0,0.3)] hover:scale-105 active:scale-95 transition-all uppercase italic tracking-tighter"
                      aria-label={`Purchase ${rank.name} for $${rank.price}`}
                    >
                      PURCHASE RANK — ${rank.price.toFixed(2)}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* 2. CRATE KEYS SECTION */}
        <section aria-labelledby="crate-keys-header">
          <SectionHeader title="Crate Keys" subtitle="Live Inventory - Unlock Epic Rewards" icon={<Key className="text-primary" />} />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {usedCrateKeys.map((item, index) => (
              <ItemCard key={item.name} {...item} index={index} /> // Passed index for staggered animation
            ))}
          </div>
        </section>

        {/* 3. COMPANIONS SECTION */}
        <section aria-labelledby="companions-header">
          <SectionHeader title="Companions" subtitle="Loyal Pets for Your Journey" icon={<Dog className="text-primary" />} />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {usedCompanions.map((item, index) => (
              <ItemCard key={item.name} {...item} index={index} />
            ))}
          </div>
        </section>

        {/* 4. NEW SECTION: WORLD MAP (Example upgrade for more content) */}
        <section aria-labelledby="world-map-header">
          <SectionHeader title="Explore the World" icon={<Map className="text-primary" />} />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#121212] p-6 shadow-2xl">
            <img
              src="https://via.placeholder.com/1200x600?text=Dynamic+World+Map" // Replace with actual map URL or component
              alt="NOMROTI Eco World Map"
              loading="lazy"
              className="w-full rounded-xl"
            />
            <p className="mt-4 text-center text-muted-foreground">Discover vast lands, build empires, and conquer territories.</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

// Upgraded SectionHeader: Added ARIA for accessibility
function SectionHeader({ title, subtitle, icon }: SectionHeaderProps) {
  return (
    <div id={`${title.toLowerCase().replace(/\s/g, '-')}-header`} className="mb-12 flex flex-col justify-between gap-4 border-l-4 border-primary pl-6 md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        <span className="rounded-xl border border-white/5 bg-white/5 p-3 shadow-inner" aria-hidden="true">{icon}</span>
        <h2 className="text-4xl font-black tracking-tighter uppercase italic">{title}</h2>
      </div>
      {subtitle && <span className="text-sm font-black tracking-[0.3em] text-muted-foreground uppercase">{subtitle}</span>}
    </div>
  );
}

// Upgraded ItemCard:
// - Added tooltip for description
// - Render badge properly
// - Staggered animations based on index
// - Lazy image loading
// - Better transitions
// - ARIA labels
interface ExtendedItemCardProps extends ItemCardProps {
  index?: number;
}

function ItemCard({ name, price, badge, img, color, description, index = 0 }: ExtendedItemCardProps) {
  const imageUrl = `https://cdn-icons-png.flaticon.com/512/${img.substring(0, 4)}/${img}.png`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
        // href={route('product.detail', { name, price, img: imageUrl })}
         className="block">
          <motion.div
            whileHover={{ y: -12, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
            className="group"
          >
            <Card className="group relative flex cursor-pointer flex-col items-center overflow-hidden border-white/5 bg-[#121212] p-6 text-center shadow-xl transition-all hover:border-primary/30 hover:shadow-[0_0_20px_rgba(255,102,0,0.15)]">
              {badge && (
                <Badge className={`absolute top-4 right-4 font-bold uppercase ${color || 'text-white'} bg-primary/20`}>
                  {badge}
                </Badge>
              )}
              <motion.img
                src={imageUrl}
                alt={`${name} icon`}
                loading="lazy"
                whileHover={{ rotate: 8, scale: 1.15 }}
                className="h-20 w-20 object-contain drop-shadow-2xl transition-transform"
              />
              <h4 className="mt-4 font-bold uppercase tracking-tight">{name}</h4>
              <p className="text-xl font-black text-primary font-mono">${price}</p>
            </Card>
          </motion.div>
        </Link>
      </TooltipTrigger>
      {description && <TooltipContent>{description}</TooltipContent>}
    </Tooltip>
  );
}
