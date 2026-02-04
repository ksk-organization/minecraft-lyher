// resources/js/pages/admin/Categories.tsx
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
import { route } from 'ziggy-js';
import AppLayout from '@/layouts/app-layout';
import CategoryForm from '@/components/admin/modal/CategoryForm';

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────
interface Category {
  id: number;
  name: string;
  slug: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface Props {
  categories: Category[];
}

// ────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────
export default function AdminCategoriesIndex({ categories }: Props) {
  const [search, setSearch] = useState('');
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewCategory, setViewCategory] = useState<Category | null>(null);

  const form = useForm({
    id: 0,
    name: '',
    slug: '',
    display_order: 0,
  });

  const isCreate = modalMode === 'create';
  const isEdit = modalMode === 'edit';

  const filteredCategories = useMemo(() => 
    categories.filter(cat =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.slug.toLowerCase().includes(search.toLowerCase())
    ),
  [categories, search]);

  const openCreate = useCallback(() => {
    form.reset();
    setModalMode('create');
  }, [form]);

  const openEdit = useCallback((cat: Category) => {
    form.setData({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      display_order: cat.display_order,
    });
    setModalMode('edit');
  }, [form]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (isCreate) {
      form.post(route('admin.categories.store'), {
        preserveScroll: true,
        onSuccess: () => {
          form.reset();
          setModalMode(null);
          router.reload({ only: ['categories'] });
        },
      });
    } else if (isEdit) {
      form.put(route('admin.categories.update', form.data.id), {
        preserveScroll: true,
        onSuccess: () => {
          setModalMode(null);
          router.reload({ only: ['categories'] });
        },
      });
    }
  }, [form, isCreate, isEdit]);

  const confirmDelete = useCallback((id: number) => {
    setDeleteId(id);
  }, []);

  const executeDelete = useCallback(() => {
    if (!deleteId) return;
    router.delete(route('admin.categories.destroy', deleteId), {
      preserveScroll: true,
      onSuccess: () => {
        setDeleteId(null);
        router.reload({ only: ['categories'] });
      },
    });
  }, [deleteId]);

  const refresh = useCallback(() => {
    router.reload({ only: ['categories'] });
  }, []);

  return (
    <AppLayout>
      <Head title="Admin | Categories" />

      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Categories</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64 lg:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-10 bg-black/30 border-white/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button onClick={openCreate} className="gap-2 shadow-sm">
              <PlusCircle size={18} />
              New Category
            </Button>

            <Button variant="outline" size="icon" onClick={refresh} title="Refresh list">
              <RefreshCw size={18} />
            </Button>
          </div>
        </div>

        {/* Table Card */}
        <Card className="border-white/5 bg-[#1f1f1f] overflow-hidden">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="flex items-center justify-between">
              <span>All Categories ({filteredCategories.length})</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {filteredCategories.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <p className="text-lg font-medium">
                  {search ? 'No matching categories' : 'No categories yet'}
                </p>
                {!search && (
                  <p className="mt-2">
                    Click "New Category" to create your first one.
                  </p>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b border-white/5">
                      <TableHead>Name</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Display Order</TableHead>
                      <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((cat) => (
                      <TableRow key={cat.id} className="hover:bg-white/5 border-b border-white/5">
                        <TableCell className="font-medium">{cat.name}</TableCell>
                        <TableCell className="font-mono text-muted-foreground">{cat.slug}</TableCell>
                        <TableCell className="font-medium">{cat.display_order}</TableCell>
                        <TableCell className="text-right space-x-1 pr-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewCategory(cat)}
                            title="View details"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEdit(cat)}
                            title="Edit category"
                          >
                            <Pencil size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive/90"
                            onClick={() => confirmDelete(cat.id)}
                            title="Delete category"
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
          <DialogContent className="sm:max-w-lg bg-[#1f1f1f] border-white/10">
            <DialogHeader>
              <DialogTitle>
                {isCreate ? 'Create New Category' : 'Edit Category'}
              </DialogTitle>
              <DialogDescription>
                {isCreate
                  ? 'Add a new product category.'
                  : 'Update category details.'}
              </DialogDescription>
            </DialogHeader>

            <CategoryForm
              data={form.data}
              setData={form.setData}
              errors={form.errors}
              processing={form.processing}
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
                onClick={handleSubmit}
                disabled={form.processing}
                className="min-w-[140px]"
              >
                {form.processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isCreate ? 'Creating...' : 'Saving...'}
                  </>
                ) : isCreate ? (
                  'Create Category'
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
                Are you sure you want to delete this category?<br />
                <span className="text-destructive font-medium">
                  Products assigned to it may become uncategorized.
                </span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-3">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={executeDelete}>
                Delete Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Details Dialog */}
        <Dialog open={!!viewCategory} onOpenChange={() => setViewCategory(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{viewCategory?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-muted-foreground">Slug</h4>
                  <p className="font-mono">{viewCategory?.slug}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-muted-foreground">Display Order</h4>
                  <p className="font-medium">{viewCategory?.display_order ?? 0}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1 text-muted-foreground">Created</h4>
                <p className="text-sm">
                  {viewCategory?.created_at
                    ? new Date(viewCategory.created_at).toLocaleString()
                    : '—'}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewCategory(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}