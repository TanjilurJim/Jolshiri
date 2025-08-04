import { createInertiaApp } from '@inertiajs/react';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import '@sweetalert2/theme-dark/dark.css';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/app.css';
import { initializeTheme } from './hooks/use-appearance';
import { PlotProvider } from './lib/addPlotContext';
import { CivilianProvider } from './lib/CivilianContext';
import { OfficerProvider } from './lib/officerContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <PlotProvider>
                <OfficerProvider>
                    <CivilianProvider>
                        <Theme>
                            <App {...props} />
                        </Theme>
                        <Toaster position="top-right" richColors />
                    </CivilianProvider>
                </OfficerProvider>
            </PlotProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
