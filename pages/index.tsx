import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center justify-center py-2 bg-black ">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-screen  flex-1 flex-col items-center justify-center px-20 text-center text-white font-overpass">
        <div className="absolute top-20 md:top-0 md:relative">
          <h1 className="text-4xl  md:text-7xl font-bold ">_WUNDERLAND.</h1>

          <p className="text-md mt-10  md:text-lg font-bold">
            We're all mad here
          </p>
        </div>

        <div className="absolute bottom-8 md:bottom-48 flex w-full px-8 justify-center ">
          <button className="btn bg-white rounded-2xl text-black font-bold text-md p-3 w-full md:max-w-lg ">
            Connect
          </button>
          {/* <button className='btn  rounded-2xl border-4 text-white font-bold text-2xl p-3 w-full md:max-w-lg '>> Rabbit Hole</button> */}
        </div>
      </main>
    </div>
  );
};

export default Home;
