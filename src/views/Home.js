import { Chart } from 'components/shared'
import React from 'react'
import { COLORS } from 'constants/chart.constant'
import { BsFillPersonFill } from "react-icons/bs";
import { Select } from 'components/ui';



function Home() {
    let arr = [

        { Title: "Total Revenue", Orders: "40,000", Name: "11.4%", user: "New User",  colorClass: "text-green-700 "},
        { Title: "Total Income", Orders: "$40,000", Name: "15.5%", user: "Total Revenue" },
        { Title: "Total Expenses", Orders: "40,000", Name: "9.75%", user: "Items" },
        { Title: "Total Expenses", Orders: "$40,000", Name: "9.75%", user: "Items" },
    ]


    const data = [
        {
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43, 67, 22, 43, 67, 22, 43, 67],
        },
        {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27, 67, 22, 43, 67, 22, 43, 67],
        },
        // {
        //     name: 'PRODUCT C',
        //     data: [11, 17, 15, 15, 21, 14],
        // },
    ]

    const lastWeek = [
        { label: 'This Week', value: '1' },
        { label: 'Last Week', value: '1' },
        { label: 'Previous Week', value: '1' },
        { label: 'This Month', value: '1' },
    ]


    return (
        <>




            <div className='h-auto  w-auto  p-5 ' >
                <div className='card  '>
                    <div className='  w-auto grid grid-cols-4 gap-12  mt-2  '>


                        {

                            arr.map((data) => {
                                return (
                                    <>

                                        <div className=' p-3 pl-6 h-72 shadow-lg shadow-blue-100  '>
                                            <div className='col-span-12'>
                                                <p className='h-10 px-3 py-2 rounded-full w-10 bg-gradient-to-r from-blue-600 to-cyan-400' ></p>
                                                {/* <p><BsActivity/></p> */}
                                            </div>
                                            <div className=' mt-2  flex justify-between truncate  '>
                                                <h3 className="font-bold"  >{data.Orders}</h3>
                                                <p className='mt-1 truncate text-white bg-sky-200  px-4 py-1 ' >{data.Name}</p>
                                            </div>
                                            <p className='text-[10px]'>{data.user}</p>
                                        </div>


                                    </>
                                )
                            })

                        }


                    </div>
                </div>

                {/* barchart div start here  */}


                <div className='grid grid-cols-12 mt-20'>
                    <p className='col-span-7  font-bold text-lg '>Summary</p>

                    <p className='w-48'>


                        <Select
                            size="sm"
                            className="mb-4"
                            placeholder="Please Select"
                            options={lastWeek}
                        ></Select>


                    </p>
                    <p className='ml-36  col-span-4 font-bold text-lg '>Activity Log</p>

                </div>


                <div className='grid grid-cols-12 gap-4 mt-8  '>

                    <div className="col-span-9 border-2 ">


                        <div className='card   p-6'>
                            <div className='flex justify-between '>
                                <div>
                                    <h6 >$4,50,000.00</h6>
                                    <p className='text-[10px]'>Total Income</p>
                                </div>

                                <div>
                                    <h6 >2,00,500</h6>
                                    <p className='text-[10px]'>Total Users</p>
                                </div>

                                <div>
                                    <h6>59,000</h6>
                                    <p className='text-[10px]'>Total Products</p>
                                </div>

                                <div>
                                    <h6>2,00,500</h6>
                                    <p className='text-[10px]'>Total Users</p>
                                </div>


                            </div>
                            <Chart
                                options={{
                                    chart: {
                                        stacked: true,
                                        // toolbar: {
                                        //     show: true,
                                        // },
                                        // zoom: {
                                        //     enabled: true,
                                        // },
                                    },
                                    colors: COLORS,
                                    responsive: [
                                        {
                                            breakpoint: 480,
                                            // options: {
                                            //     legend: {
                                            //         position: 'bottom',
                                            //         offsetX: -10,
                                            //         offsetY: 0,
                                            //     },
                                            // },
                                        },
                                    ],
                                    plotOptions: {
                                        bar: {
                                            horizontal: false,
                                            columnWidth: '15%',
                                        },
                                    },
                                    xaxis: {
                                        // type: 'datetime',
                                        categories: [
                                            '01/01/2011 GMT',
                                            '01/02/2011 GMT',
                                            '01/03/2011 GMT',
                                            '01/04/2011 GMT',
                                            '01/05/2011 GMT',
                                            '01/06/2011 GMT',
                                        ],
                                    },
                                    legend: {
                                        // position: 'right',
                                        // offsetY: 40,
                                    },
                                    fill: {
                                        opacity: 1,
                                    },
                                }}
                                series={data}
                                type="bar"
                                height={580}
                            />
                        </div>


                    </div>
                    <div className=' ml-3 col-span-3 p-4 items-center gap-2 border-2'>

                        <div className='flex h-20 w-full py-4 border-b'>
                            <div className='h-11 rounded-full w-12'>
                                <img src={'/img/avatars/log1.png'} />
                            </div>
                            <div className='flex justify-between  p-2      w-full'>
                                <div>
                                    <p className='text-[11px]  font-bold'>Sonam Kaushal</p>
                                    <p className='text-[8px]'>Last Edited Profile</p>
                                </div>
                                <div>
                                    <p className='text-[10px]  font-bold'>01/04/2023</p>
                                    <p className='text-[10px]  font-bold'>12.14 AM</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex h-20 w-full py-4 border-b'>
                            <div className='h-11 rounded-full w-12'>
                                <img src={'/img/avatars/log2.png'} />
                            </div>
                            <div className='flex justify-between  p-2 w-full'>
                                <div>
                                    <p className='text-[11px]   font-bold'>Vicky Johar</p>
                                    <p className='text-[10px]'>Last Changed Profile Picture</p>
                                </div>
                                <div>
                                    <p className='text-[10px]  font-bold'>01/04/2023</p>
                                    <p className='text-[10px]  font-bold'>12.14 AM</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex h-20 w-full py-4 border-b'>
                            <div className='h-11 rounded-full w-12'>
                                <img src={'/img/avatars/log3.png'} />
                            </div>
                            <div className='flex justify-between  p-2  w-full'>
                                <div>
                                    <p className='text-[11px]   font-bold'>Amal Mitra</p>
                                    <p className='text-[10px]'>Last changed account credentials</p>
                                </div>
                                <div>
                                    <p className='text-[10px]  font-bold'>01/04/2023</p>
                                    <p className='text-[10px]  font-bold'>12.14 AM</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex h-20 w-full py-4 border-b'>
                            <div className='h-11 rounded-full w-12'>
                                <img src={'/img/avatars/profileimage.png'} />
                            </div>
                            <div className='flex justify-between  p-2      w-full'>
                                <div>
                                    <p className='text-[11px]   font-bold'>Abhishek Nath</p>
                                    <p className='text-[10px]'>Last changed Address</p>
                                </div>
                                <div>
                                    <p className='text-[10px]  font-bold'>01/04/2023</p>
                                    <p className='text-[10px]  font-bold'>12.14 AM</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex h-20 w-full py-4 border-b'>
                            <div className='h-11 rounded-full w-12 '>
                                <img src={'/img/avatars/log5.png'} />
                            </div>
                            <div className='flex justify-between  p-2  w-full'>
                                <div>
                                    <p className='text-[11px]   font-bold'>Milan Chahuan</p>
                                    <p className='text-[10px]'>Last changed Payments Credentials</p>
                                </div>
                                <div>
                                    <p className='text-[10px]  font-bold'>01/04/2023</p>
                                    <p className='text-[10px]  font-bold'>12.14 AM</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex h-20 w-full py-4 border-b'>
                            <div className='h-11 rounded-full w-12 '>
                                <img src={'/img/avatars/log6.png'} />
                            </div>
                            <div className='flex justify-between  p-2  w-full'>
                                <div>
                                    <p className='text-[11px]   font-bold'>Firoz Ahmed</p>
                                    <p className='text-[10px]'>Last changed Profile Name </p>
                                </div>
                                <div>
                                    <p className='text-[10px]  font-bold'>01/04/2023</p>
                                    <p className='text-[10px]  font-bold'>12.14 AM</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex h-20 w-full py-4 border-b'>
                            <div className='h-11 rounded-full w-12 '>
                                <img src={'/img/avatars/log7.png'} />
                            </div>
                            <div className='flex justify-between  p-2      w-full'>
                                <div>
                                    <p className='text-[11px]   font-bold'>Alisha Singh</p>
                                    <p className='text-[10px]'>Last changed account credentials</p>
                                </div>
                                <div>
                                    <p className='text-[10px]  font-bold'>01/04/2023</p>
                                    <p className='text-[10px]  font-bold'>12.14 AM</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex h-20 w-full py-4 border-b'>
                            <div className='h-11 rounded-full w-12 '>
                                <img src={'/img/avatars/log8.png'} />
                            </div>
                            <div className='flex justify-between  p-2  w-full'>
                                <div>
                                    <p className='text-[11px]   font-bold'>Subhashree Banerjee</p>
                                    <p className='text-[10px]'>Last Edited Profile</p>
                                </div>
                                <div>
                                    <p className='text-[10px]  font-bold'>01/04/2023</p>
                                    <p className='text-[10px]  font-bold'>12.14 AM</p>
                                </div>
                            </div>
                        </div>


                    </div>



                </div>








            </div>





        </>
    )
}

export default Home