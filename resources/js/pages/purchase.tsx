// resources/js/Pages/purchase.tsx
import { Head, Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import {
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  Receipt,
  Package,
  ExternalLink,
  User,
  Mail,
} from 'lucide-react';
import Layout from '@/components/homepage/layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// ────────────────────────────────────────────────
// Types (matching your controller response)
// ────────────────────────────────────────────────
interface Order {
  id: number;
  order_number: string;
  status: string;
  status_label: string;
  status_color: string;
  minecraft_username: string;
  platform: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  subtotal: string;
  discount: string | null;
  total: string;
  coupon_code: string | null;
  created_at: string;
  created_at_human: string;
  receipt_url: string | null;
  is_receipt_available: boolean;
}

interface Props {
  orders: Order[];
  user: {
    name: string;
    email: string;
  };
}

// ────────────────────────────────────────────────
// Status Badge Helper
// ────────────────────────────────────────────────
function StatusBadge({ status, label }: { status: string; label: string }) {
  const colors: Record<string, string> = {
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    green: 'bg-green-500/20 text-green-400 border-green-500/30',
    red: 'bg-red-500/20 text-red-400 border-red-500/30',
    gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        'px-3 py-1 text-xs font-medium uppercase tracking-wide',
        colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      )}
    >
      {label}
    </Badge>
  );
}

// ────────────────────────────────────────────────
// Main Purchase History Page
// ────────────────────────────────────────────────
export default function PurchaseHistory({ orders, user }: Props) {
    
  return (
    <Layout>
      <Head title="My Purchases - NOMROTI" />

      <main className="container max-w-6xl mx-auto px-5 py-10 md:px-6 lg:py-16">
        {/* Header */}
        <div className="mb-10 space-y-3">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            My Purchases
          </h1>
          <p className="text-zinc-400">
            View your order history, payment status, and receipts
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex items-center gap-3 rounded-lg bg-zinc-900/60 px-4 py-2.5 border border-zinc-800">
              <User className="h-5 w-5 text-zinc-400" />
              <span className="font-medium text-white">{user.name}</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-zinc-900/60 px-4 py-2.5 border border-zinc-800">
              <Mail className="h-5 w-5 text-zinc-400" />
              <span className="font-mono text-zinc-400">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-12 text-center">
            <Package className="mx-auto h-16 w-16 text-zinc-600 mb-6" />
            <h2 className="text-2xl font-bold text-zinc-300 mb-3">
              No purchases yet
            </h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">
              When you make your first purchase, it will appear here.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="overflow-hidden border-zinc-800 bg-gradient-to-b from-zinc-950 to-black"
              >
                <CardHeader className="border-b border-zinc-800 bg-zinc-900/40 px-6 py-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-white font-mono">
                          {order.order_number}
                        </h3>
                        <StatusBadge
                          status={order.status_color}
                          label={order.status_label}
                        />
                      </div>
                      <p className="text-sm text-zinc-500">
                        {order.created_at} • {order.created_at_human}
                      </p>
                    </div>

                    {order.is_receipt_available && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={order.receipt_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-2"
                        >
                          <Receipt className="h-4 w-4" />
                          View Receipt
                        </a>
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Product Info */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        {order.product_image ? (
                          <img
                            src={order.product_image}
                            alt={order.product_name}
                            className="h-20 w-20 rounded-lg object-cover border border-zinc-800"
                          />
                        ) : (
                          <div className="h-20 w-20 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-600">
                            <Package size={32} />
                          </div>
                        )}

                        <div className="space-y-1">
                          <h4 className="font-semibold text-white">
                            {order.product_name}
                          </h4>
                          <div className="text-sm text-zinc-400">
                            {order.quantity} × ${order.subtotal}
                          </div>
                          {order.platform && (
                            <Badge variant="outline" className="mt-1">
                              {order.platform.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Subtotal</span>
                        <span className="font-mono">${order.subtotal}</span>
                      </div>

                      {order.discount && (
                        <div className="flex justify-between text-sm text-green-400">
                          <span>Discount {order.coupon_code ? `(${order.coupon_code})` : ''}</span>
                          <span>-${order.discount}</span>
                        </div>
                      )}

                      <Separator className="my-2 bg-zinc-800" />

                      <div className="flex justify-between text-base font-bold">
                        <span>Total</span>
                        <span className="text-orange-400">${order.total}</span>
                      </div>
                    </div>

                    {/* Account & Status */}
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                          In-Game Name
                        </div>
                        <div className="font-medium">{order.minecraft_username}</div>
                      </div>

                      {order.coupon_code && (
                        <div>
                          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                            Coupon Used
                          </div>
                          <Badge variant="outline" className="bg-green-950/30 border-green-800/40 text-green-400">
                            {order.coupon_code}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
}