<?php

namespace App\Http\Middleware;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        // Only query orders if user is authenticated
        $pendingOrdersCount = 0;
        if ($user) {
            $pendingOrdersCount = Order::query()
                ->where('user_id', $user->id)
                ->where('status', 'pending')
                ->count();
        }

        return array_merge(parent::share($request), [
            // App name (usually static, but good to keep)
            'name' => config('app.name'),

            // Authentication & permissions
            'auth' => [
                'user' => $user ? $user->only([
                    'id',
                    'name',
                    'email',
                    'avatar', // pick only needed fields
                ]) : null,
                'can' => [
                    'access-admin-page' => $user?->can('access-admin-page') ?? false,
                ],
            ],

            // Flash messages (standard)
            'flash' => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
                'errors'   => $request->session()->get('errors'),
                'payment' => $request->session()->get('payment'),
            ],

            // Order count for navigation badge
            'orders_count' => $pendingOrdersCount,

            // Sidebar state (cookie-based persistence)
            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',
        ]);
    }
}
