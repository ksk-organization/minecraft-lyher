// resources/js/Pages/ProductDetail.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  ChevronLeft,
  ShoppingCart,
  QrCode,
  Upload,
  Monitor,
  Gamepad2,
  Smartphone,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Layout from '@/components/homepage/layout';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// ──────────────────────────────────────────────
// Types (matching your JSON response)
// ──────────────────────────────────────────────

interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  sort_order: number;
}

interface Product {
  id: number;
  game_mode_id: number;
  category_id: number;
  name: string;
  slug: string;
  short_description: string | null;
  long_description: string | null;
  price: number;
  stock: number;
  main_icon_url: string | null;
  is_active: number | boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  images: ProductImage[];
}

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [activeImg, setActiveImg] = useState<string>(
    product?.main_icon_url
      ? `/storage/${product?.main_icon_url}`
      : 'https://cdn-icons-png.flaticon.com/512/2317/2317997.png'
  );

  const [platform, setPlatform] = useState<'java' | 'bedrock' | 'pocket'>('java');
  const [minecraftName, setMinecraftName] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  const numericPrice = useMemo(() => product?.price || 0, [product?.price]);
  const finalPrice = useMemo(
    () => Math.max(0, numericPrice * (1 - discount / 100)),
    [numericPrice, discount]
  );

  // Apply promo (placeholder – in real app, call backend)
  const applyPromo = useCallback(() => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setDiscount(10);
    } else {
      setDiscount(0);
      // TODO: show toast "Invalid promo code"
    }
  }, [promoCode]);

  // All images for thumbnails (main + gallery)
  const thumbnails = useMemo(() => {
    const main = activeImg;
    const gallery = product.images.map(img => `/storage/${img.image_url}`);
    return [main, ...gallery];
  }, [product.images, activeImg]);

  return (
    <Layout>
      <Head title={`NOMROTI | ${product.name}`} />

      {/* Breadcrumb */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-black/60 backdrop-blur-lg">
        <div className="container mx-auto px-5 py-4 md:px-6">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Catalog
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-5 py-10 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image Gallery – now dynamic */}
          <ImageGallery
            mainImage={activeImg}
            thumbnails={thumbnails}
            alt={product.name}
            onThumbClick={setActiveImg}
          />

          {/* Product Info & Purchase */}
          <div className="space-y-10">
            <header className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic text-white">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-4xl md:text-5xl font-bold text-primary">
                  ${numericPrice.toFixed(2)}
                </span>

                {discount > 0 && (
                  <span className="text-xl md:text-2xl text-muted-foreground line-through opacity-70">
                    ${numericPrice.toFixed(2)}
                  </span>
                )}

                {product.stock > 0 ? (
                  <Badge variant="outline" className="ml-3 bg-green-950/30 text-green-400 border-green-600/40">
                    {product.stock} in stock
                  </Badge>
                ) : (
                  <Badge variant="outline" className="ml-3 bg-red-950/30 text-red-400 border-red-600/40">
                    Out of stock
                  </Badge>
                )}
              </div>

              {product.short_description && (
                <p className="text-lg text-zinc-300">{product.short_description}</p>
              )}
            </header>

            <Card className="border-white/5 bg-gradient-to-b from-[#1a1a1a] to-[#121212] shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-black uppercase tracking-wide">
                  Complete Your Purchase
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8 p-6 md:p-8">
                {/* IGN */}
                <div className="space-y-2">
                  <Label htmlFor="ign" className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Minecraft Username (IGN)
                  </Label>
                  <div className="relative">
                    <Input
                      id="ign"
                      value={minecraftName}
                      onChange={(e) => setMinecraftName(e.target.value.trim())}
                      placeholder="Your in-game name"
                      className="h-12 bg-black/30 border-white/10 pr-10"
                    />
                    {minecraftName.length > 2 && (
                      <CheckCircle2 className="absolute right-3 top-3.5 h-5 w-5 text-green-500" />
                    )}
                  </div>
                </div>

                {/* Platform */}
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Platform
                  </Label>
                  <PlatformSelector value={platform} onChange={setPlatform} />
                </div>

                {/* Promo */}
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Promo Code
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code (e.g. WELCOME10)"
                      className="h-12 bg-black/30 border-white/10"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={applyPromo}
                      className="h-12 px-6"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* QR Payment */}
                <PaymentSection finalPrice={finalPrice} platform={platform} />

                {/* Receipt Upload */}
                <ReceiptUpload file={receiptFile} onFileChange={setReceiptFile} />

                <Button
                  disabled={!minecraftName.trim() || !receiptFile}
                  className="w-full h-14 text-lg font-black uppercase tracking-wider bg-primary hover:bg-primary/90 transition-all"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Submit Payment
                </Button>
              </CardContent>
            </Card>

            {/* Additional Info */}
            {product.long_description && (
              <Card className="border-white/5 bg-[#1a1a1a] shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase">Product Details</CardTitle>
                </CardHeader>
                <CardContent className="text-zinc-300 whitespace-pre-line">
                  {product.long_description}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

// ──────────────────────────────────────────────
// Reusable Components (unchanged but kept for completeness)
// ──────────────────────────────────────────────

function ImageGallery({
  mainImage,
  thumbnails,
  alt,
  onThumbClick,
}: {
  mainImage: string;
  thumbnails: string[];
  alt: string;
  onThumbClick: (src: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/5 bg-[#0f0f0f] shadow-2xl">
        <img
          src={mainImage}
          alt={alt}
          className="h-full w-full object-contain p-8 md:p-12 transition-transform duration-500 hover:scale-105"
          loading="eager"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
        {thumbnails.map((src, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onThumbClick(src)}
            className={cn(
              'h-20 w-20 flex-shrink-0 rounded-xl border-2 p-2 transition-all bg-[#121212]',
              mainImage === src
                ? 'border-primary shadow-[0_0_15px_rgba(var(--primary),0.4)]'
                : 'border-transparent opacity-50 hover:opacity-80'
            )}
          >
            <img src={src} alt={`${alt} preview ${idx + 1}`} className="h-full w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  );
}

function PlatformSelector({
  value,
  onChange,
}: {
  value: 'java' | 'bedrock' | 'pocket';
  onChange: (v: 'java' | 'bedrock' | 'pocket') => void;
}) {
  const platforms = [
    { id: 'java', label: 'Java', icon: Monitor },
    { id: 'bedrock', label: 'Bedrock', icon: Gamepad2 },
    { id: 'pocket', label: 'Pocket', icon: Smartphone },
  ] as const;

  return (
    <TooltipProvider>
      <div className="grid grid-cols-3 gap-3">
        {platforms.map(({ id, label, icon: Icon }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onChange(id)}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-xl border p-4 transition-all',
                  value === id
                    ? 'border-primary bg-primary/10 text-primary shadow-sm'
                    : 'border-white/5 bg-black/20 text-muted-foreground hover:border-white/20'
                )}
              >
                <Icon size={20} />
                <span className="text-xs font-black uppercase">{label}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>{label} Edition</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

function PaymentSection({
  finalPrice,
  platform,
}: {
  finalPrice: number;
  platform: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-black/40 p-6 text-center space-y-5">
      <div className="text-xs font-black uppercase tracking-widest opacity-50">
        Scan to Pay ({platform.toUpperCase()})
      </div>

      <div className="mx-auto h-40 w-40 rounded-xl bg-white p-4 shadow-inner">
        <QrCode size={128} className="text-black mx-auto" />
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold">
        <span className="uppercase opacity-70">Total Due</span>
        <span className="font-mono text-2xl text-primary">
          ${finalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function ReceiptUpload({
  file,
  onFileChange,
}: {
  file: File | null;
  onFileChange: (f: File | null) => void;
}) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type.startsWith('image/')) onFileChange(dropped);
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
        Upload Payment Proof
      </Label>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          'cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all',
          file
            ? 'border-green-600/50 bg-green-950/20'
            : 'border-white/10 hover:border-primary/40 bg-black/20'
        )}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          className="hidden"
          id="receipt-upload"
        />
        <label htmlFor="receipt-upload" className="cursor-pointer">
          {file ? (
            <div className="space-y-2">
              <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />
              <p className="text-sm font-medium text-green-400">{file.name}</p>
            </div>
          ) : (
            <>
              <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-xs font-bold uppercase opacity-60">
                Drop Screenshot or Click to Browse
              </p>
            </>
          )}
        </label>
      </div>
    </div>
  );
}
