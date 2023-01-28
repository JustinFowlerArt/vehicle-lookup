import { Form } from '@remix-run/react';

/**
 * Create list of years starting from the max and ending with the min
 * @param min earliest model year
 * @param max latest model year
 * @returns array of numbers from max to min
 */
const yearRange = (min: number, max: number) => {
    const len = max - min + 1;
    const arr = new Array(len);
    for (let i = 0; i < len; i++) {
        arr[arr.length - i - 1] = min + i;
    }
    return arr;
};

const Lookup = () => (
    <div className='flex flex-col items-center w-full '>
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 mb-4'>
            Vehicle Lookup
        </h2>

        <Form method='get' action='/result' className='flex flex-col w-64'>
            <label
                htmlFor='vin'
                className='block text-sm font-medium text-gray-700 mb-1'
            >
                VIN
            </label>
            <input
                className='w-full mb-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                name='vin'
                type='text'
                maxLength={17}
                required
            />
            <label
                htmlFor='year'
                className='block text-sm font-medium text-gray-700 mb-1'
            >
                Year
            </label>
            <select
                className='w-full mb-4 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                name='year'
                required
            >
                <option value=''>Please select a year</option>
                {/* Generate list of date ranges from 1908 until two years in the future to account for new model years */}
                {yearRange(1908, new Date().getFullYear() + 2).map(year => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <button
                type='submit'
                className='rounded-md mt-2 border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
                Submit
            </button>
        </Form>
    </div>
);

export default Lookup;
