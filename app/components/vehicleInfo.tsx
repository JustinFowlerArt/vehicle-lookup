import { Link } from '@remix-run/react';
import type { ImagesAPI } from '~/types/imagesAPI';

interface Props {
    vehicleFeatures: {
        description: string;
        property: string;
    }[];
    vehicleImages: ImagesAPI[];
}

/**
 * Takes vehicle features and maps over each feature in the list. Also returns the first three images from the image search.
 * @returns list of vehicle features and first three images
 */
const VehicleInfo = ({ vehicleFeatures, vehicleImages }: Props) => (
    <div className='grid sm:grid-cols-2'>
        <div className='px-6'>
            <div className='pl-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:py-2 sm:pl-6'>
                <div>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>
                        Vehicle Information
                    </h3>
                    <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                        Based on the provided VIN number
                    </p>
                </div>
                <div className='hidden sm:block'>
                    <Link
                        to='/home'
                        className='block text-center ml-auto w-24 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm sm: hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                        Go Back
                    </Link>
                </div>
            </div>
            {vehicleFeatures.map((feature, index) => (
                <div
                    key={index}
                    className='border-t border-gray-200 px-4 py-2 sm:px-0'
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
        <div className='px-6'>
            <ul className='grid lg:grid-cols-2 gap-4 py-5'>
                {/* Reduces vehicleImages list to first three images and displays with one large and two smaller images on desktop and three small images on mobile */}
                {vehicleImages.slice(0, 3).map((image, index) => (
                    <li
                        key={index}
                        className={`mx-auto ${
                            index === 0 ? 'lg:col-span-2' : 'lg:col-span-1'
                        }`}
                    >
                        <img src={image.url} alt={image.origin.title} />
                    </li>
                ))}
            </ul>
        </div>
        <div className='sm:hidden'>
            <Link
                to='/home'
                className='block text-center mx-auto w-24 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm sm: hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
                Go Back
            </Link>
        </div>
    </div>
);

export default VehicleInfo;
