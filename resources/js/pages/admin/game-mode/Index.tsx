// resources/js/pages/admin/GameModes.tsx
import React, { useState, useCallback, useMemo } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  RefreshCw,
  Eye,
  AlertCircle,
  Loader2,
} from 'lucide-react';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { route } from 'ziggy-js';
import AppLayout from '@/layouts/app-layout';
import GameModeForm from '@/components/admin/modal/GameModes';

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────
interface GameMode {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  server_ip: string;
  image_url?: string | null;
  image_background?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Props {
  game_modes: GameMode[];
}

// ────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────
export default function AdminGameModesIndex({ game_modes }: Props) {
  const [search, setSearch] = useState('');
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<GameMode | null>(null);

  const form = useForm({
    id: 0,
    title: '',
    slug: '',
    description: '',
    server_ip: 'nomroti.net',
    image_url: null as File | string | null,
    image_background: null as File | string | null,
    is_active: true,
  });

  const isCreate = modalMode === 'create';
  const isEdit = modalMode === 'edit';

  const filteredModes = useMemo(() =>
    game_modes.filter(gm =>
      gm.title.toLowerCase().includes(search.toLowerCase()) ||
      gm.slug.toLowerCase().includes(search.toLowerCase())
    ),
  [game_modes, search]);

  const openCreate = useCallback(() => {
    form.reset();
    setModalMode('create');
  }, [form]);

  const openEdit = useCallback((gm: GameMode) => {
    form.setData({
      id: gm.id,
      title: gm.title,
      slug: gm.slug,
      description: gm.description ?? '',
      server_ip: gm.server_ip,
      image_url: gm.image_url ?? null,
      image_background: gm.image_background ?? null,
      is_active: gm.is_active,
    });
    setModalMode('edit');
  }, [form]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const routeName = isCreate
      ? 'admin.game-modes.store'
      : 'admin.game-modes.update';

    const url = isCreate
      ? route(routeName)
      : route(routeName, form.data.id);

    router.post(url, {
      ...form.data,
      _method: isCreate ? undefined : 'put',
    }, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        setModalMode(null);
        router.reload({ only: ['game_modes'] });
      },
      onError: (errors) => {
        console.error('Form submission errors:', errors);
      },
    });
  };

  const confirmDelete = useCallback((id: number) => setDeleteId(id), []);
  const executeDelete = useCallback(() => {
    if (!deleteId) return;
    router.delete(route('admin.game-modes.destroy', deleteId), {
      preserveScroll: true,
      onSuccess: () => {
        setDeleteId(null);
        router.reload({ only: ['game_modes'] });
      },
    });
  }, [deleteId]);

  const refresh = useCallback(() => router.reload({ only: ['game_modes'] }), []);

  return (
    <AppLayout>
      <Head title="Admin | Game Modes" />

      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Game Modes</h1>
            <p className="mt-1.5 text-muted-foreground">
              Manage gamemodes (Eco, Skyblock, Practice, Survival, ...)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative w-64 lg:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search game modes..."
                className="pl-10 bg-black/30 border-white/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button onClick={openCreate} className="gap-2">
              <PlusCircle size={18} />
              New Game Mode
            </Button>

            <Button variant="outline" size="icon" onClick={refresh} title="Refresh">
              <RefreshCw size={18} />
            </Button>
          </div>
        </div>

        {/* Table – now showing both images */}
        <Card className="border-white/5 bg-[#1f1f1f] overflow-hidden">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="flex items-center justify-between">
              <span>All Game Modes ({filteredModes.length})</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {filteredModes.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <p className="text-lg font-medium">
                  {search ? 'No matching game modes' : 'No game modes created yet'}
                </p>
                {!search && <p className="mt-2">Click "New Game Mode" to add one.</p>}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-white/5">
                      <TableHead>Preview</TableHead>
                      <TableHead>Background</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Server IP</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredModes.map((mode) => (
                      <TableRow key={mode.id} className="hover:bg-white/5 border-b border-white/5">
                        <TableCell>
                          {mode.image_url ? (
                            <img
                              src={mode.image_url}
                              alt={mode.title}
                              className="h-12 w-20 object-cover rounded border border-border shadow-sm"
                              onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                          ) : (
                            <div className="h-12 w-20 rounded bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
                              No image
                            </div>
                          )}
                        </TableCell>

                        <TableCell>
                          {mode.image_background ? (
                            <img
                              src={mode.image_background}
                              alt={`${mode.title} background`}
                              className="h-12 w-20 object-cover rounded border border-border shadow-sm opacity-80"
                              onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                          ) : (
                            <div className="h-12 w-20 rounded bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
                              No bg
                            </div>
                          )}
                        </TableCell>

                        <TableCell className="font-medium">{mode.title}</TableCell>
                        <TableCell className="font-mono text-muted-foreground">{mode.slug}</TableCell>
                        <TableCell className="font-mono">{mode.server_ip}</TableCell>
                        <TableCell>
                          <Badge variant={mode.is_active ? 'default' : 'secondary'}>
                            {mode.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-1 pr-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode(mode)}
                            title="View details"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEdit(mode)}
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive/90"
                            onClick={() => setDeleteId(mode.id)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create / Edit Dialog */}
        <Dialog open={!!modalMode} onOpenChange={() => setModalMode(null)}>
          <DialogContent className="sm:max-w-3xl bg-[#1f1f1f] border-white/10">
            <DialogHeader>
              <DialogTitle>{isCreate ? 'Create Game Mode' : 'Edit Game Mode'}</DialogTitle>
              <DialogDescription>
                {isCreate
                  ? 'Add a new game mode to the store.'
                  : 'Update game mode details and visibility.'}
              </DialogDescription>
            </DialogHeader>

            <GameModeForm
              data={form.data}
              setData={form.setData}
              errors={form.errors}
              processing={form.processing}
              onSubmit={submit}
            />

            <DialogFooter className="gap-3">
              <Button
                variant="outline"
                onClick={() => setModalMode(null)}
                disabled={form.processing}
              >
                Cancel
              </Button>
              <Button
                onClick={submit}
                disabled={form.processing}
                className="min-w-[160px]"
                type="submit"
              >
                {form.processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isCreate ? 'Creating...' : 'Saving...'}
                  </>
                ) : isCreate ? (
                  'Create Game Mode'
                ) : (
                  'Save Changes'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                Confirm Deletion
              </DialogTitle>
              <DialogDescription className="pt-2">
                Are you sure you want to delete this game mode?<br />
                <span className="text-destructive font-medium">
                  All associated products and purchases may be affected.
                </span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-3">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={executeDelete}>
                Delete Game Mode
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Details Dialog – now includes background image */}
        <Dialog open={!!viewMode} onOpenChange={() => setViewMode(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{viewMode?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {viewMode?.image_url && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Preview Image</h4>
                    <img
                      src={viewMode.image_url}
                      alt={viewMode.title}
                      className="w-full h-40 object-cover rounded-lg border border-border shadow-md"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}

                {viewMode?.image_background && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Background Image</h4>
                    <img
                      src={viewMode.image_background}
                      alt={`${viewMode.title} background`}
                      className="w-full h-40 object-cover rounded-lg border border-border shadow-md opacity-90"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-muted-foreground">Slug</h4>
                  <p className="font-mono">{viewMode?.slug}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-muted-foreground">Server IP</h4>
                  <p className="font-mono">{viewMode?.server_ip}</p>
                </div>
              </div>

              {viewMode?.description && (
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-muted-foreground">Description</h4>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {viewMode.description}
                  </p>
                </div>
              )}

              <div className="text-xs text-muted-foreground pt-2">
                Created: {viewMode?.created_at ? new Date(viewMode.created_at).toLocaleString() : '—'}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setViewMode(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
