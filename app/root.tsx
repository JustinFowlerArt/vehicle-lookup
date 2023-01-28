import { Links, LiveReload, Outlet } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import styles from './tailwind.css';
import Header from './components/header';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

const Document = ({
    children,
    title = `Vehicle Lookup`,
}: {
    children: React.ReactNode;
    title?: string;
}) => (
    <html lang='en'>
        <head>
            <meta charSet='utf-8' />
            <title>{title}</title>
            <Links />
        </head>
        <body className='h-full'>
            <Header />
            {children}
            <LiveReload />
        </body>
    </html>
);

const App = () => (
    <Document>
        <Outlet />
    </Document>
);

export const ErrorBoundary = ({ error }: { error: Error }) => {
    return (
        <Document title='Uh-oh!'>
            <div className='text-center py-8 sm:px-6 lg:px-8'>
                <h1>App Error</h1>
                <pre>{error.message}</pre>
            </div>
        </Document>
    );
};

export default App;
