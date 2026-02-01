import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
  PlusCircle,
  Pencil,
  Trash2,
  Search,
  RefreshCw,
  Eye,
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { route } from 'ziggy-js';

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

function CategoryForm({
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
          <Label htmlFor="name">Category Name *</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="Ranks"
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={data.slug}
            onChange={(e) => setData('slug', e.target.value)}
            placeholder="ranks"
          />
          {errors.slug && <p className="text-sm text-destructive">{errors.slug}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="display_order">Display Order</Label>
        <Input
          id="display_order"
          type="number"
          min="0"
          value={data.display_order}
          onChange={(e) => setData('display_order', Number(e.target.value) || 0)}
        />
        <p className="text-xs text-muted-foreground">
          Lower numbers appear first in menus and listings
        </p>
      </div>
    </div>
  );
}

export default function AdminCategoriesIndex({ categories }: Props) {
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState<number | null>(null);
  const [viewOpen, setViewOpen] = useState<Category | null>(null);

  const createForm = useForm({
    name: '',
    slug: '',
    display_order: 0,
  });

  const editForm = useForm<Category>({
    id: 0,
    name: '',
    slug: '',
    display_order: 0,
  });

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    cat.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    createForm.post(route('admin.categories.store'), {
      onSuccess: () => {
        createForm.reset();
        setCreateOpen(false);
        router.reload({ only: ['categories'] });
      },
    });
  };

  const handleEdit = (cat: Category) => {
    editForm.setData(cat);
    setEditOpen(true);
  };

  const submitEdit = () => {
    editForm.put(route('admin.categories.update', editForm.data.id), {
      onSuccess: () => {
        setEditOpen(false);
        router.reload({ only: ['categories'] });
      },
    });
  };

  const handleDelete = (id: number) => {
    router.delete(route('admin.categories.destroy', id), {
      onSuccess: () => {
        setDeleteOpen(null);
        router.reload({ only: ['categories'] });
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Manage Categories" />

      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Categories</h1>
            <p className="text-muted-foreground mt-1">
              Group products (Ranks, Crates, Keys, Perks, Bundles, ...)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button onClick={() => setCreateOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Category
            </Button>
          </div>
        </div>

        {/* Table */}
        <Card className="border-white/5 bg-[#1f1f1f]">
          <CardHeader className="border-b border-white/5">
            <CardTitle className="flex justify-between items-center">
              <span>All Categories</span>
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
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Display Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                        No categories found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCategories.map((cat) => (
                      <TableRow key={cat.id} className="hover:bg-white/3">
                        <TableCell className="font-medium">{cat.name}</TableCell>
                        <TableCell className="text-muted-foreground font-mono">{cat.slug}</TableCell>
                        <TableCell>{cat.display_order}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => setViewOpen(cat)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive/90"
                            onClick={() => setDeleteOpen(cat.id)}
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
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{viewOpen?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-1">Slug</h4>
                  <p className="text-muted-foreground font-mono">{viewOpen?.slug}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Display Order</h4>
                  <p className="font-medium">{viewOpen?.display_order ?? 0}</p>
                </div>
              </div>
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
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <CategoryForm
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
                {createForm.processing ? 'Creating...' : 'Create Category'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <CategoryForm
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
                Are you sure you want to delete this category? Products in this category may become uncategorized.
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
                Delete Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
