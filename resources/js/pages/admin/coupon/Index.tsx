// resources/js/pages/admin/CouponsIndex.tsx
import React, { useState, useCallback, useMemo } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { toast } from 'react-hot-toast';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Copy,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { route } from 'ziggy-js';
import AppLayout from '@/layouts/app-layout';

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────
interface Coupon {
  id: number;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  min_spend: number | null;
  max_uses: number | null;
  used_count: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

interface Props {
  coupons: Coupon[];
  filters?: { search?: string };
}

// Form values — numbers can be empty during typing
interface CouponFormData {
  code: string;
  type: 'percent' | 'fixed';
  value: number | '';
  min_spend: number | '';
  max_uses: number | '';
  expires_at: string;
  is_active: boolean;
}

// ────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────
function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Never';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function CouponStatusBadge({ active }: { active: boolean }) {
  return (
    <Badge variant={active ? 'default' : 'secondary'} className="font-medium">
      {active ? 'Active' : 'Inactive'}
    </Badge>
  );
}

// ────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────
export default function CouponsIndex({ coupons, filters = {} }: Props) {
  const [search, setSearch] = useState(filters.search || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const form = useForm<CouponFormData>({
    code: '',
    type: 'fixed',
    value: '',
    min_spend: '',
    max_uses: '',
    expires_at: '',
    is_active: true,
  });

  const isEditing = !!editingCoupon;

  const openCreateModal = useCallback(() => {
    form.reset();
    setEditingCoupon(null);
    setIsModalOpen(true);
  }, [form]);

  const openEditModal = useCallback((coupon: Coupon) => {
    setEditingCoupon(coupon);
    form.setData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      min_spend: coupon.min_spend ?? '',
      max_uses: coupon.max_uses ?? '',
      expires_at: coupon.expires_at ? coupon.expires_at.split('T')[0] : '',
      is_active: coupon.is_active ?? true,
    });
    setIsModalOpen(true);
  }, [form]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const routeName = isEditing ? 'admin.coupons.update' : 'admin.coupons.store';
    const method = isEditing ? 'put' : 'post';
    const params = isEditing ? [editingCoupon!.id] : [];

    (form as any)[method](route(routeName, ...params), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success(isEditing ? 'Coupon updated' : 'Coupon created');
        setIsModalOpen(false);
        form.reset();
      },
      onError: () => toast.error('Operation failed'),
    });
  }, [form, isEditing, editingCoupon]);

  const handleDelete = useCallback((id: number) => {
    if (!confirm('Delete this coupon permanently?')) return;
    router.delete(route('admin.coupons.destroy', id), {
      preserveScroll: true,
      onSuccess: () => toast.success('Coupon deleted'),
      onError: () => toast.error('Delete failed'),
    });
  }, []);

  const copyCode = useCallback((code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard');
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    router.get(
      route('admin.coupons.index'),
      { search: search.trim() || undefined },
      { preserveState: true, replace: true }
    );
  }, [search]);

  const clearSearch = useCallback(() => {
    setSearch('');
    router.get(route('admin.coupons.index'), {}, { preserveState: true });
  }, []);

  return (
    <AppLayout>
      <Head title="Admin | Coupons" />

      <div className="container mx-auto space-y-10 px-5 py-8 md:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Coupon Management
            </h1>
            <p className="mt-1.5 text-muted-foreground">
              Create and manage discount codes for your store
            </p>
          </div>
          <Button onClick={openCreateModal} size="lg" className="gap-2">
            <Plus size={18} />
            New Coupon
          </Button>
        </div>

        {/* Filter / Search */}
        <Card className="border-white/10 bg-[#121212]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Filter Coupons</CardTitle>
          </CardHeader>
          <CardContent className='pb-4'>
            <form onSubmit={handleSearchSubmit} className="flex flex-wrap gap-3">
              <div className="relative min-w-[240px] flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by code..."
                  className="pl-10 bg-black/40 border-white/10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
              {search && (
                <Button variant="ghost" onClick={clearSearch}>
                  Clear
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Coupons Table */}
        <Card className="border-white/10 bg-[#121212] overflow-hidden">
          <CardHeader className="border-b border-white/5">
            <CardTitle>Coupons ({coupons.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {coupons.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                <p className="text-lg font-medium">No coupons found</p>
                <p className="mt-2">Create your first coupon to start offering discounts.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-white/5">
                      <TableHead>Code</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Min Spend</TableHead>
                      <TableHead>Uses</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coupons.map((coupon) => (
                      <TableRow
                        key={coupon.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span className="font-mono">{coupon.code}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => copyCode(coupon.code)}
                              title="Copy code"
                            >
                              <Copy size={14} />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{coupon.type}</TableCell>
                        <TableCell>
                          {coupon.type === 'percent' ? `${coupon.value}%` : `$${coupon.value}`}
                        </TableCell>
                        <TableCell>
                          {coupon.min_spend ? `$${coupon.min_spend}` : '—'}
                        </TableCell>
                        <TableCell>
                          {coupon.used_count} / {coupon.max_uses ?? '∞'}
                        </TableCell>
                        <TableCell>{formatDate(coupon.expires_at)}</TableCell>
                        <TableCell>
                          <CouponStatusBadge active={coupon.is_active} />
                        </TableCell>
                        <TableCell className="text-right pr-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10">
                              <DropdownMenuItem
                                onClick={() => openEditModal(coupon)}
                                className="gap-2 cursor-pointer"
                              >
                                <Pencil size={16} />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2 text-destructive cursor-pointer focus:text-destructive"
                                onClick={() => handleDelete(coupon.id)}
                              >
                                <Trash2 size={16} />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create / Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-lg bg-[#121212] border-white/10">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {isEditing ? `Edit ${editingCoupon?.code}` : 'Create Coupon'}
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? 'Modify the discount settings.'
                  : 'Define a new discount code for your players.'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="code">Coupon Code *</Label>
                  <Input
                    id="code"
                    value={form.data.code}
                    onChange={(e) => form.setData('code', e.target.value.toUpperCase())}
                    placeholder="WELCOME25"
                    className={cn(form.errors.code && 'border-destructive')}
                    disabled={form.processing}
                  />
                  {form.errors.code && (
                    <p className="mt-1.5 text-sm text-destructive">{form.errors.code}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="type">Discount Type *</Label>
                  <Select
                    value={form.data.type}
                    onValueChange={(v) => form.setData('type', v as 'percent' | 'fixed')}
                    disabled={form.processing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                      <SelectItem value="percent">Percentage (%)</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.errors.type && (
                    <p className="mt-1.5 text-sm text-destructive">{form.errors.type}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="value">Value *</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={form.data.value}
                    onChange={(e) => form.setData('value', e.target.value ? Number(e.target.value) : '')}
                    placeholder={form.data.type === 'percent' ? '10' : '4.99'}
                    disabled={form.processing}
                  />
                  {form.errors.value && (
                    <p className="mt-1.5 text-sm text-destructive">{form.errors.value}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="min_spend">Minimum Spend ($)</Label>
                  <Input
                    id="min_spend"
                    type="number"
                    min="0"
                    value={form.data.min_spend}
                    onChange={(e) => form.setData('min_spend', e.target.value ? Number(e.target.value) : '')}
                    placeholder="No minimum"
                    disabled={form.processing}
                  />
                  {form.errors.min_spend && (
                    <p className="mt-1.5 text-sm text-destructive">{form.errors.min_spend}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="max_uses">Maximum Uses</Label>
                  <Input
                    id="max_uses"
                    type="number"
                    min="1"
                    value={form.data.max_uses}
                    onChange={(e) => form.setData('max_uses', e.target.value ? Number(e.target.value) : '')}
                    placeholder="Unlimited"
                    disabled={form.processing}
                  />
                  {form.errors.max_uses && (
                    <p className="mt-1.5 text-sm text-destructive">{form.errors.max_uses}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="expires_at">Expiration Date</Label>
                  <Input
                    id="expires_at"
                    type="date"
                    value={form.data.expires_at}
                    onChange={(e) => form.setData('expires_at', e.target.value)}
                    disabled={form.processing}
                  />
                  {form.errors.expires_at && (
                    <p className="mt-1.5 text-sm text-destructive">{form.errors.expires_at}</p>
                  )}
                </div>

                <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                  <Switch
                    id="is_active"
                    checked={form.data.is_active}
                    onCheckedChange={(checked) => form.setData('is_active', checked)}
                    disabled={form.processing}
                  />
                  <Label htmlFor="is_active" className="cursor-pointer">
                    Coupon is active
                  </Label>
                </div>
              </div>

              <DialogFooter className="gap-3 sm:gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  disabled={form.processing}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={form.processing}>
                  {form.processing
                    ? 'Saving...'
                    : isEditing
                      ? 'Update Coupon'
                      : 'Create Coupon'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}