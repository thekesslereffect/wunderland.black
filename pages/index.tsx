import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { AddressRain, MatrixRain, TextScramble } from '../components';
import { useState } from "react";
import { useRouter } from 'next/navigation';

import dynamic from 'next/dynamic';
import { setup, draw} from '../p5/base.p5';
const Sketch = dynamic(import('react-p5'), { ssr: false });


const Home: NextPage = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringWVNDR, setIsHoveringWVNDR] = useState(false);
  const [isHoveringDescription, setIsHoveringDescription] = useState(false);
  const router = useRouter();

  return (
    // <div className="flex flex-col min-h-screen min-w-screen items-center justify-center py-2 bg-black ">
    <div className="bg-black">
      
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className=" bg-black text-white font-overpass max-h-screen overflow-hidden">
        {/* <MatrixRain /> */}
        <Sketch setup={setup} draw={draw} className="mx-auto max-h-screen overflow-hidden font-overpass bg-black"/>
        
        <div className="flex flex-col mx-auto max-w-7xl w-auto min-h-screen py-6 sm:px-6 lg:px-8 items-center ">
          <div className="flex flex-col w-auto absolute top-20 md:top-1/3 px-8 text-center ">
            {/* <h1 className="text-4xl  md:text-7xl font-bold ">_WVNDR.LAND</h1> */}
            <h1 className="text-4xl  md:text-7xl font-bold h-20 overflow-hidden" onMouseEnter={() => setIsHoveringWVNDR(true)} onMouseLeave={() => setIsHoveringWVNDR(false)}>
              <TextScramble text={isHoveringWVNDR ? "WONDERLAND" : "_WVNDR.LAND"} scrambleColor={"rgba(255, 0, 130, 1)"} unscrambleColor={"white"} />
            </h1>
            <p className="text-md mt-10  md:text-lg font-semibold w-auto overflow-hidden"onMouseEnter={() => setIsHoveringDescription(true)} onMouseLeave={() => setIsHoveringDescription(false)}>
              <TextScramble text={isHoveringDescription ? "We're all mad here..." : "Not all who wander are lost"} scrambleColor={"rgba(255, 0, 130, 1)"} unscrambleColor={"white"} />
            </p>
          </div>
          <div className="flex w-full absolute bottom-8 md:bottom-1/3 px-8 justify-center items-center">
            {/* <button className="btn bg-white rounded-xl text-black font-semibold text-md p-3 w-full md:max-w-lg ">Connect</button> */}

            <button className="btn rounded-xl hover:border-hot border-2 h-14 bg-[rgba(5,5,5)] text-white font-semibold text-md p-3 w-full md:max-w-lg overflow-hidden" 
              onMouseEnter={() => setIsHovering(true)} 
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => router.push('/frontpage')} 
              >
                
                  <TextScramble text={isHovering ? "> _rabbitHole" : "0x047C...7432"} scrambleColor={"rgba(255, 0, 130, 1)"} unscrambleColor={"white"} />
                
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
