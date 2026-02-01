import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  RefreshCw,
  Eye,
  X,
  AlertCircle,
} from 'lucide-react';

import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';
import { route } from 'ziggy-js';

interface GameMode {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  server_ip: string;
  image_url?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Props {
  game_modes: GameMode[];
}

function GameModeForm({
  data,
  setData,
  errors,
  processing,
  isEdit = false,
}: {
  data: any;
  setData: any;
  errors: any;
  processing: boolean;
  isEdit?: boolean;
}) {
  return (
    <div className="space-y-6 py-4">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            placeholder="NOMROTI ECO"
          />
          {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={data.slug}
            onChange={(e) => setData('slug', e.target.value)}
            placeholder="nomroti-eco"
          />
          {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={data.description || ''}
          onChange={(e) => setData('description', e.target.value)}
          placeholder="Describe this game mode..."
          rows={3}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="server_ip">Server IP *</Label>
          <Input
            id="server_ip"
            value={data.server_ip}
            onChange={(e) => setData('server_ip', e.target.value)}
            placeholder="nomroti.net"
          />
          {errors.server_ip && <p className="text-sm text-destructive">{errors.server_ip}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL (optional)</Label>
          <Input
            id="image_url"
            value={data.image_url || ''}
            onChange={(e) => setData('image_url', e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {data.image_url && (
            <div className="mt-3">
              <img
                src={data.image_url}
                alt="Preview"
                className="h-20 w-auto max-w-full rounded border border-border object-contain"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          )}
          {errors.image_url && <p className="text-sm text-destructive">{errors.image_url}</p>}
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-4">
        <Switch
          id="is_active"
          checked={data.is_active}
          onCheckedChange={(checked) => setData('is_active', checked)}
        />
        <Label htmlFor="is_active">Active / Visible in frontend</Label>
      </div>
    </div>
  );
}

export default function AdminGameModesIndex({ game_modes }: Props) {
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState<number | null>(null);
  const [viewOpen, setViewOpen] = useState<GameMode | null>(null);

  const createForm = useForm({
    title: '',
    slug: '',
    description: '',
    server_ip: 'nomroti.net',
    image_url: '',
    is_active: true,
  });

  const editForm = useForm<GameMode>({
    id: 0,
    title: '',
    slug: '',
    description: '',
    server_ip: '',
    image_url: '',
    is_active: true,
  });

  const filteredModes = game_modes.filter((gm) =>
    gm.title.toLowerCase().includes(search.toLowerCase()) ||
    gm.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    createForm.post(route('admin.game-modes.store'), {
      onSuccess: () => {
        createForm.reset();
        setCreateOpen(false);
        router.reload({ only: ['game_modes'] });
      },
    });
  };

  const handleEdit = (gm: GameMode) => {
    editForm.setData(gm);
    setEditOpen(true);
  };

  const submitEdit = () => {
    editForm.put(route('admin.game-modes.update', editForm.data.id), {
      onSuccess: () => {
        setEditOpen(false);
        router.reload({ only: ['game_modes'] });
      },
    });
  };

  const handleDelete = (id: number) => {
    router.delete(route('admin.game-modes.destroy', id), {
      onSuccess: () => {
        setDeleteOpen(null);
        router.reload({ only: ['game_modes'] });
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Manage Game Modes" />

      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Game Modes</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage game modes (Eco, Skyblock, Practice, etc.)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search game modes..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button onClick={() => setCreateOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Game Mode
            </Button>
          </div>
        </div>

        {/* Table */}
        <Card className="border-white/5 bg-[#1f1f1f]">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="flex justify-between items-center">
              <span>All Game Modes</span>
              <Button variant="ghost" size="sm" onClick={() => router.reload()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 pt-1">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Server IP</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                        No game modes found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredModes.map((mode) => (
                      <TableRow key={mode.id} className="hover:bg-white/3">
                        <TableCell>
                          {mode.image_url ? (
                            <img
                              src={mode.image_url}
                              alt={mode.title}
                              className="h-10 w-16 object-cover rounded border border-border"
                              onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                          ) : (
                            <div className="h-10 w-16 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                              No img
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{mode.title}</TableCell>
                        <TableCell className="text-muted-foreground">{mode.slug}</TableCell>
                        <TableCell className="font-mono">{mode.server_ip}</TableCell>
                        <TableCell>
                          <Badge variant={mode.is_active ? 'default' : 'secondary'}>
                            {mode.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => setViewOpen(mode)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(mode)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive/90"
                            onClick={() => setDeleteOpen(mode.id)}
                          >
                            <Trash2 className="h-4 w-4" />
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

        {/* View Modal */}
        <Dialog open={!!viewOpen} onOpenChange={() => setViewOpen(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{viewOpen?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {viewOpen?.image_url && (
                <div className="flex justify-center">
                  <img
                    src={viewOpen.image_url}
                    alt={viewOpen.title}
                    className="max-h-48 object-contain rounded-lg border border-border"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-1">Slug</h4>
                  <p className="text-muted-foreground font-mono">{viewOpen?.slug}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Server IP</h4>
                  <p className="font-mono">{viewOpen?.server_ip}</p>
                </div>
              </div>
              {viewOpen?.description && (
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {viewOpen.description}
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewOpen(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Modal */}
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Game Mode</DialogTitle>
            </DialogHeader>
            <GameModeForm
              data={createForm.data}
              setData={createForm.setData}
              errors={createForm.errors}
              processing={createForm.processing}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={createForm.processing}>
                {createForm.processing ? 'Creating...' : 'Create Game Mode'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Game Mode</DialogTitle>
            </DialogHeader>
            <GameModeForm
              data={editForm.data}
              setData={editForm.setData}
              errors={editForm.errors}
              processing={editForm.processing}
              isEdit
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitEdit} disabled={editForm.processing}>
                {editForm.processing ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <Dialog open={deleteOpen !== null} onOpenChange={() => setDeleteOpen(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-destructive flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Confirm Delete
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this game mode? All associated products will also be affected.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteOpen(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteOpen && handleDelete(deleteOpen)}
              >
                Delete Game Mode
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
