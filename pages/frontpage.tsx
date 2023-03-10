import React from 'react';
import { useRouter } from 'next/navigation';

const FrontPage = () => {
    const router = useRouter();
    return(
        
            <div className="snap-x flex snap-mandatory h-screen w-screen mx-auto overflow-scroll bg-black text-white">

                <div className="snap-start flex-shrink-0 flex-col  h-screen w-screen flex justify-center items-center ">
                    <div className='text-8xl mb-10'>1</div>
                    <div className="flex w-full bottom-8 md:bottom-1/3 px-8 justify-center items-center ">
                        <button className="btn rounded-xl border-2 border-white h-14 text-white font-semibold text-md p-3 w-full md:max-w-lg  hover:border-[#FF0082] hover:text-[#FF0082]" onClick={() => router.push('/')}>Back</button>
                    </div>
                </div>

                <div className="snap-start flex-shrink-0 flex-col  h-screen w-screen flex justify-center items-center ">
                    <div className='text-8xl mb-10'>2</div>
                </div>

            </div>
    
    );
}

export default FrontPage;

