// resources/js/Pages/Admin/Products/Index.tsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  RefreshCw,
  Eye,
  AlertCircle,
  ImageIcon,
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { route } from 'ziggy-js';
import AppLayout from '@/layouts/app-layout';
import ProductForm from '@/components/admin/modal/ProductCreateModal';

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────
interface ProductImage {
  id?: number;           // from DB (existing)
  type: 'url' | 'file';
  value: string;         // preview or existing url
  file?: File | null;    // only for new uploads
}

interface Product {
  id: number;
  game_mode_id: number;
  category_id: number;
  name: string;
  slug: string;
  price: number;
  stock: number;
  is_active: boolean;
  short_description: string | null;
  main_icon_url: string | null;
  game_mode?: { id: number; title: string };
  category?: { id: number; name: string };
  images: { id: number; image_url: string }[];
}

interface Props {
  products: { data: Product[]; total: number };
  game_modes: { id: number; title: string }[];
  categories: { id: number; name: string }[];
}

// ────────────────────────────────────────────────
// Main Page Component
// ────────────────────────────────────────────────
export default function AdminProductsIndex({
  products,
  game_modes,
  categories,
}: Props) {
  const [search, setSearch] = useState('');
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const form = useForm({
    id: null as number | null,
    game_mode_id: '',
    category_id: '',
    name: '',
    slug: '',
    price: '',
    stock: '',
    short_description: '',
    is_active: true,
    main_icon_url: null as File | string | null,
    main_icon_preview: null as string | null,
    images: [] as ProductImage[],
  });

  const filteredProducts = useMemo(() =>
    products.data.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
    ),
  [products.data, search]);

  const openCreate = useCallback(() => {
    form.reset();
    setModalMode('create');
  }, [form]);

  const openEdit = useCallback((product: Product) => {
    form.clearErrors();
    form.setData({
      id: product.id,
      game_mode_id: String(product.game_mode_id),
      category_id: String(product.category_id),
      name: product.name,
      slug: product.slug,
      short_description: product.short_description ?? '',
      price: String(product.price),
      stock: String(product.stock),
      is_active: !!product.is_active,
      main_icon_url: product.main_icon_url ?? null,
      main_icon_preview: null,
      images: product.images.map(img => ({
        id: img.id,
        type: 'url',
        value: img.image_url.startsWith('http') ? img.image_url : `/storage/${img.image_url}`,
        file: null,
      })),
    });
    setModalMode('edit');
  }, [form]);

  const handleDelete = useCallback((id: number) => {
    router.delete(route('admin.products.destroy', id), {
      preserveScroll: true,
      onSuccess: () => setDeleteConfirm(null),
    });
  }, []);

  const refresh = useCallback(() => {
    router.reload({ only: ['products'] });
  }, []);

  return (
    <AppLayout>
      <Head title="Products • Admin" />

      <div className="space-y-8 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
              Products
            </h1>
            <p className="mt-2 text-zinc-400">
              Manage all store items • <strong>{products.total}</strong> total
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative w-64 lg:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Search name or slug..."
                className="pl-10 border-zinc-700 bg-zinc-900 focus:border-orange-500"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <Button
              onClick={openCreate}
              className="gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 shadow-lg shadow-orange-900/30"
            >
              <PlusCircle size={18} />
              New Product
            </Button>

            <Button variant="outline" size="icon" onClick={refresh} title="Refresh">
              <RefreshCw size={18} />
            </Button>
          </div>
        </div>

        {/* Table */}
        <Card className="border-zinc-800/50 bg-gradient-to-b from-zinc-950 to-black overflow-hidden">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle className="text-xl">All Products ({filteredProducts.length})</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center text-zinc-500">
                <p className="text-lg font-medium">
                  {search ? 'No matching products' : 'No products created yet'}
                </p>
                {!search && <p className="mt-3">Click "New Product" to add your first item.</p>}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-zinc-900/60">
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                      <TableHead className="w-24 text-xs font-bold text-orange-400 uppercase">Preview</TableHead>
                      <TableHead className="text-xs font-bold text-zinc-300 uppercase">Product</TableHead>
                      <TableHead className="text-xs font-bold text-zinc-300 uppercase hidden md:table-cell">Description</TableHead>
                      <TableHead className="text-xs font-bold text-zinc-300 uppercase">Price / Stock</TableHead>
                      <TableHead className="text-right text-xs font-bold text-zinc-300 uppercase pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredProducts.map(product => (
                      <TableRow
                        key={product.id}
                        className="group border-zinc-800 hover:bg-orange-950/10 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {/* Main Image */}
                            {product.main_icon_url ? (
                              <img
                                src={`/storage/${product.main_icon_url}`}
                                alt={product.name}
                                className="h-14 w-14 rounded-md object-cover border border-zinc-700"
                                onError={e => (e.currentTarget.style.display = 'none')}
                              />
                            ) : (
                              <div className="h-14 w-14 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-600">
                                <ImageIcon size={20} />
                              </div>
                            )}

                            {/* Gallery preview (small) */}
                            {product.images?.length > 0 && (
                              <div className="flex -space-x-2">
                                {product.images.slice(0, 3).map((img, i) => (
                                  <img
                                    key={i}
                                    src={`/storage/${img.image_url}`}
                                    alt="gallery"
                                    className="h-10 w-10 rounded-md object-cover border-2 border-black shadow-sm"
                                  />
                                ))}
                                {product.images.length > 3 && (
                                  <div className="h-10 w-10 rounded-md bg-zinc-800 border-2 border-black flex items-center justify-center text-[10px] font-bold text-zinc-400">
                                    +{product.images.length - 3}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="font-medium text-white group-hover:text-orange-400 transition-colors">
                            {product.name}
                          </div>
                          <div className="mt-0.5 text-xs text-zinc-500 font-mono">
                            {product.game_mode?.title || '—'} • {product.category?.name || 'Uncategorized'}
                          </div>
                        </TableCell>

                        <TableCell className="hidden md:table-cell">
                          <div className="text-sm text-zinc-400 line-clamp-2 max-w-xs">
                            {product.short_description || '—'}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="font-mono font-bold text-orange-400">
                            ${Number(product.price).toFixed(2)}
                          </div>
                          <div className="mt-0.5 text-xs text-zinc-500">
                            {product.stock} in stock
                          </div>
                        </TableCell>

                        <TableCell className="text-right pr-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye size={16} className="text-zinc-400" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => openEdit(product)}
                            >
                              <Pencil size={16} className="text-blue-400" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setDeleteConfirm(product.id)}
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </Button>
                          </div>
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
        <Dialog open={!!modalMode} onOpenChange={() => setModalMode(null)}>
          <DialogContent className="sm:max-w-6xl max-h-[95vh] overflow-hidden bg-gradient-to-br from-zinc-950 via-black to-zinc-950 border-zinc-700/40 shadow-2xl rounded-2xl p-0">
            <DialogHeader className="px-8 py-6 border-b border-zinc-800 bg-black/40 backdrop-blur-sm">
              <DialogTitle className="text-3xl font-black text-orange-500">
                {modalMode === 'create' ? 'Create New Product' : 'Edit Product'}
              </DialogTitle>
              {modalMode === 'edit' && (
                <DialogDescription className="text-zinc-400 mt-1">
                  Product ID: <span className="font-mono text-orange-400">#{form.data.id}</span>
                </DialogDescription>
              )}
            </DialogHeader>

            <div className="p-8 md:p-10 lg:p-12 overflow-y-auto">
              <ProductForm
                form={form}
                mode={modalMode!}
                onClose={() => setModalMode(null)}
                game_modes={game_modes}
                categories={categories}
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
          <DialogContent className="sm:max-w-md border-red-900/40 bg-zinc-950">
            <div className="py-6 text-center">
              <AlertCircle className="mx-auto mb-5 h-14 w-14 text-red-500" />
              <h3 className="mb-3 text-2xl font-bold text-white">Delete Product?</h3>
              <p className="mb-8 text-zinc-300">
                This action cannot be undone.<br />
                All associated data will be permanently removed.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                >
                  Delete Forever
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}