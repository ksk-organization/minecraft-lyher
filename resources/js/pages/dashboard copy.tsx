import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import React, { useState, useMemo } from 'react';
import {
    Clock,
    DollarSign,
    CheckCircle,
    XCircle,
    RefreshCw,
    Search,
    Paperclip,
    Check,
    X,
    ShieldAlert,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// --- Types for Security & Performance ---
interface Order {
    id: number;
    user: string;
    avatar: string;
    platform: 'java' | 'bedrock';
    item: string;
    price: number;
    receipt: string;
    time: string;
    status?: 'Approved' | 'Rejected';
    staff?: string;
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const [pendingOrders, setPendingOrders] = useState<Order[]>([
        {
            id: 101,
            user: 'Steve',
            avatar: 'https://minotar.net/helm/Steve/30.png',
            platform: 'java',
            item: 'Titan Rank',
            price: 25.0,
            receipt: '...',
            time: '2 mins ago',
        },
        {
            id: 102,
            user: 'Alex_PvP',
            avatar: 'https://minotar.net/helm/Alex/30.png',
            platform: 'bedrock',
            item: 'God Key (x5)',
            price: 100.0,
            receipt: '...',
            time: '15 mins ago',
        },
    ]);

    const [history, setHistory] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // --- Performance: Memoized Calculations ---
    // This prevents recalculating stats on every tiny re-render
    const stats = useMemo(() => {
        const approved = history.filter((o) => o.status === 'Approved');
        const revenue = approved.reduce((sum, o) => sum + o.price, 0);
        return {
            pending: pendingOrders.length,
            revenue: revenue,
            approved: approved.length,
            rejected: history.filter((o) => o.status === 'Rejected').length,
        };
    }, [pendingOrders, history]);

    const filteredHistory = useMemo(() => {
        return history.filter(
            (o) =>
                o.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.id.toString().includes(searchTerm),
        );
    }, [history, searchTerm]);

    // --- Actions ---
    const processOrder = (id: number, status: 'Approved' | 'Rejected') => {
        const order = pendingOrders.find((o) => o.id === id);
        if (!order) return;

        // Secure Confirmation
        if (!window.confirm(`Confirm ${status} for Order #${id}?`)) return;

        setPendingOrders((prev) => prev.filter((o) => o.id !== id));
        setHistory((prev) => [
            { ...order, status, staff: 'Admin', time: 'Just now' },
            ...prev,
        ]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <header className="mb-8 flex items-center justify-between rounded-2xl border border-white/5 bg-[#121212] p-4">
                    <div className="text-warning flex items-center gap-2 font-black italic">
                        <ShieldAlert className="text-yellow-500" /> NOMROTI{' '}
                        <span className="text-sm font-medium text-zinc-500 not-italic">
                            | Admin Panel
                        </span>
                    </div>
                    <div className="text-xs text-zinc-500">
                        Logged in as{' '}
                        <strong className="text-zinc-200">Admin</strong>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
                    <StatCard
                        label="Pending"
                        value={stats.pending}
                        icon={<Clock />}
                        color="text-yellow-500"
                    />
                    <StatCard
                        label="Revenue"
                        value={`$${stats.revenue}`}
                        icon={<DollarSign />}
                        color="text-green-500"
                    />
                    <StatCard
                        label="Approved"
                        value={stats.approved}
                        icon={<CheckCircle />}
                        color="text-blue-500"
                    />
                    <StatCard
                        label="Rejected"
                        value={stats.rejected}
                        icon={<XCircle />}
                        color="text-red-500"
                    />
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* Pending Approvals */}
                    <section className="overflow-hidden rounded-2xl border border-white/5 bg-[#121212]">
                        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 p-4">
                            <h2 className="flex items-center gap-2 text-sm font-bold tracking-widest text-yellow-500 uppercase">
                                <Clock size={16} /> Pending Approvals
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-white/5 text-[10px] font-black text-zinc-500 uppercase">
                                    <tr>
                                        <th className="p-4">ID</th>
                                        <th>User</th>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence mode="popLayout">
                                        {pendingOrders.map((order) => (
                                            <motion.tr
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                key={order.id}
                                                className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                                            >
                                                <td className="p-4 text-zinc-500">
                                                    #{order.id}
                                                </td>
                                                <td>
                                                    <div className="flex items-center gap-2">
                                                        <img
                                                            src={order.avatar}
                                                            className="h-6 w-6 rounded border border-white/10"
                                                            alt=""
                                                        />
                                                        {order.user}
                                                    </div>
                                                </td>
                                                <td>{order.item}</td>
                                                <td className="font-mono font-bold text-yellow-500">
                                                    ${order.price.toFixed(2)}
                                                </td>
                                                <td className="flex gap-2 p-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            processOrder(
                                                                order.id,
                                                                'Approved',
                                                            )
                                                        }
                                                        className="text-green-500 hover:bg-green-500/20"
                                                    >
                                                        <Check size={16} />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            processOrder(
                                                                order.id,
                                                                'Rejected',
                                                            )
                                                        }
                                                        className="text-red-500 hover:bg-red-500/20"
                                                    >
                                                        <X size={16} />
                                                    </Button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ label, value, icon, color }: any) {
    return (
        <Card className="flex items-center gap-4 border-white/5 bg-[#121212] p-4">
            <div className={`rounded-xl bg-white/5 p-3 ${color}`}>{icon}</div>
            <div>
                <div className="text-2xl font-black tracking-tighter">
                    {value}
                </div>
                <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    {label}
                </div>
            </div>
        </Card>
    );
}
