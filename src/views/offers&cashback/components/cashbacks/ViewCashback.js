import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'
import { Card } from 'components/ui'
import React from 'react'
import { MdModeEdit } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { injectReducer } from 'store'
import reducer from 'views/offers&cashback/store'
injectReducer('offerCashback', reducer)

function ViewCashback() {
    const location = useLocation()
    const cashbackInitialValues = location.state?.data
    const { customerCategories, productCategories } = useSelector(
        (state) => state.offerCashback.data
    )
    const navigate = useNavigate()
    const prodCategory = productCategories?.find(
        (prod) => prod.id == cashbackInitialValues.rel_offr_prod_cat
    )?.label
    const custCategory = customerCategories?.find(
        (cust) => cust.id == cashbackInitialValues.rel_offr_cust_cat
    )?.label
    const breadCrumbList = [
        {
            name: 'Home',
            link: '/home',
        },
        {
            name: 'Offers & Cashback',
            link: '/cashbacks',
        },
        {
            name: `View Cashback`,
        },
    ]

    return (
        <>
            <CustomBreadcrumbs list={breadCrumbList} />
            <div className="mt-6 dark:bg-gray-700 rounded ">
                <Card className="mx-3 mb-4 mt-1">
                    <div className="md:grid grid-cols-2">
                        <h6 className=" mb-4 mt-1 font-bold ">CASHBACK</h6>
                        <div className=" text-xs text-black font-bold flex justify-end cursor-pointer">
                            <MdModeEdit className="mt-1" />
                            <p
                                onClick={() =>
                                    navigate(`/create-cashback`, {
                                        state: {
                                            data: cashbackInitialValues,
                                            mode: 'EDIT',
                                        },
                                    })
                                }
                            >
                                EDIT
                            </p>
                        </div>
                    </div>
                    <div className="md:grid grid-cols-5">
                        <div className="mb-4">
                            <div className="text-xs text-black font-bold decoration-2">
                                Cashback Code
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-xs">
                                    {cashbackInitialValues?.offr_code}
                                </p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="text-xs text-black font-bold decoration-2">
                                Cashback Title
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-xs">
                                    {cashbackInitialValues?.offr_name}
                                </p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="text-xs text-black font-bold decoration-2">
                                Start Date
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-xs">
                                    {new Date(
                                        cashbackInitialValues?.offr_start_date
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="text-xs text-black font-bold decoration-2">
                                End Date
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-xs">
                                    {new Date(
                                        cashbackInitialValues?.offr_end_date
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="text-xs text-black font-bold decoration-2">
                                Product Category
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-xs">{prodCategory}</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="text-xs text-black font-bold decoration-2">
                                Customer Category
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-xs">{custCategory}</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="text-xs text-black font-bold decoration-2">
                                Offer Type
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-xs">
                                    {cashbackInitialValues?.offr_type}
                                </p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="text-xs text-black font-bold decoration-2">
                                Coupon Brearer Account
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-xs">{`N/A`}</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="text-xs text-black font-bold decoration-2">
                                Description
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-xs">
                                    {cashbackInitialValues?.offr_desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default ViewCashback
