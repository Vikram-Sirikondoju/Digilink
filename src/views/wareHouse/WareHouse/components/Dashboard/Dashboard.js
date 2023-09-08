import { Button } from 'components/ui'
import React from 'react'
import { Chart } from 'components/shared'
// import { COLOR_1 } from 'constants/chart.constant'
// import { COLORS } from 'constants/chart.constant'
import { COLORS } from 'constants/chart.constant'


const Dashboard = ({ databar = {}, className }) => {



    const bardata = [
        {
            name: 'STOCK ABC',
            data: [
                3107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3,
                8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55,
                8512.9, 8496.25, 8600.65, 8881.1, 9340.85,
            ],
            Color: ["#ed1e1e", "#2269e5", "#fce302", "#04f759", "#fc9700"],
        },
    ]




    let data = {
        labels: ['Pass', 'Flagged', 'Failed'],
        data: [246, 144, 83],
    }

    let data2 = {
        data: [40]
    }


    return <div className='' >
        {/* <div><p class="[word-spacing:10px]">Warehouse / <span class="text-blue-500">Dashboard</span></p></div> */}
        <h3 class=" py-8">Dashboard</h3>
        <div class="grid grid-cols-3 w-auto">

            <div class="border-2 bg-gray-50     " >

                <h1 class="text-4xl ml-24 mt-11">1,834</h1>
                <p class="ml-24 mt-2 font-bold">Total Orders</p>

                <div class="grid grid-cols-3 truncate mt-16 pb-4 ">

                    <div class="ml-2  truncate " >
                        <p class="px-2 py-2 text-black">Release For Pickup</p>
                        <p class=" px-2 mt-2 text-black font-bold text-xl">5600</p>

                    </div>

                    <div  class="ml-2  pl-4 truncate " >
                        <p class="px-8 py-2 text-black">Shipped</p>
                        <p class=" px-8 mt-2 text-black  font-bold text-xl ">2300</p>
                    </div>

                    <div class="ml-4  ">
                        <p class="px-8 py-2 text-black">In Packagging</p>
                        <p class=" px-8 mt-2 text-black font-bold text-xl">1200</p>
                    </div>

                </div>

            </div>

            {/* 2nd div  */}

            <div class="border-2  ml-6 bg-gray-50"  >
                <p class="font-bold p-3">Wirehouse Capasity</p>
                <hr></hr>

                <div>
                    <Chart
                        className='h-120 p-2'
                        series={data2.data}
                        type="donut"
                    />
                </div>



            </div>

            {/* third div  */}

            <div class="border-2  ml-6 bg-gray-50" >
                <p class="font-bold p-3">Quality Check</p>
                <hr></hr>

                <div>
                    <Chart

                        series={data.data}
                        customOptions={{ labels: data.labels }}
                        type="donut"
                    />
                </div>
            </div>

        </div>

        {/* last div start  */}

        <div class="grid grid-cols-12 gap-6">

            <div class="col-span-2 ">

                <div class="border-2 p-5 mt-6 bg-gray-50 h-40">
                    <p>Out of Stock</p>
                    <p class="font-bold text-xl text-black mt-1">60%</p>
                    <Button class="w-20 text-[18px] border-2  mt-3 bg-sky-200 text-sky-700 rounded " >Drafts    </Button>
                </div>

                <div class="border-2 p-5 mt-6 bg-gray-50 h-40">
                    <p >Return units</p>
                    <p class="font-bold text-xl mt-1 text-black">2425</p>
                    <Button class="w-auto border-2 text-[18px] p-1  mt-1 bg-purple-100 rounded text-purple-600" >Qc Started</Button>
                </div>


            </div>
            <div class="border-2  h-auto mt-6 w-full   bg-gray-50 col-span-10">
                <p class="font-bold p-3">Inventory</p>
                <hr></hr>

                <div class="grid grid-cols-12 mt-2">

                    <div className='col-span-4 border-r-2  '>
                        <div class="flex">

                            <div class="rounded-full  p-2 bg-purple-100 border-2 mt-6 ml-4   text-lg h-12 w-12	">TQ</div>
                            <div class=" p-2   mt-4 text-black	 text-lg ml-4 ">
                                <p>Total Quantity</p>
                                <p class="font-bold">5600</p>
                            </div>

                        </div>
                        <div class="flex">
                            <div class="rounded-full  p-2 bg-orange-100 border-2 mt-6 ml-4   text-lg h-12 w-12	">MQ</div>
                            <div class=" p-2   mt-4 text-black	 text-lg ml-4 ">
                                <p>Moving Quantity</p>
                                <p class="font-bold">2300</p>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="rounded-full  p-2 bg-rose-100 text-rose-600 border-2 mt-6 ml-4   text-lg h-12 w-12	">HQ</div>
                            <div class=" p-2   mt-4 text-black	 text-lg ml-4 ">
                                <p>Holding Quantity</p>
                                <p class="font-bold">2300</p>
                            </div>
                        </div>
                    </div>


                    {/* bar chart  */}





                    <div class=" col-span-8 truncate">
                        <Chart
                            options={{
                                chart: {
                                    zoom: {
                                        enabled: false,
                                    },
                                },
                                colors: COLORS,
                                fill: {
                                    // type: 'gradient',
                                    gradient: {
                                        // shadeIntensity: 1,
                                        opacityFrom: 0.7,
                                        opacityTo: 0.9,
                                        stops: [0, 80, 100],
                                    },
                                },
                                dataLabels: {
                                    enabled: false,
                                },
                                stroke: {
                                    // curve: 'full',
                                    width: 1,
                                },
                                labels: [
                                    '13 Nov 2017',
                                    '14 Nov 2017',
                                    '15 Nov 2017',
                                    
                                    '20 Nov 2017',
                                    '21 Nov 2017',
                                    '22 Nov 2017',
                                    
                                    '27 Nov 2017',
                                    '28 Nov 2017',
                                    '29 Nov 2017',
                                    
                                    '04 Dec 2017',
                                    '05 Dec 2017',
                                    '06 Dec 2017',
                                ],
                                    
                                xaxis: {
                                    type: 'datetime',
                                },
                                yaxis: {
                                    // opposite: true,
                                },
                                legend: {
                                    horizontalAlign: 'left',
                                },
                            }}
                            type="bar"
                            series={bardata}
                            height={250}
                            width={600}
                            colors={bardata.color}
                        />
                    </div>





                </div>
            </div>


        </div>



    </div>
}


export default Dashboard
