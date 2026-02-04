// resources/js/pages/admin/Dashboard.tsx
import React, { useState, useCallback, useMemo } from 'react';
import { Head, router } from '@inertiajs/react';
import {
    Search,
    RefreshCw,
    Clock,
    DollarSign,
    CheckCircle,
    XCircle,
    Eye,
    Check,
    X,
    AlertCircle,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { route } from 'ziggy-js';
import AppLayout from '@/layouts/app-layout';

// ────────────────────────────────────────────────
// Types (fixed to match actual data structure)
// ────────────────────────────────────────────────
interface StatProps {
    pending: number;
    revenue: string;
    approved: number;
    rejected: number;
}

interface PendingOrder {
    id: number;
    minecraft_username: string;
    avatar: string;
    platform: string;
    product: { name: string }; // ← fixed: was order.product.name
    qty: number; // ← added missing qty
    total: string | number; // ← price → total
    attachment_url: string | null;
    created_at: string;
}

interface HistoryEntry {
    id: number;
    user: string;
    item: string;
    amount: number;
    status: string;
    staff: string;
    time: string;
}

interface GameMode {
    id: number;
    title: string;
}
interface Category {
    id: number;
    name: string;
}

interface Props {
    stats: StatProps;
    pending_orders: PendingOrder[];
    history: HistoryEntry[];
    game_modes: GameMode[];
    categories: Category[];
}

// ────────────────────────────────────────────────
// Reusable Components (small, single responsibility)
// ────────────────────────────────────────────────
function StatCard({
    icon: Icon,
    value,
    label,
    color = 'orange',
}: {
    icon: React.ElementType;
    value: string | number;
    label: string;
    color?: 'orange' | 'green' | 'red';
}) {
    const colorClasses =
        {
            orange: 'text-orange-500 bg-orange-950/30',
            green: 'text-green-500 bg-green-950/30',
            red: 'text-red-500 bg-red-950/30',
        }[color] ?? 'text-gray-400 bg-gray-900/30';

    return (
        <Card className="group border-white/5 bg-[#252525] transition-all hover:border-orange-500/50">
            <CardContent className="flex items-center gap-5 p-6">
                <div
                    className={cn(
                        'rounded-xl p-4',
                        colorClasses,
                        'transition-transform group-hover:scale-105',
                    )}
                >
                    <Icon size={28} />
                </div>
                <div>
                    <p className="text-3xl font-black">{value}</p>
                    <p className="mt-1 text-sm tracking-wide text-muted-foreground uppercase">
                        {label}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function AttachmentModal({
    url,
    isOpen,
    onClose,
}: {
    url: string | null;
    isOpen: boolean;
    onClose: () => void;
}) {
    if (!url) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] border-white/10 bg-[#1a1a1a] sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Payment Proof</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 py-6">
                    <img
                        src={`/storage/${url}`}
                        alt="Payment proof"
                        className="max-h-[60vh] w-full max-w-2xl rounded-xl border border-white/20 object-contain shadow-2xl"
                    />
                    <div className="flex gap-3 pt-2">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="secondary" asChild>
                            <a
                                href={`/storage/${url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open Original
                            </a>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// ────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────
export default function AdminDashboard({
    stats,
    pending_orders,
    history,
    game_modes,
    categories,
}: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAttachmentUrl, setSelectedAttachmentUrl] = useState<
        string | null
    >(null);
    const [confirmDialog, setConfirmDialog] = useState<{
        isOpen: boolean;
        orderId: number | null;
        action: 'approve' | 'reject' | null;
    }>({
        isOpen: false,
        orderId: null,
        action: null,
    });

    // Memoized filtered history (performance: avoids re-filtering on every render)
    const filteredHistory = useMemo(
        () =>
            history.filter(
                (entry) =>
                    entry.user
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    entry.id.toString().includes(searchTerm) ||
                    entry.item.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        [history, searchTerm],
    );

    // Single callback for order processing (performance + clean)
    const processOrder = useCallback(
        (orderId: number, action: 'approve' | 'reject') => {
            setConfirmDialog({
                isOpen: true,
                orderId,
                action,
            });
        },
        [],
    );

    // Quick refresh callback
    const refreshData = useCallback(() => {
        router.reload({ only: ['pending_orders', 'history', 'stats'] });
    }, []);

    const formatPrice = useCallback((value: number | string) => {
        const num = Number(value);
        return Number.isFinite(num)
            ? `$${num.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
            : '$0.00';
    }, []);

    const handleConfirmAction = useCallback(() => {
        if (!confirmDialog.orderId || !confirmDialog.action) return;

        router.post(
            route('admin.orders.approve', confirmDialog.orderId),
            { orderId : confirmDialog.orderId ,action: confirmDialog.action },
            {
                preserveState: true,
                preserveScroll: true,
                // onSuccess: () => {
                //     router.reload({
                //         only: ['pending_orders', 'history', 'stats'],
                //     });
                //     toast.success(
                //         `Order #${confirmDialog.orderId} ${confirmDialog.action}d`,
                //     );
                // },
                // onError: (errors) => {
                //     console.error('Order processing failed:', errors);
                //     toast.error('Failed to process order');
                // },
            },
        );

        // Close dialog
        setConfirmDialog({ isOpen: false, orderId: null, action: null });
    }, [confirmDialog]);

    return (
        <AppLayout>
            <Head title="Admin Dashboard - NOMROTI" />

            <div className="space-y-8 p-4 md:p-6 lg:p-8">
                {/* ── Header ── */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="bg-gradient-to-r from-white to-orange-400 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
                        Admin Dashboard
                    </h1>
                </div>

                {/* ── Stats Grid ── */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        icon={Clock}
                        value={stats.pending}
                        label="Pending Orders"
                        color="orange"
                    />
                    <StatCard
                        icon={DollarSign}
                        value={stats.revenue}
                        label="Total Revenue"
                    />
                    <StatCard
                        icon={CheckCircle}
                        value={stats.approved}
                        label="Approved"
                        color="green"
                    />
                    <StatCard
                        icon={XCircle}
                        value={stats.rejected}
                        label="Rejected"
                        color="red"
                    />
                </div>

                {/* ── Pending Orders ── */}
                <Card className="border-white/5 bg-[#252525]">
                    <CardHeader className="flex-row items-center justify-between border-b border-white/5 pb-4">
                        <CardTitle className="flex items-center gap-2 text-xl font-bold text-orange-500">
                            <Clock size={20} />
                            Pending Approvals ({pending_orders.length})
                        </CardTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={refreshData}
                            className="gap-1.5"
                        >
                            <RefreshCw
                                size={16}
                                className="animate-spin-slow"
                            />
                            Refresh
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead>ID</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Qty</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Proof</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pending_orders.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                className="h-32 py-10 text-center text-muted-foreground"
                                            >
                                                No pending orders 🎉
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        pending_orders.map((order) => (
                                            <TableRow
                                                key={order.id}
                                                className="border-b border-white/5 hover:bg-white/5"
                                            >
                                                <TableCell className="font-mono text-sm">
                                                    #{order.id}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarImage
                                                                src={
                                                                    order.avatar
                                                                }
                                                            />
                                                            <AvatarFallback className="bg-orange-950/50 font-bold text-orange-400">
                                                                {order.minecraft_username
                                                                    .slice(0, 2)
                                                                    .toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="text-sm font-semibold">
                                                                {
                                                                    order.minecraft_username
                                                                }
                                                            </div>
                                                            <div className="text-xs text-muted-foreground capitalize">
                                                                {order.platform}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {order.product?.name ||
                                                        'N/A'}
                                                </TableCell>
                                                <TableCell className="font-bold text-orange-400">
                                                    {order.qty}
                                                </TableCell>
                                                <TableCell className="font-mono text-lg font-bold text-orange-500">
                                                    {formatPrice(order.total)}
                                                </TableCell>
                                                <TableCell>
                                                    {order.attachment_url ? (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                setSelectedAttachmentUrl(
                                                                    order.attachment_url,
                                                                )
                                                            }
                                                            className="h-9 gap-1.5 px-3"
                                                        >
                                                            <Eye size={14} />
                                                            View Proof
                                                        </Button>
                                                    ) : (
                                                        <span className="rounded-md bg-red-950/50 px-2 py-1 text-xs text-muted-foreground">
                                                            No proof
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground">
                                                    {new Date(
                                                        order.created_at,
                                                    ).toLocaleString()}
                                                </TableCell>
                                                <TableCell className="space-x-1 text-right">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-9 w-9 text-green-500 hover:bg-green-950/40"
                                                        onClick={() =>
                                                            processOrder(
                                                                order.id,
                                                                'approve',
                                                            )
                                                        }
                                                        title="Approve Order"
                                                    >
                                                        <Check size={16} />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-9 w-9 text-red-500 hover:bg-red-950/40"
                                                        onClick={() =>
                                                            processOrder(
                                                                order.id,
                                                                'reject',
                                                            )
                                                        }
                                                        title="Reject Order"
                                                    >
                                                        <X size={16} />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* ── Recent History ── */}
                <Card className="border-white/5 bg-[#252525]">
                    <CardHeader className="flex-row items-center justify-between border-b border-white/5 pb-4">
                        <CardTitle className="flex items-center gap-2 text-xl font-bold">
                            <Clock size={20} />
                            Recent History ({filteredHistory.length})
                        </CardTitle>
                        <div className="relative w-72 md:w-96">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search users, orders, items..."
                                className="h-10 border-white/10 bg-black/30 pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead>ID</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Staff</TableHead>
                                        <TableHead>Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredHistory.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="h-24 py-10 text-center text-muted-foreground"
                                            >
                                                {searchTerm
                                                    ? 'No matching records'
                                                    : 'No history yet'}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredHistory.map((entry) => (
                                            <TableRow
                                                key={entry.id}
                                                className="border-b border-white/5 hover:bg-white/5"
                                            >
                                                <TableCell className="font-mono text-sm">
                                                    #{entry.id}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {entry.user}
                                                </TableCell>
                                                <TableCell className="max-w-xs truncate">
                                                    {entry.item}
                                                </TableCell>
                                                <TableCell className="font-mono font-bold">
                                                    ${Number(entry.amount).toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            [
                                                                'Paid',
                                                                'Completed',
                                                            ].includes(
                                                                entry.status,
                                                            )
                                                                ? 'default'
                                                                : 'destructive'
                                                        }
                                                        className={cn(
                                                            [
                                                                'Paid',
                                                                'Completed',
                                                            ].includes(
                                                                entry.status,
                                                            )
                                                                ? 'border-green-600/40 bg-green-600/30 text-green-300'
                                                                : 'border-red-600/40 bg-red-600/30 text-red-300',
                                                            'transition-transform hover:scale-105',
                                                        )}
                                                    >
                                                        {entry.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {entry.staff}
                                                </TableCell>
                                                <TableCell className="text-xs text-muted-foreground">
                                                    {entry.time}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ── Modals ── */}
            <AttachmentModal
                url={selectedAttachmentUrl}
                isOpen={!!selectedAttachmentUrl}
                onClose={() => setSelectedAttachmentUrl(null)}
            />

            <Dialog
                open={confirmDialog.isOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        setConfirmDialog({
                            isOpen: false,
                            orderId: null,
                            action: null,
                        });
                    }
                }}
            >
                <DialogContent className="border-zinc-800 bg-zinc-950 sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-lg">
                            {confirmDialog.action === 'approve' ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                                <AlertCircle className="h-5 w-5 text-red-500" />
                            )}
                            Confirm{' '}
                            {confirmDialog.action === 'approve'
                                ? 'Approval'
                                : 'Rejection'}
                        </DialogTitle>
                        <DialogDescription className="pt-2 text-zinc-400">
                            Are you sure you want to{' '}
                            <strong>{confirmDialog.action}</strong> order #
                            <span className="font-mono text-orange-400">
                                {confirmDialog.orderId}
                            </span>
                            ?
                            <br />
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-6 gap-3 sm:gap-4">
                        <Button
                            variant="outline"
                            onClick={() =>
                                setConfirmDialog({
                                    isOpen: false,
                                    orderId: null,
                                    action: null,
                                })
                            }
                            className="border-zinc-700 hover:bg-zinc-800"
                        >
                            Cancel
                        </Button>

                        <Button
                            variant={
                                confirmDialog.action === 'approve'
                                    ? 'default'
                                    : 'destructive'
                            }
                            onClick={handleConfirmAction}
                            className={cn(
                                'min-w-[140px]',
                                confirmDialog.action === 'approve'
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-red-600 hover:bg-red-700',
                            )}
                        >
                            {confirmDialog.action === 'approve'
                                ? 'Approve Order'
                                : 'Reject Order'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
