import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Crown, Key, Package, MapPin } from 'lucide-react';
import Layout from '@/components/homepage/layout';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

// ──────────────────────────────────────────────
// Types (matching your backend response)
// ──────────────────────────────────────────────

interface ProductImage {
  id: number;
  image_url: string;
  sort_order: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  main_icon_url: string | null;
  short_description?: string | null;
  long_description?: string | null;
  is_active: boolean;
  images: ProductImage[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  display_order: number;
  products: Product[];
}

interface Props {
  categories: Category[];
}

  const defaultRanks = [
    { name: 'NOMROTI TITAN', price: 25.00, description: 'The ultimate prestige. Includes Flight, 50 Homes, and Custom Particles to dominate the server.', img: '2317997' },
  ];
    const usedRanks = defaultRanks;

// ──────────────────────────────────────────────
// Reusable Components
// ──────────────────────────────────────────────

const SectionHeader = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
  <div className="mb-12 flex items-center gap-4 border-l-4 border-orange-600 pl-6">
    <div className="rounded-xl bg-orange-950/40 p-4 text-orange-500 shadow-inner">
      {icon}
    </div>
    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-white">
      {title}
    </h2>
  </div>
);

const ProductCard = ({ product }: { product: Product }) => {
  const mainImg = product.main_icon_url
    ? `/storage/${product.main_icon_url}`
    : `https://ui-avatars.com/api/?background=111&color=ea580c&name=${encodeURIComponent(product.name)}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={route('product.show', { product: product.id })}
            className="group block h-full"
          >
            <motion.div
              whileHover={{ y: -12, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative h-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-950 to-black p-6 shadow-xl transition-all hover:border-orange-600/40 hover:shadow-[0_0_30px_rgba(234,88,12,0.15)]"
            >
              {/* Badge if special */}
              {product.stock <= 5 && product.stock > 0 && (
                <Badge className="absolute top-4 right-4 bg-red-600/80 text-white font-bold uppercase text-xs">
                  Low Stock
                </Badge>
              )}

              {/* Main Image */}
              <div className="relative mx-auto mb-6 h-28 w-28 overflow-hidden rounded-xl border border-orange-600/20 bg-black/40">
                <img
                  src={mainImg}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>

              {/* Name & Price */}
              <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors">
                {product.name}
              </h3>
              <p className="mb-4 text-2xl font-black text-orange-500 font-mono">
                ${product.price}
              </p>

              {/* Short description or fallback */}
              <p className="text-sm text-zinc-400 line-clamp-2">
                {product.short_description || 'Premium item with exclusive perks'}
              </p>

              {/* Gallery preview (small thumbnails) */}
              {product.images?.length > 0 && (
                <div className="mt-4 flex -space-x-2 justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                  {product.images.slice(0, 4).map((img) => (
                    <div
                      key={img.id}
                      className="h-8 w-8 overflow-hidden rounded-full border-2 border-black shadow-md"
                    >
                      <img
                        src={`/storage/${img.image_url}`}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  {product.images.length > 4 && (
                    <div className="h-8 w-8 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center text-[10px] text-zinc-400 font-bold">
                      +{product.images.length - 4}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-zinc-900 border-zinc-700 text-zinc-200">
          {product.long_description || product.short_description || 'No description available'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────

export default function GamemodeEco({ categories }: Props) {
  // Flatten all products from all categories (or filter by category if needed)
  const allProducts = categories.flatMap(cat => cat.products);

  // Optional: group by category if you want separate sections
  const ecoCategory = categories.find(cat => cat.slug.includes('eco')) || categories[0];

  return (
    <Layout>
      <Head
        title="NOMROTI | Eco Gamemode"
        description="Player-driven economy, town building, auctions, and massive progression in NOMROTI Eco."
      />

      {/* Hero */}
      <header className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1587573089737-43b8f0f39e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="relative z-10 container px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white drop-shadow-2xl"
          >
            NOMROTI <span className="text-orange-500">ECO</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto max-w-3xl text-xl md:text-2xl text-zinc-300 font-medium"
          >
            Build towns. Trade freely. Dominate the economy.
          </motion.p>
        </div>
      </header>

      <div className="container mx-auto space-y-24 py-20 px-6">
        {/* Ranks Section (example filter – adjust as needed) */}
        {/* <section>
          <SectionHeader title="Exclusive Ranks" icon={<Crown className="text-orange-500" />} />
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
                  >
                    <Button
                      size="lg"
                      className="rounded-2xl bg-primary px-12 py-8 text-xl font-black text-white shadow-[0_10px_40px_rgba(255,102,0,0.3)] hover:scale-105 active:scale-95 transition-all uppercase italic tracking-tighter"
                      aria-label={`Purchase ${rank.name} for $${rank.price}`}
                    >
                      PURCHASE RANK — ${rank.price}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section> */}

        {/* All Products – grouped by category */}
        {categories.map(category => (
          <section key={category.id}>
            <SectionHeader
              title={category.name}
              icon={<Badge className="bg-orange-600/20 text-orange-400">{category.products.length}</Badge>}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}

        {/* Gallery Teaser / World Preview */}
        <section className="relative rounded-3xl overflow-hidden border border-orange-600/20 bg-black/40">
          <img
            src="https://images.unsplash.com/photo-1587573089737-43b8f0f39e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="NOMROTI Eco World"
            className="w-full h-96 object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 text-center">
            <h3 className="text-3xl font-black text-white mb-3">Explore Endless Worlds</h3>
            <p className="text-zinc-300 max-w-2xl mx-auto">
              Join thousands of players building, trading, and competing in the ultimate Minecraft economy experience.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}

// Reusable header
// function SectionHeader({ title, icon }: { title: string; icon: React.ReactNode }) {
//   return (
//     <div className="mb-10 flex items-center gap-4">
//       <div className="rounded-xl bg-orange-950/50 p-3 text-orange-500 shadow-inner">
//         {icon}
//       </div>
//       <h2 className="text-4xl font-black tracking-tighter uppercase text-white">
//         {title}
//       </h2>
//     </div>
//   );
// }
