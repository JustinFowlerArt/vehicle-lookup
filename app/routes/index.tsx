import Lookup from '~/components/lookup';

const Home = () => (
    <div className='pt-10'>
        <main className='flex flex-col items-center w-full'>
            <h1 className='text-lg text-center font-bold mb-4'>Vehicle Lookup</h1>
            <Lookup />
        </main>
    </div>
);

export default Home;
