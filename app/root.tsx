import { Links, LiveReload, Outlet } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import styles from './tailwind.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

const App = () => {
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <title>Vehicle Lookup</title>
                <Links />
            </head>
            <body>
                <Outlet />
                <LiveReload />
            </body>
        </html>
    );
};

export default App;
