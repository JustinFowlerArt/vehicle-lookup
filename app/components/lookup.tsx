import { Form } from '@remix-run/react';

const yearRange = (min: number, max: number) => {
    const len = max - min + 1;
    const arr = new Array(len);
    for (let i = 0; i < len; i++) {
        arr[arr.length - i - 1] = min + i;
    }
    return arr;
};

const Lookup = () => {
    return (
        <Form method='get' action='/result' className='flex flex-col w-64'>
            <label htmlFor='vin' className='font-medium text-gray-700 mb-2'>
                VIN
            </label>
            <div className='mt-1'>
                <input
                    className='w-full mb-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    name='vin'
                    type='text'
                    maxLength={17}
                    required
                />
            </div>
            <label htmlFor='year' className='font-medium text-gray-700 mb-2'>
                Year
            </label>

            <select
                className='w-full mb-4 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
                name='year'
                required
            >
                <option value=''>Please select a year</option>
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
    );
};

export default Lookup;
