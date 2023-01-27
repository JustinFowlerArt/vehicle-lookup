import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import type { VehicleInfo } from '~/types/vehicleInfo';
import google from 'googlethis';
import ErrorBoundary from '~/components/errorBoundary';
import { CatchBoundary } from '~/components/catchBoundary';

export const loader = async ({ request }: LoaderArgs) => {
    const url = new URL(request.url);
    const vin = url.searchParams.get('vin');
    const year = url.searchParams.get('year');

    const vehicleRes = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}*BA?format=json&modelyear=${year}`
    );
    const vehicleAPI: VehicleInfo = await vehicleRes.json();
    const vehicleDetails = vehicleAPI.Results[0];

    const googleSearch = await google.image(
        vehicleDetails.ModelYear + vehicleDetails.Make + vehicleDetails.Model,
        { safe: true }
    );

    return json({
        vehicleDetails: vehicleDetails,
        vehicleImages: googleSearch,
    });
};

const Result = () => {
    const { vehicleDetails, vehicleImages } = useLoaderData<typeof loader>();

    const vehicleFeatures = [
        {
            description: 'Year',
            property: vehicleDetails.ModelYear,
        },
        {
            description: 'Make',
            property: vehicleDetails.Make,
        },
        {
            description: 'Model',
            property: vehicleDetails.Model,
        },
        {
            description: 'Body Style',
            property: vehicleDetails.BodyClass,
        },
        {
            description: 'Trim',
            property: vehicleDetails.Trim,
        },
        {
            description: 'Doors',
            property: vehicleDetails.Doors,
        },
        {
            description: 'Horse Power',
            property: vehicleDetails.EngineHP,
        },
        {
            description: 'Fuel Type',
            property: vehicleDetails.FuelTypePrimary,
        },
        {
            description: 'GVWR',
            property: vehicleDetails.GVWR,
        },
        {
            description: 'Plant Country',
            property: vehicleDetails.PlantCountry,
        },
        {
            description: 'Plant City',
            property: vehicleDetails.PlantCity,
        },
    ];

    return (
        <div className='grid sm:grid-cols-2'>
            {vehicleDetails ? (
                <div className='p-6'>
                    <div className='px-4 py-5 sm:px-6'>
                        <h3 className='text-lg font-medium leading-6 text-gray-900'>
                            Vehicle Information
                        </h3>
                        <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                            Based on the provided VIN number
                        </p>
                    </div>
                    {vehicleFeatures?.map((feature, index) => (
                        <div
                            key={index}
                            className='border-t border-gray-200 py-2'
                        >
                            <dl className='sm:divide-y sm:divide-gray-200'>
                                <div className='sm:grid sm:grid-cols-2 sm:gap-4 sm:py-2 sm:px-6'>
                                    <dt className='text-sm font-medium text-gray-500'>
                                        {feature.description}
                                    </dt>
                                    <dd className='mt-1 text-sm text-gray-900 sm:mt-0'>
                                        {feature.property || 'N/A'}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    ))}
                </div>
            ) : (
                <CatchBoundary />
            )}
            <div className='p-6'>
                <ul className='grid lg:grid-cols-2 gap-4 py-5'>
                    {vehicleImages?.slice(0, 3).map((image, index) => (
                        <li
                            key={index}
                            className={`${
                                index === 0 ? 'lg:col-span-2' : 'lg:col-span-1'
                            }`}
                        >
                            <img src={image.url} alt={image.origin.title} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Result;
