import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node'; // or cloudflare/deno

export const loader = async ({ request }: LoaderArgs) => {
    const url = new URL(request.url);
    const vin = url.searchParams.get('vin');
    const year = url.searchParams.get('year');
    const res = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}*BA?format=json&modelyear=${year}`
    );
    return json(await res.json());
};

const Result = () => {
    const data = useLoaderData<typeof loader>();
    return (
        <ul>
            <li key={data?.Results[0].VIN}>
                <span>{data?.Results[0].Make}</span>
                <span>{data?.Results[0].Model}</span>
                <span></span>
            </li>
        </ul>
    );
};

export default Result;
