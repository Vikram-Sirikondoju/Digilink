import { Chart } from 'components/shared'
import React from 'react'
import { COLORS } from 'constants/chart.constant'

import DashboardTab from "./DashboardTab"
// import {BsActivity} from "react-icons/bs";
// import { BsActivity } from "react-icons/bs";


function Dashboard() {
    let arr = [

        { Title: "New Orders", Orders: "5,195", Name: "orders", colorClass: "text-green-700 ",src:"/img/avatars/Vector (1).png" },
        { Title: "Yet to dispath", Orders: "7,829", Name: "orders", colorClass: "text-orange-500 ",src:"/img/avatars/Vector (2).png" },
        { Title: "In trnsit", Orders: "3,490", Name: "orders", colorClass: "text-orange-500 ",src:"/img/avatars/Vector (2).png" },
        { Title: "Delivered", Orders: "5,946", Name: "orders", colorClass: "text-green-700",src:"/img/avatars/Vector (1).png"},
        { Title: "Cancelled", Orders: "1,141", Name: "orders", colorClass: "text-red-600",src:"/img/avatars/Vectorred.png" },
        { Title: "Replaced", Orders: "895", Name: "orders", colorClass: "text-green-700 ",src:"/img/avatars/Vector (1).png" }

    ]


    const data = [
        {
            name: 'Last week',
            data: [44, 55, 57, 56, 61, 58],
        },
        {
            name: 'previous 4 week average',
            data: [35, 41, 36, 26, 45, 48],
        },
    ]

    return (
        <>
        



            <div style={{ backgroundColor: "#f5f5f5" }} className='h-auto  w-auto  p-5 ' >
                <div className='card p-6 pl-4 '>
                    <p className='text-black font-bold'>Status-wise order count</p>
                    <div className='  w-auto grid grid-cols-6 gap-6 h-24 mt-2  '>


                        {

                            arr.map((data) => {
                                return (
                                    <>

                                        <div className=' p-3 pl-6 border-2   '>
                                            <div className=' flex justify-between'>
                                                <p className='text-black'>{data.Title}</p>
                                                <p className='mr-4'><img src={data.src}/></p>
                                            </div>
                                            <div className=' mt-4 w-44  flex truncate '>
                                                <h3  className="font-bold" class={data.colorClass} >{data.Orders}</h3>
                                                <p className='mt-1 ml-1 truncate  text-lg  '>{data.Name}</p>
                                            </div>
                                        </div>


                                    </>
                                )
                            })

                        }


                    </div>
                </div>

                {/* barchart div start here  */}

                <div className='grid grid-cols-12 gap-4 mt-6'>
                    <div className="col-span-8">

                        <div className='card h-auto  w-full p-6'>
                            <p className='text-black text-sm font-bold'>Recent Order</p>
                            <Chart className="w-full"
                                options={{
                                   
                                    plotOptions: {
                                        bar: {
                                            horizontal: false,
                                            columnWidth: '25%',
                                            
                                           
                                        },
                                    },
                                   
                                    // colors: ["#ffb84d"],
                                    dataLabels: {
                                        enabled: false,
                                    },
                                    stroke: {
                                        show: true,
                                        // width: 2,
                                        colors: [''],
                                    },
                                    xaxis: {
                                        colors: ["#ffb84d"],
                                        categories: [
                                            '12am-4am',
                                            '4am-8am',
                                            '8am-12pm',
                                            '12pm-4pm',
                                            '4pm-8pm',
                                            '8pm-12am',
                                           
                                        ],
                                    },
                                    fill: {
                                        opacity: 1,
                                    },
                                    tooltip: {
                                        // y: {
                                        //     formatter: (val) => `$${val} thousands`,
                                        // },
                                    },
                                }}
                                series={data}
                                height={"290"}
                                type="bar"
                                
                            />
                        </div>
                        <div className='card h-auto w-full mt-6  pl-4 pt-3'>
                            <div className='grid grid-cols-12'>
                                <h4 className='col-span-10'>Frequently ordered</h4>
                                <p class='text-end bg-gray-600 flex justify-center  border-2 text-centre text-white'>View All</p>
                            </div>

                            <div className='p-2 grid grid-cols-2'>
                                {/* first */}
                                <div className='flex gap-4 p-2  mb-4'>
                                    <div className='bg-gray-200  h-10 w-10 py-1  mt-3 flex justify-center'>
                                        <img src={'/img/avatars/image 119.png'}/>
                                    </div>
                                    <div className='w-52 truncate' >
                                        <h6>Goole Home</h6>
                                        <p className='text-[12px]'>Lorum 20idygfkbsdfsdukyfgytjtgjh</p>
                                        <p className='text-[12px]'>Lorum 20idygfkbsdfsdukyfjhgjhjjj</p>
                                    </div>
                                    <div className='mt-6 ml-6 flex gap-2' >
                                        <p className='text-sky-600 font-bold'>4,999 </p><p className='text-black'>INR</p>

                                    </div>
                                </div>
                                {/* second */}
                                <div className='flex gap-4 p-2 '>
                                <div className='bg-gray-200  h-10 w-10 p-1  mt-3 flex justify-center'>
                                        <img src={'/img/avatars/image 50.png'}/>
                                    </div>
                                    <div className='w-52 truncate' >
                                        <h6>Google Home Mini</h6>
                                        <p className='text-[12px]'>Lorum 20idygfkbsdfsdukyfgjhgjytj</p>
                                        <p className='text-[12px]'>Lorum 20idygfkbsdfsdukyfgrtytdhty</p>
                                    </div>
                                    <div className='mt-6 ml-6 flex gap-2' >
                                        <p className='text-sky-600 font-bold'>4,999 </p><p className='text-black'>INR</p>

                                    </div>
                                </div>
                                {/* third  */}
                                <div className='flex gap-4 p-2 mb-4'>
                                <div className='bg-gray-200  h-10 w-10  mt-3 flex justify-center'>
                                        <img src={'/img/avatars/image 55.png'}/>
                                    </div>
                                    <div className='w-52 truncate' >
                                        <h6>Amazon Echo Show Bdsdundleeeeegdgsth</h6>
                                        <p className='text-[12px]'>Lorum 20idygfkbsdfsdukyfgjytjyt</p>
                                        <p className='text-[12px]'>Lorum 20idygfkbsdfsdukyfghgjhjf</p>
                                    </div>
                                    <div className='mt-6 ml-6 flex gap-2' >
                                        <p className='text-sky-600 font-bold'>4,999 </p><p className='text-black'>INR</p>

                                    </div>
                                </div>
                                {/* fourth */}
                                <div className='flex gap-4 p-2 mb-4'>
                                <div className='bg-gray-200  h-10 w-10  mt-3 flex justify-center'>
                                        <img src={'/img/avatars/image 40.png'}/>
                                    </div>
                                    <div className='w-52 truncate' >
                                        <h6>Smart Door Lock bundle</h6>
                                        <p className='text-[12px]'>Lorum 20idygfkbsdfsdukyfgjjfj</p>
                                        <p className='text-[12px]'>Lorum 20idygfkbsdfsdukyfgjuyj</p>
                                    </div>
                                    <div className='mt-6 ml-6 flex gap-2' >
                                        <p className='text-sky-600 font-bold'>4,999 </p><p className='text-black'>INR</p>

                                    </div>
                                </div>
                                {/* fifth */}
                                <div className='flex gap-4 p-2 mb-4'>
                                <div className='bg-gray-200  h-10 w-10  mt-3 flex justify-center'>
                                        <img src={'/img/avatars/image 38.png'}/>
                                    </div>
                                    <div className='w-52 truncate' >
                                        <h6>Wireless Smart home..</h6>
                                        <p className='text-[12px]'>Lorum 20idygfkbsdfsdukyfgyjtyu</p>
                                        <p className='text-[12px]'>Lorum 20idygfkbsdfsdukyfgjyujj</p>
                                    </div>
                                    <div className='mt-6 ml-6 flex gap-2' >
                                        <p className='text-sky-600 font-bold'>4,999 </p><p className='text-black'>INR</p>

                                    </div>
                                </div>
                                {/* sixth */}
                                <div className='flex gap-4 p-2 mb-4'>
                                <div className='bg-gray-200  h-10 w-10  mt-3 flex justify-center'>
                                        <img src={'/img/avatars/image 41.png'}/>
                                    </div>
                                    <div className='w-52 truncate' >
                                        <h6>Satin Nikel Smart lock</h6>
                                        <p className='text-[12px]'>Lorum 20idygfkbsdfsdukyfgyuj</p>
                                        <p className='text-[12px]'>Lorum 20idygfkbsdfsdukyfgjyu</p>
                                    </div>
                                    <div className='mt-6 ml-6 flex gap-2' >
                                        <p className='text-sky-600 font-bold'>4,999 </p><p className='text-black'>INR</p>
                                    </div>
                                </div>




                            </div>
                        </div>

                    </div>
                    <div className='card ml-3 col-span-4  '>put map here</div>



                </div>


                {/* table div start here  */}

                <div className='card mt-6'>
                    <DashboardTab />
                </div>




            </div>





        </>
    )
}

export default Dashboard