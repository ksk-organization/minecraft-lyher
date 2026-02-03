// resources/js/Pages/ProductDetail.tsx
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  ChevronLeft,
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ImageGallery } from '@/components/product/image-preview';
import ReceiptUpload from '@/components/product/receipt-upload';
import { PaymentSection } from '@/components/product/payment';
import { PlatformSelector } from '@/components/product/plateform';
import Layout from '@/components/homepage/layout';

// ──────────────────────────────────────────────
// Types
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
  price: number | string | null;     // more flexible type
  stock: number;
  main_icon_url: string | null;
  is_active: number | boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  images: ProductImage[];
}

interface ProductDetailProps {
  product: Product;
}

interface CouponStatus {
  valid: boolean;
  discount: number; // percentage
  message?: string;
}

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────

const CHECK_COUPON_ROUTE = route('checkout.check-coupon');

export default function ProductDetail({ product }: ProductDetailProps) {
  // ─── Stable list of all images ───────────────────────────────
  const allImages = useMemo<string[]>(() => {
    const fallback = 'https://cdn-icons-png.flaticon.com/512/2317/2317997.png';
    const main = product?.main_icon_url
      ? `/storage/${product.main_icon_url}`
      : fallback;

    const extras = product?.images?.map((img) => `/storage/${img.image_url}`) ?? [];

    // Remove duplicates & keep main image first
    const unique = [main, ...extras].filter((v, i, a) => a.indexOf(v) === i);

    return unique.length > 0 ? unique : [fallback];
  }, [product]);

  const [activeImg, setActiveImg] = useState(allImages[0]);

  const [platform, setPlatform] = useState<'java' | 'bedrock' | 'pocket'>('java');
  const [minecraftName, setMinecraftName] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [debouncedPromoCode, setDebouncedPromoCode] = useState('');
  const [couponStatus, setCouponStatus] = useState<CouponStatus | null>(null);
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  // ─── Safe price handling ─────────────────────────────────────
  const numericPrice = useMemo(() => {
    const val = product?.price;
    if (val == null) return 0;
    const num = Number(val);
    return Number.isNaN(num) ? 0 : num;
  }, [product]);

  const discountPercent = couponStatus?.valid ? couponStatus.discount : 0;
  const finalPrice = useMemo(
    () => Math.max(0, numericPrice * (1 - discountPercent / 100)),
    [numericPrice, discountPercent]
  );

  // ─── Debounce promo code ─────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPromoCode(promoCode.trim().toUpperCase());
    }, 500);
    return () => clearTimeout(timer);
  }, [promoCode]);

  // ─── Coupon check ────────────────────────────────────────────
  useEffect(() => {
    if (!debouncedPromoCode) {
      setCouponStatus(null);
      return;
    }

    setIsCheckingCoupon(true);

    fetch(`${CHECK_COUPON_ROUTE}?code=${encodeURIComponent(debouncedPromoCode)}`, {
      headers: { Accept: 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setCouponStatus({
            valid: true,
            discount: data.discount ?? 0,
            message: data.message || `${data.discount}% off`,
          });
        } else {
          setCouponStatus({
            valid: false,
            discount: 0,
            message: data.message || 'Invalid or expired code',
          });
        }
      })
      .catch(() => {
        setCouponStatus({
          valid: false,
          discount: 0,
          message: 'Error checking code. Try again.',
        });
      })
      .finally(() => setIsCheckingCoupon(false));
  }, [debouncedPromoCode]);

  const handleApplyPromo = useCallback(() => {
    if (!promoCode.trim()) return;
    setDebouncedPromoCode(promoCode.trim().toUpperCase());
  }, [promoCode]);

  // ─── Render ──────────────────────────────────────────────────
  return (
    <Layout>
      <Head title={`NOMROTI | ${product.name}`} />

      <nav className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-lg">
        <div className="container mx-auto px-5 py-4 md:px-6">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronLeft size={16} />
            Back to Catalog
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-5 py-10 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Images */}
          <ImageGallery
            mainImage={activeImg}
            thumbnails={allImages}
            alt={product.name}
            onThumbClick={setActiveImg}
          />

          {/* Right: Info + Form */}
          <div className="space-y-10">
            <header className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight text-white uppercase italic md:text-5xl">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-baseline gap-4">
                <span className="font-mono text-4xl font-bold text-primary md:text-5xl">
                  ${numericPrice}
                </span>

                {discountPercent > 0 && (
                  <>
                    <span className="text-xl text-muted-foreground line-through opacity-70 md:text-2xl">
                      ${numericPrice}
                    </span>
                    <Badge className="border-green-500/40 bg-green-600/30 text-green-400">
                      -{discountPercent}%
                    </Badge>
                  </>
                )}

                <Badge
                  variant="outline"
                  className={cn(
                    'ml-2',
                    product.stock > 0
                      ? 'border-green-600/40 bg-green-950/30 text-green-400'
                      : 'border-red-600/40 bg-red-950/30 text-red-400'
                  )}
                >
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Badge>
              </div>

              {product.short_description && (
                <p className="text-lg leading-relaxed text-zinc-300">
                  {product.short_description}
                </p>
              )}
            </header>

            <Card className="border-white/5 bg-gradient-to-b from-[#1a1a1a] to-[#121212] shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-black tracking-wide uppercase">
                  Complete Your Purchase
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8 p-6 md:p-8">
                <div className="space-y-2">
                  <Label
                    htmlFor="ign"
                    className="text-xs font-black tracking-widest text-muted-foreground uppercase"
                  >
                    Minecraft Username (IGN)
                  </Label>
                  <div className="relative">
                    <Input
                      id="ign"
                      value={minecraftName}
                      onChange={(e) => setMinecraftName(e.target.value.trim())}
                      placeholder="Your in-game name"
                      className="h-12 border-white/10 bg-black/30 pr-10"
                    />
                    {minecraftName.length > 2 && (
                      <CheckCircle2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black tracking-widest text-muted-foreground uppercase">
                    Platform
                  </Label>
                  <PlatformSelector value={platform} onChange={setPlatform} />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black tracking-widest text-muted-foreground uppercase">
                    Promo Code
                  </Label>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="Enter code (e.g. WELCOME10)"
                        className={cn(
                          'h-12 border-white/10 bg-black/30 pr-10 transition-colors duration-200',
                          couponStatus?.valid && 'border-green-500/60 focus:border-green-500',
                          !couponStatus?.valid &&
                            promoCode &&
                            'border-red-500/60 focus:border-red-500'
                        )}
                      />
                      {isCheckingCoupon && (
                        <Loader2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-muted-foreground" />
                      )}
                      {!isCheckingCoupon && couponStatus?.valid && (
                        <CheckCircle2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500" />
                      )}
                      {!isCheckingCoupon && !couponStatus?.valid && promoCode && (
                        <AlertCircle className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500" />
                      )}
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleApplyPromo}
                      disabled={isCheckingCoupon || !promoCode.trim()}
                      className="h-12 px-6"
                    >
                      Apply
                    </Button>
                  </div>

                  {couponStatus && (
                    <p
                      className={cn(
                        'mt-1.5 text-sm',
                        couponStatus.valid ? 'text-green-400' : 'text-red-400'
                      )}
                    >
                      {couponStatus.message}
                    </p>
                  )}
                </div>

                <PaymentSection finalPrice={finalPrice} platform={platform} />

                <ReceiptUpload file={receiptFile} onFileChange={setReceiptFile} />

                <Button
                  disabled={
                    !minecraftName.trim() ||
                    !receiptFile ||
                    product.stock <= 0 ||
                    (couponStatus && !couponStatus.valid && promoCode.trim())
                  }
                  className="h-14 w-full bg-primary text-lg font-black tracking-wider uppercase hover:bg-primary/90 transition-all"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Submit Payment
                </Button>
              </CardContent>
            </Card>

            {product.long_description && (
              <Card className="border-white/5 bg-[#1a1a1a] shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase">
                    Product Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="leading-relaxed whitespace-pre-line text-zinc-300">
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