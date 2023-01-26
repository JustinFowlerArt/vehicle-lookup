import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import type { VehicleInfo } from '~/types/vehicleInfo';
import google from 'googlethis';

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
    const { vehicleDetails, vehicleImages} = useLoaderData<typeof loader>();

    return (
        <>
            <ul>
                <li>Year: {vehicleDetails.ModelYear}</li>
                <li>Make: {vehicleDetails.Make}</li>
                <li>Model: {vehicleDetails.Model}</li>
                <li>Body style: {vehicleDetails.BodyClass}</li>
                <li>Trim: {vehicleDetails.Trim}</li>
                <li>Doors: {vehicleDetails.Doors}</li>
                <li>Horse Power: {vehicleDetails.EngineHP}</li>
                <li>Doors: {vehicleDetails.FuelTypePrimary}</li>
                <li>GVWR: {vehicleDetails.GVWR}</li>
                <li>Plant Country: {vehicleDetails.PlantCountry}</li>
                <li>Plant City: {vehicleDetails.PlantCity}</li>
            </ul>
            <ul>
                <li>
                    <img src={vehicleImages[0]?.url}></img>
                </li>
                <li>
                    <img src={vehicleImages[1]?.url}></img>
                </li>
                <li>
                    <img src={vehicleImages[2]?.url}></img>
                </li>
            </ul>
        </>
    );
};

export default Result;
