import React, { useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle2, ArrowLeft, ShoppingBag } from 'lucide-react';
import Layout from '@/components/homepage/layout'; // your main layout
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface SuccessPageProps {
    payment?: 'success'; // from session()->get('payment')
    order_id?: number; // optional
    success?: string; // flash message
    order?: {
        // if you passed whole order or subset
        id: number;
        minecraft_username: string;
        total: number | string;
        status: string;
        // ... other fields you want to show
    };
}

export default function PaymentSuccess({
    payment,
    success,
    order_id,
    order,
}: SuccessPageProps) {
    // useEffect(() => {
    //     // Protect against direct access / refresh abuse
    //     if (payment !== 'success') {
    //         router.visit(route('products.index'), { replace: true }); // or '/products'
    //     }
    // }, [payment]);

    // // If already redirected, don't render anything (safety)
    // if (payment !== 'success') {
    //     return null;
    // }

    return (
        <Layout>
            <Head title="Payment Successful - NOMROTI" />

            <div className="container mx-auto max-w-3xl px-5 py-16 md:py-24">
                <Card className="border-green-500/30 bg-gradient-to-b from-[#1a2a1a] to-[#121f12] shadow-2xl">
                    <CardHeader className="pb-2 text-center">
                        <div className="mx-auto mb-6 rounded-full bg-green-900/30 p-6">
                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                        </div>
                        <CardTitle className="text-4xl font-black tracking-tight text-white">
                            Payment Submitted Successfully!
                        </CardTitle>
                        <CardDescription className="mt-4 text-xl text-zinc-300">
                            {success ||
                                'Your receipt has been received. We will verify it shortly and activate your order.'}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-8 pt-8 text-center">
                        {order || order_id ? (
                            <div className="rounded-lg bg-black/40 p-6">
                                <h3 className="mb-4 text-xl font-semibold text-green-400">
                                    Order Details
                                </h3>
                                <dl className="mx-auto max-w-md space-y-3 text-left">
                                    {order_id && (
                                        <>
                                            <div className="flex justify-between">
                                                <dt className="text-zinc-400">
                                                    Order ID
                                                </dt>
                                                <dd className="font-mono text-white">
                                                    #{order_id}
                                                </dd>
                                            </div>
                                        </>
                                    )}
                                    {order?.minecraft_username && (
                                        <div className="flex justify-between">
                                            <dt className="text-zinc-400">
                                                Minecraft Username
                                            </dt>
                                            <dd className="text-white">
                                                {order.minecraft_username}
                                            </dd>
                                        </div>
                                    )}
                                    {order?.total && (
                                        <div className="flex justify-between">
                                            <dt className="text-zinc-400">
                                                Amount
                                            </dt>
                                            <dd className="text-xl font-bold text-green-400">
                                                $
                                                {Number(order.total).toFixed(2)}
                                            </dd>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <dt className="text-zinc-400">
                                            Status
                                        </dt>
                                        <dd className="font-semibold text-yellow-400">
                                            Pending Review
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        ) : null}

                        <div className="space-y-4 pt-6">
                            <p className="text-zinc-300">
                                Thank you for your purchase! We'll notify you
                                once your order is processed.
                            </p>

                            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="gap-2"
                                >
                                    <Link href="/products">
                                        <ArrowLeft className="h-5 w-5" />
                                        Back to Catalog
                                    </Link>
                                </Button>

                                <Button
                                    asChild
                                    size="lg"
                                    className="gap-2 bg-primary hover:bg-primary/90"
                                >
                                    <Link
                                        href={
                                            order_id
                                                ? route(
                                                      'product.show',
                                                      order_id,
                                                  )
                                                : '/account/orders'
                                        }
                                    >
                                        <ShoppingBag className="h-5 w-5" />
                                        View My Orders
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Optional: small note */}
                <p className="mt-10 text-center text-sm text-zinc-500">
                    Order processing usually takes 1–24 hours. Check your email
                    for updates.
                </p>
            </div>
        </Layout>
    );
}
