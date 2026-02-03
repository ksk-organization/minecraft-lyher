// resources/js/pages/admin/Dashboard.tsx
import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import {
  Search,
  RefreshCw,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  PlusCircle,
  Eye,
  Check,
  X,
} from 'lucide-react';

import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { ProductCreateModalContent } from '@/components/admin/ProductCreateForm'; // ← we'll extract form
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';

// Types matching backend shape
interface StatProps {
  pending: number;
  revenue: string; // already formatted
  approved: number;
  rejected: number;
}

interface OrderItem {
  id: number;
  minecraft_username: string;
  avatar: string;
  platform: string;
  item: string;
  price: number;
  receipt: string | null;
  time: string;
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

interface GameMode { id: number; title: string; }
interface Category { id: number; name: string; }

interface Props {
  stats: StatProps;
  pending_orders: OrderItem[];
  history: HistoryEntry[];
  game_modes: GameMode[];
  categories: Category[];
}

// Stat Card (unchanged)
const StatCard = ({ icon: Icon, value, label, color = 'orange' }: {
  icon: any;
  value: string | number;
  label: string;
  color?: string;
}) => {
  const colorClasses = {
    orange: 'text-orange-500 bg-orange-950/30',
    green:  'text-green-500 bg-green-950/30',
    red:    'text-red-500 bg-red-950/30',
  }[color] ?? 'text-gray-400 bg-gray-900/30';

  return (
    <Card className="bg-[#252525] border-white/5 hover:border-orange-500/50 transition-all">
      <CardContent className="p-6 flex items-center gap-5">
        <div className={cn("p-4 rounded-xl", colorClasses)}>
          <Icon size={28} />
        </div>
        <div>
          <p className="text-3xl font-black">{value}</p>
          <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AdminDashboard({
  stats,
  pending_orders,
  history,
  game_modes,
  categories,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const filteredHistory = history.filter(entry =>
    entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.id.toString().includes(searchTerm) ||
    entry.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Process order action (approve/reject)
  const handleProcessOrder = (orderId: number, action: 'approve' | 'reject') => {
    if (!confirm(`Are you sure you want to ${action} order #${orderId}?`)) return;

    router.post(route('admin.orders.process', orderId), {
      action,
    }, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        router.reload({ only: ['pending_orders', 'history', 'stats'] });
      }
    });
  };

  return (
    <AppLayout>
      <Head title="Admin Dashboard - NOMROTI" />

      <div className="p-4 md:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>
          <Button onClick={() => setCreateModalOpen(true)}>
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Product
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard icon={Clock}        value={stats.pending}   label="Pending Orders" />
          <StatCard icon={DollarSign}   value={`$${stats.revenue}`} label="Revenue Total" />
          <StatCard icon={CheckCircle}  value={stats.approved}  label="Approved"  color="green" />
          <StatCard icon={XCircle}      value={stats.rejected}  label="Rejected"  color="red" />
        </div>

        {/* Pending Orders */}
        <Card className="bg-[#252525] border-white/5">
          <CardHeader className="flex-row justify-between border-b border-white/5 pb-4">
            <CardTitle className="text-xl font-bold flex items-center gap-2 text-orange-500">
              <Clock size={20} /> Pending Approvals
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => router.reload()}>
              <RefreshCw size={16} className="mr-2" /> Refresh
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Order ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Proof</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pending_orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                        No pending orders
                      </TableCell>
                    </TableRow>
                  ) : (
                    pending_orders.map(order => (
                      <TableRow key={order.id} className="hover:bg-white/3">
                        <TableCell className="text-muted-foreground">#{order.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={order.avatar} alt={order.minecraft_username} />
                              <AvatarFallback>{order.minecraft_username[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{order.minecraft_username}</div>
                              <div className="text-xs text-muted-foreground capitalize">{order.platform.toLowerCase()}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{order.item}</TableCell>
                        <TableCell className="font-bold text-orange-400">${order.price}</TableCell>
                        <TableCell>
                          {order.receipt ? (
                            <Button variant="ghost" size="sm" onClick={() => setSelectedReceipt(order.receipt!)}>
                              <Eye size={16} className="mr-2" /> View
                            </Button>
                          ) : (
                            <span className="text-muted-foreground text-sm">No proof</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{order.time}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-green-500 hover:bg-green-950/30"
                            onClick={() => handleProcessOrder(order.id, 'approve')}
                          >
                            <Check size={18} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-500 hover:bg-red-950/30"
                            onClick={() => handleProcessOrder(order.id, 'reject')}
                          >
                            <X size={18} />
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

        {/* History */}
        <Card className="bg-[#252525] border-white/5">
          <CardHeader className="flex-row justify-between border-b border-white/5 pb-4">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Clock size={20} /> Recent History
            </CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search user, ID, item..."
                className="pl-10 bg-black/30 border-white/10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Order ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Processed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                        No history records
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredHistory.map(entry => (
                      <TableRow key={entry.id} className="hover:bg-white/3">
                        <TableCell className="text-muted-foreground">#{entry.id}</TableCell>
                        <TableCell>{entry.user}</TableCell>
                        <TableCell>{entry.item}</TableCell>
                        <TableCell>${entry.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={entry.status === 'Paid' || entry.status === 'Completed' ? 'default' : 'destructive'}
                            className={cn(
                              (entry.status === 'Paid' || entry.status === 'Completed')
                                ? "bg-green-600/30 text-green-300 hover:bg-green-600/40"
                                : "bg-red-600/30 text-red-300 hover:bg-red-600/40"
                            )}
                          >
                            {entry.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{entry.staff}</TableCell>
                        <TableCell className="text-muted-foreground">{entry.time}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Receipt Modal */}
      <Dialog open={!!selectedReceipt} onOpenChange={() => setSelectedReceipt(null)}>
        <DialogContent className="sm:max-w-3xl bg-[#1a1a1a] border-white/10">
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
          </DialogHeader>
          {selectedReceipt && (
            <div className="py-4">
              <img
                src={selectedReceipt}
                alt="Receipt"
                className="w-full rounded-lg border border-white/10 max-h-[70vh] object-contain mx-auto"
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReceipt(null)}>Close</Button>
            {selectedReceipt && (
              <Button asChild>
                <a href={selectedReceipt} target="_blank" rel="noopener noreferrer">
                  Open Original
                </a>
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Product Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1a1a1a] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create New Product</DialogTitle>
          </DialogHeader>

          <ProductCreateModalContent
            game_modes={game_modes}
            categories={categories}
            onSuccess={() => {
              setCreateModalOpen(false);
              router.reload({ only: ['stats'] }); // refresh stats at least
            }}
          />
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
