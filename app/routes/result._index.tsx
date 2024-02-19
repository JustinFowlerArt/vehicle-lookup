import { json } from '@remix-run/node';
import {
	Link,
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
} from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/node';
import type { vehicleAPI } from '~/types/vehicleAPI';
import google from 'googlethis';
import VehicleInfo from '~/components/vehicleInfo';

/**
 * Extracts vin and year from url searchParams and fetches vehicle information from the NHTSA api. After retrieving the vehicle information, it uses the year, make, and model of the vehicle to perform a Google search and retrieve images.
 * @returns vehicleDetails and vehicleImages json object
 */
export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const vin = url.searchParams.get('vin');
	const year = url.searchParams.get('year');

	const vehicleRes = await fetch(
		`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}*BA?format=json&modelyear=${year}`
	);
	const vehicleAPI: vehicleAPI = await vehicleRes.json();
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

/**
 * Pulls data from loader params, filters vehicleDetails down to the desired list of features and generates the vehicle info component
 * @returns list of vehicle details and vehicle images
 */
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
		<main className='py-8 sm:px-6 lg:px-8'>
			<VehicleInfo
				vehicleFeatures={vehicleFeatures}
				vehicleImages={vehicleImages}
			/>
		</main>
	);
};

/**
 * Needs to be expanded to include error handling for other error cases
 * @returns No vehicle found message and back button
 */
export const ErrorBoundary = () => {
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
		return (
			<div className='py-8 px-6 lg:px-8 flex flex-col items-center text-center'>
				We couldn't find vehicles matching that VIN. Please try again.
				<Link
					to='/home'
					className='w-24 rounded-md mt-4 border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
				>
					Go Back
				</Link>
			</div>
		);
	}

	return (
		<div>
		  <h1>Uh oh ...</h1>
		  <p>Something went wrong.</p>
		</div>
	  );
};

export default Result;
