import { Button, Card, Notification, toast } from 'components/ui'
import React from 'react'
import { MdModeEdit } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiCreateOfferCashback, apiUpdateOfferCashback } from 'services/OfferService'
import { GetErrorMsg } from 'views/Servicefile'

function CashBackPreview(props) {
    const {
        onPrevious,
        configIntialValues,
        cashbackInitialValues,
        goToFirstStep,
        selectedMode,
    } = props
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

    const handleSubmit = async () => {
        let payload
        let resp
        if (selectedMode === 'EDIT') {
            payload = {
                ...cashbackInitialValues,
                dgl_offrs_configs: configIntialValues,
            }
            resp = await apiUpdateOfferCashback(payload)
        } else {
            payload = {
                ...cashbackInitialValues,
                dgl_offrs_configs: configIntialValues,
            }
            resp = await apiCreateOfferCashback(payload)
        }
        if (resp.status === 'success') {
            toast.push(
                <Notification
                    title={
                        selectedMode === 'EDIT'
                            ? 'CashBack Updation'
                            : 'CashBack Creation'
                    }
                    type="success"
                    duration={2500}
                >
                    {selectedMode === 'EDIT'
                        ? 'CashBack Updated Successfuly'
                        : 'CashBack Created Successfuly'}
                </Notification>,
                {
                    placement: 'top-end',
                }
            )

            navigate('/cashbacks')
        } else {
            const errorMsg = GetErrorMsg(resp) || 'Error'
            toast.push(
                <Notification title={'Failed'} type="danger" duration={2500}>
                    {errorMsg}
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        }
    }
    return (
        <>
            <div className="mt-6 dark:bg-gray-700 rounded ">
                <Card className="mx-3 mb-4 mt-1">
                    <div className="md:grid grid-cols-2">
                        <h6 className=" mb-4 mt-1 font-bold ">
                            CASHBACK CREATION{' '}
                        </h6>
                        <div className=" text-xs text-black font-bold flex justify-end cursor-pointer">
                            <MdModeEdit className="mt-1" />
                            <p onClick={() => goToFirstStep()}>EDIT</p>
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
                {/* <Card className="mx-3 mb-4 mt-1">
                    <div className="md:grid grid-cols-2">
                        <h6 className="mx-2 mb-4 mt-1 font-bold">
                            CONFIG DETAILS{' '}
                        </h6>
                        <div className=" text-xs text-black font-bold flex justify-end cursor-pointer">
                            <MdModeEdit className="mt-1" />
                            <p onClick={()=>onPrevious()}>EDIT</p>
                        </div>
                    </div>
                    <div className="md:grid grid-cols-1">
                        <div className="mx-2">
                            <p className="text-xs text-black font-bold mb-2">
                                Title
                            </p>
                            <p className="text-xs">{configIntialValues?.offr_config_title}</p>
                        </div>
                        <div className="mx-2 my-4">
                            <p className="text-xs text-black font-bold mb-2">
                                IF
                            </p>
                            <ul>
                                <li className="my-4">
                                    1.Order Quantity Greater Than or Equal to
                                    10000.00
                                </li>
                            </ul>
                        </div>

                        <div className="mx-2 my-4">
                            <p className="text-xs text-black font-bold mb-2">
                                THEN
                            </p>
                            <ul>
                                <li className="my-4">
                                    1.Discount Amount Equal to 1000.00
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card> */}
            </div>
            <div className="mt-4 text-right">
                <Button className="mx-2" onClick={onPrevious}>
                    Previous
                </Button>
                <Button onClick={() => handleSubmit()} variant="solid">
                    {'Submit for Approval'}
                </Button>
            </div>
        </>
    )
}

export default CashBackPreview
