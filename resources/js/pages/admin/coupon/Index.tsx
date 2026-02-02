import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    MoreHorizontal,
    Plus,
    Search,
    Pencil,
    Trash2,
    Copy,
} from 'lucide-react';
import AdminLayout from '@/components/admin/layout'; // adjust path
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast'; // or your toast library
import AppLayout from '@/layouts/app-layout';

// ────────────────────────────────────────────────
// Types (based on your Laravel $fillable)
interface Coupon {
    id: number;
    code: string;
    type: 'percent' | 'fixed';
    value: number;
    min_spend: number | null;
    max_uses: number | null;
    used_count: number;
    expires_at: string | null; // ISO date string or null
    is_active?: boolean; // assuming you added this (common field)
    created_at: string;
}

interface Props {
    coupons: Coupon[];
    filters?: { search?: string };
}

// ────────────────────────────────────────────────
// Form Data Type
interface CouponFormData {
    code: string;
    type: 'percent' | 'fixed';
    value: number | '';
    min_spend: number | '';
    max_uses: number | '';
    expires_at: string; // 'YYYY-MM-DD' or empty
    is_active: boolean;
}

// ────────────────────────────────────────────────
export default function CouponsIndex({ coupons, filters = {} }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

    // Inertia form
    const { data, setData, post, put, processing, errors, reset } =
        useForm<CouponFormData>({
            code: '',
            type: 'fixed',
            value: '',
            min_spend: '',
            max_uses: '',
            expires_at: '',
            is_active: true,
        });

    // ─── Open modal for create ───────────────────────────────
    const openCreateModal = () => {
        reset();
        setEditingCoupon(null);
        setIsModalOpen(true);
    };

    // ─── Open modal for edit ─────────────────────────────────
    const openEditModal = (coupon: Coupon) => {
        setEditingCoupon(coupon);
        setData({
            code: coupon.code,
            type: coupon.type,
            value: coupon.value,
            min_spend: coupon.min_spend ?? '',
            max_uses: coupon.max_uses ?? '',
            expires_at: coupon.expires_at
                ? coupon.expires_at.split('T')[0]
                : '', // YYYY-MM-DD
            is_active: coupon.is_active ?? true,
        });
        setIsModalOpen(true);
    };

    // ─── Submit handler (create or update) ───────────────────
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCoupon) {
            // Update
            put(route('admin.coupons.update', editingCoupon.id), {
                onSuccess: () => {
                    toast.success('Coupon updated successfully');
                    setIsModalOpen(false);
                    reset();
                },
                onError: () => toast.error('Failed to update coupon'),
            });
        } else {
            // Create
            post(route('admin.coupons.store'), {
                onSuccess: () => {
                    toast.success('Coupon created successfully');
                    setIsModalOpen(false);
                    reset();
                },
                onError: () => toast.error('Failed to create coupon'),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (!confirm('Delete this coupon permanently?')) return;
        router.delete(route('admin.coupons.destroy', id), {
            onSuccess: () => toast.success('Coupon deleted'),
        });
    };

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success('Code copied!');
    };

    // ─── Search ───────────────────────────────────────────────
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.coupons.index'),
            { search },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout>
            <Head title="Admin | Coupons" />

            <div className="container mx-auto space-y-10 px-6 py-10">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                            Coupon{' '}
                            <span className="text-primary">Management</span>
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Manage discount codes for the store.
                        </p>
                    </div>
                    <Button
                        onClick={openCreateModal}
                        size="lg"
                        className="gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        New Coupon
                    </Button>
                </div>

                {/* Search */}
                <Card className="border-white/10 bg-[#121212]">
                    <CardHeader className="pb-4">
                        <CardTitle>Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSearch}
                            className="flex flex-wrap gap-3"
                        >
                            <div className="relative min-w-[220px] flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search code..."
                                    className="pl-9"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Button type="submit">Search</Button>
                            {search && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearch('');
                                        router.get(
                                            route('admin.coupons.index'),
                                            {},
                                            { preserveState: true },
                                        );
                                    }}
                                >
                                    Clear
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* Table */}
                <Card className="overflow-hidden border-white/10 bg-[#121212]">
                    <CardHeader className="border-b border-white/5">
                        <CardTitle>Coupons ({coupons.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {coupons.length === 0 ? (
                            <div className="py-16 text-center text-muted-foreground">
                                No coupons yet. Create one to get started.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Value</TableHead>
                                            <TableHead>Min Spend</TableHead>
                                            <TableHead>Uses</TableHead>
                                            <TableHead>Expires</TableHead>
                                            <TableHead>Active</TableHead>
                                            <TableHead className="text-right">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {coupons.map((coupon, i) => (
                                            <motion.tr
                                                key={coupon.id}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.04 }}
                                                className="border-b border-white/5 hover:bg-white/5"
                                            >
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        {coupon.code}
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() =>
                                                                copyToClipboard(
                                                                    coupon.code,
                                                                )
                                                            }
                                                        >
                                                            <Copy className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="capitalize">
                                                    {coupon.type}
                                                </TableCell>
                                                <TableCell>
                                                    {coupon.type === 'percent'
                                                        ? `${coupon.value}%`
                                                        : `$${coupon.value}`}
                                                </TableCell>
                                                <TableCell>
                                                    {coupon.min_spend
                                                        ? `$${coupon.min_spend}`
                                                        : '-'}
                                                </TableCell>
                                                <TableCell>
                                                    {coupon.used_count} /{' '}
                                                    {coupon.max_uses ?? '∞'}
                                                </TableCell>
                                                <TableCell>
                                                    {coupon.expires_at
                                                        ? new Date(
                                                              coupon.expires_at,
                                                          ).toLocaleDateString()
                                                        : 'Never'}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            coupon.is_active
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {coupon.is_active
                                                            ? 'Active'
                                                            : 'Inactive'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            align="end"
                                                            className="border-white/10 bg-[#1a1a1a]"
                                                        >
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    openEditModal(
                                                                        coupon,
                                                                    )
                                                                }
                                                                className="gap-2"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="gap-2 text-destructive"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        coupon.id,
                                                                    )
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* ─── CREATE / EDIT MODAL ──────────────────────────────────────── */}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="border-white/10 bg-[#121212] sm:max-w-[480px]">
                        <DialogHeader>
                            <DialogTitle>
                                {editingCoupon
                                    ? `Edit Coupon: ${editingCoupon.code}`
                                    : 'Create New Coupon'}
                            </DialogTitle>
                            <DialogDescription>
                                {editingCoupon
                                    ? 'Update discount settings.'
                                    : 'Add a new discount code for players.'}
                            </DialogDescription>
                        </DialogHeader>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5 py-2"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <Label htmlFor="code">Coupon Code *</Label>
                                    <Input
                                        id="code"
                                        value={data.code}
                                        onChange={(e) =>
                                            setData(
                                                'code',
                                                e.target.value.toUpperCase(),
                                            )
                                        }
                                        placeholder="SUMMER2025"
                                        className={
                                            errors.code
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    {errors.code && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.code}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="type">
                                        Discount Type *
                                    </Label>
                                    <Select
                                        value={data.type}
                                        onValueChange={(val) =>
                                            setData(
                                                'type',
                                                val as 'percent' | 'fixed',
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fixed">
                                                Fixed Amount ($)
                                            </SelectItem>
                                            <SelectItem value="percent">
                                                Percent (%)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.type}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="value">Value *</Label>
                                    <Input
                                        id="value"
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        value={data.value}
                                        onChange={(e) =>
                                            setData(
                                                'value',
                                                Number(e.target.value),
                                            )
                                        }
                                        placeholder={
                                            data.type === 'percent'
                                                ? '15'
                                                : '5.99'
                                        }
                                    />
                                    {errors.value && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.value}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="min_spend">
                                        Min. Spend ($)
                                    </Label>
                                    <Input
                                        id="min_spend"
                                        type="number"
                                        min="0"
                                        value={data.min_spend}
                                        onChange={(e) =>
                                            setData(
                                                'min_spend',
                                                e.target.value
                                                    ? Number(e.target.value)
                                                    : '',
                                            )
                                        }
                                        placeholder="0 (no minimum)"
                                    />
                                    {errors.min_spend && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.min_spend}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="max_uses">Max Uses</Label>
                                    <Input
                                        id="max_uses"
                                        type="number"
                                        min="1"
                                        value={data.max_uses}
                                        onChange={(e) =>
                                            setData(
                                                'max_uses',
                                                e.target.value
                                                    ? Number(e.target.value)
                                                    : '',
                                            )
                                        }
                                        placeholder="∞ (unlimited)"
                                    />
                                    {errors.max_uses && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.max_uses}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <Label htmlFor="expires_at">
                                        Expires At
                                    </Label>
                                    <Input
                                        id="expires_at"
                                        type="date"
                                        value={data.expires_at}
                                        onChange={(e) =>
                                            setData(
                                                'expires_at',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.expires_at && (
                                        <p className="mt-1 text-sm text-destructive">
                                            {errors.expires_at}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-2 flex items-center space-x-2 pt-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) =>
                                            setData('is_active', checked)
                                        }
                                    />
                                    <Label htmlFor="is_active">
                                        Active / Enabled
                                    </Label>
                                </div>
                            </div>

                            <DialogFooter className="gap-2 sm:gap-0">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsModalOpen(false)}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Saving...'
                                        : editingCoupon
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
