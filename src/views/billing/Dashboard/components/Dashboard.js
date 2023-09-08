import { Chart } from 'components/shared'
import React from 'react'
import { COLORS } from 'constants/chart.constant'
function Dashboard() {
    let arr = [

        { Title: "Total Revenue", Orders: "$4,50,000.00", Name: "11.4%", colorClass: "text-green-700	 " },
        { Title: "Total Income", Orders: "$2,50,000.00", Name: "15.5%", colorClass: "text-orange-500 " },
        { Title: "Total Expenses", Orders: "$1,20,000.00", Name: "9.75%", colorClass: "text-orange-500 " },


    ]


    const data = [
        {
            name: 'Last week',
            data: [44, 95, 77, 86, 61, 58, 40, 32, 69, 88,67,87],
        },
        {
            name: 'previous 4 week average',
            data: [35, 71, 86, 86, 45, 48, 46, 54, 86, 95,87,59],
        },
    ]

    return (
        <>




            <div className='h-auto  w-auto  p-5 ' >
                <div className='card  '>
                    <div className='  w-auto grid grid-cols-3 gap-12 h-24 mt-2  '>


                        {

                            arr.map((data) => {
                                return (
                                    <>

                                        <div className=' p-3 pl-6  shadow-md'>
                                            <div className='col-span-12'>
                                                <p className='text-black'>{data.Title}</p>
                                                {/* <p><BsActivity/></p> */}
                                            </div>
                                            <div className=' mt-6  flex justify-between truncate  '>
                                                <h3 className="font-bold"  >{data.Orders}</h3>
                                                <p className='mt-1 truncate  bg-gray-200 p-2 rounded-full  '>{data.Name}</p>
                                            </div>
                                            <p className='text-[9px]'>amet minim molit non des erunt deserunt</p>
                                        </div>


                                    </>
                                )
                            })

                        }


                    </div>
                </div>

                {/* barchart div start here  */}

                <div className='grid grid-cols-12 gap-4 mt-20 '>
                    <div className="col-span-8 border-2 ">

                        <div className='card   p-6'>
                            <div className='flex justify-between'>
                                <h3 className='text-black  font-bold'>REVENUE</h3>
                                <p className='border w-24 p-2 text-sky-500	 text-center border-sky-500'>1 Year</p>
                            </div>
                            <Chart className="w-full h-[32rem]"
                                options={{

                                    plotOptions: {
                                        bar: {
                                            horizontal: false,
                                            columnWidth: '25%',


                                        },
                                    },

                                    dataLabels: {
                                        enabled: false,
                                    },
                                    stroke: {
                                        show: true,
                                        colors: [''],
                                    },
                                    xaxis: {
                                        colors: ["#ffb84d"],
                                        categories: [
                                            "jan",
                                            "feb",
                                            "mar",
                                            "apr",
                                            "may",
                                            "jun",
                                            "jul",
                                            "aug",
                                            "sep",
                                            "oct",
                                            "Nov",
                                            "Dec"

                                        ],
                                    },
                                    fill: {
                                        opacity: 1,
                                    },
                                    // tooltip: {
                                    //     y: {
                                    //         formatter: (val) => `$${val} thousands`,
                                    //     },
                                    // },
                                }}
                                series={data}
                                height={"600"}
                                type="bar"

                            />
                        </div>


                    </div>
                    <div className=' ml-3 col-span-4 border-2 p-4 items-center'>
                        <h3 >Top Selling Items</h3>
                        <div className=' pt-48 ml-4'>
                        <Chart
                            options={{
                                dataLabels: {
                                    enabled: false
                                  },
                                  fill: {
                                    type: 'gradient',
                                  },
                                colors: COLORS,
                               
                            }}
                            series={[22, 55,12, 41]}
                            height={300}
                                type="donut"
                        />

                        </div>
                       
                    </div>



                </div>








            </div>





        </>
    )
}

export default Dashboard