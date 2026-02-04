import FlashMessage from '@/components/notify/FlashMessage';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { Toaster as HotToast } from 'react-hot-toast';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <HotToast position="bottom-right" reverseOrder={false} />
        <FlashMessage />

        {children}
    </AppLayoutTemplate>
);
