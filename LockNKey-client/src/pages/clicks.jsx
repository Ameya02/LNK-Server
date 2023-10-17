import React from 'react';

export  function Clicks() {
    return (
        <div className='bg-blue-50 h-screen'  >

            <div className=' bg-blue-50 flex justify-center items-center h-5/6'>
                <div className=' bg-white p-8 rounded-lg shadow-lg '>
                    <h2 className='flex justify-center items-center p-1 text-xl font-semibold'>Verification</h2>
                    <h3 className='flex justify-center items-center p-3 font-normal'>Click on the correct points to verify yourself successfully !</h3>

                    <div className='flex justify-center space-x-1'>
                        <div className="grid grid-cols-3 gap-1">
                            <div className="flex justify-center">
                                <button className="w-22 h-22 bg-slate-300 p-9 rounded-lg"></button>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-22 h-22 bg-slate-300 p-9 rounded-lg"></button>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-22 h-22 bg-slate-300 p-9 rounded-lg"></button>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-22 h-22 bg-slate-300 p-9 rounded-lg"></button>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-22 h-22 bg-slate-300 p-9 rounded-lg"></button>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-22 h-22 bg-slate-300 p-9 rounded-lg"></button>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-22 h-22 bg-slate-300 p-9 rounded-lg"></button>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-22 h-22 bg-slate-300 p-9 rounded-lg"></button>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-22 h-22 bg-slate-300 p-9 rounded-lg"></button>
                            </div>
                        </div>


                    </div>

                    <div className='flex justify-center items-center p-2'>
                        <button type="submit"
                            className="bg-blue-600 text-white  mb-2 rounded w-full hover:bg-blue-700 opacity-90 cursor-pointer px-6 py-4">Verify</button>
                    </div>
                </div>

            </div>

        </div>


    );
}