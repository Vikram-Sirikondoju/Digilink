import { Alert, Button, Card, Dialog } from 'components/ui'
import React, { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GetDropdownLabel from 'views/Servicefile';
import { timeZone } from '../../../../mock/data/timezones'
import appConfig from 'configs/app.config';
import dayjs from 'dayjs';


const custOperator = [
    { label: 'Airtel Telangana', value: 1 },
    { label: 'Airtel Mumbai', value: 2 },
    { label: 'Airtel Rajasthan ', value: 3 },

]

const timeZoneS = [
    { label: 'India (GMT+5:30)', value: '1' },
    { label: 'USA (GMT-4)', value: '2' },
    { label: 'Chicago (GMT-5)', value: '3' },
    { label: 'Phoenix (GMT-7)', value: '4' },
    { label: 'Los Angeles (GMT-7)', value: '5' },
]

const parentAccount = [
    { label: 'Global MNO', value: 1 },

]
const custCat = [
    { label: 'Premium', value: '1' },
    { label: 'Platinum', value: '2' },
    { label: 'Gold', value: '3' },
    { label: 'Silver', value: '3' },

]
const currency = [
    { label: 'USD', value: '1' },
    { label: 'EUR', value: '2' },
    { label: 'CAD', value: '3' },
    { label: 'KWD', value: '4' },
    { label: 'INR', value: '5' },
]
const orientationtype = [
    { label: 'Right to Left', value: "RTL" },
    { label: 'Left to Right', value: "LTR" },
]

const language = [
    { label: 'English', value: 1 },
    { label: 'Spanish', value: 2 },
    { label: 'Arabic', value: 3 },
    { label: 'Portugese', value: 4 },

]

const contarctStatus = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'IN_ACTIVE', value: 'IN_ACTIVE' },
    { label: 'PENDING_APPROVAL', value: 'PENDING_APPROVAL' }
]

function EnterprisePreview({ enterpriseState, setStep, message, mode }) {

    console.log(enterpriseState, "enterpriseState")


    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)

    const currencyList = useSelector((state) => state.enterpriseList?.data?.currencyList)
    const parentAccountList = useSelector((state) => state.enterpriseList?.data?.parentAccountList)
    const custmoerCategoryList = useSelector((state) => state.enterpriseList?.data?.custmoerCatList)
    const dateFormat = useSelector((state) => state.locale.dateFormat)

    const operatorAccountList = useSelector((state) => state.enterpriseList?.data?.operatorAccountList)

    const timeZoneList = timeZone?.map((timezone) => ({
        value: timezone.id,
        label: timezone.value,
    }))

    const contractTypeList = useSelector((state) => state.enterpriseList?.data?.contractTypeList)
    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }
    const onClickFile = (fileInfo) => {
        setShowContent(true)
        setContent(fileInfo)
    }

    return (
        <>
            {message && (
                // <Alert className="mb-4" type="danger" showIcon>
                //     {Array.isArray(message) ? message.join(", ") : message}
                // </Alert>
                <></>
            )}
            <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                        ENTERPRISE CUSTOMER DETAILS{' '}
                    </h6>
                    <div className=" text-base  font-bold flex justify-end">
                        <button onClick={() => { setStep(0) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="md:grid grid-cols-6">
                    <div className="col-span-2 md:gird mx-2">
                        <div className="text-base  font-bold underline  decoration-2 mb-2">
                            Accounts Info
                        </div>
                        <div className="col-span-6 md:grid grid-cols-2 gap-2">
                           
                            <p className="mt-2 text-base">{enterpriseState?.custName}</p>
                            {/* <p className="mt-2 text-base">{enterpriseState?.customerType}</p> */}
                            <p className="mt-2 text-base">{GetDropdownLabel(enterpriseState?.accMnoParentId, parentAccountList)}</p>
                            <p className="mt-2 text-base">{enterpriseState?.custCompName}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(enterpriseState?.customerType, operatorAccountList)}</p>
                            <p className="mt-2 text-base">
                                <p>
                                    {dayjs(
                                        enterpriseState?.custIncorpDt,
                                        dateFormat
                                    )?.format(dateFormat)}
                                </p>
                            </p>
                            <p className="mt-2 text-base">Tax: {enterpriseState?.custTaxId}</p>
                            
                            <p className="mt-2 text-base">Business Unit:{enterpriseState?.sameCorrespondenceAddress}</p>
                           
                            <p className="mt-2 text-base">{GetDropdownLabel(enterpriseState?.custTimeZone, timeZoneList)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(enterpriseState?.custCurrency, currencyList)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(enterpriseState?.custLang, language)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(enterpriseState?.custOrient, orientationtype)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(enterpriseState?.custCat, custmoerCategoryList)}</p>
                        </div>
                    </div>
                    <div>


                        <div className="text-base  font-bold underline  decoration-2 mb-2">
                            Contact Info
                        </div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">{enterpriseState?.custFirstName}</p>
                            <p className="mt-2 text-base">{enterpriseState?.custMiddleName}</p>
                            <p className="mt-2 text-base">{enterpriseState?.custLastName}</p>
                            <p className="mt-2 text-base">{enterpriseState?.custEmailId}</p>
                            <p className="mt-2 text-base">{enterpriseState?.custAltCont}</p>
                            <p className="mt-2 text-base">{enterpriseState?.custWebUrl}</p>
                            <p className="mt-2 text-base">{enterpriseState?.custPhone}</p>


                        </div>


                    </div>
                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">
                            Address
                        </div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">{enterpriseState?.custAddL1}</p>
                            <p className="mt-2 text-base">{enterpriseState?.custAddL2}</p>
                            <p className="mt-2 text-base">{enterpriseState?.custCity}</p>
                            <p className="mt-2 text-base">{enterpriseState?.custState}</p>
                            <p className="mt-2 text-base">{enterpriseState?.custCountry}</p>
                            <p className="mt-2 text-base">{enterpriseState?.custZipcode}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">
                            Billing Info
                        </div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">{enterpriseState?.billCycle}</p>
                            <p className="mt-2 text-base">
                                {dayjs(
                                    enterpriseState?.billDate,
                                    dateFormat
                                )?.format(dateFormat)}
                            </p>
                            <p className="mt-2 text-base">{enterpriseState?.creditLimit}</p>
                            <p className="mt-2 text-base">{enterpriseState?.billDueTenor}</p>
                            <p className="mt-2 text-base">{enterpriseState?.sameCorrespondenceAddress}</p>



                        </div>
                    </div>
                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Files</div>
                        {enterpriseState?.uploadFiles.map(e => {
                            if (e.file_name !== "") {
                                return (
                                    <>
                                        <div className='md:grid grid-cols-1 gap-2' onClick={() => onClickFile(e)}>
                                            <p className='mt-2 text-base underline text-sky-500 cursor-pointer'>{e.doc_name}</p>
                                        </div>
                                    </>
                                )
                            }
                        })}
                        {enterpriseState?.additionalFiles.map(e => {
                            if (e.file_name !== "") {
                                return (
                                    <>
                                        <div className='md:grid grid-cols-1 gap-2' onClick={() => onClickFile(e)}>
                                            <p className='mt-2 text-base underline text-sky-500 cursor-pointer'>{e.doc_name}</p>
                                        </div>
                                    </>
                                )
                            }
                        })}
                    </div>
                </div>
            </Card>
            {mode == "ADD" && <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                        MASTER INFO{' '}
                    </h6>
                    {mode == "ADD" && <div className=" text-base font-bold flex justify-end">
                        <Link onClick={() => { setStep(0) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </Link>
                    </div>}
                </div>
                <div className="md:grid grid-cols-12">
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>FirstName</p>
                        <p className='text-base'>{enterpriseState?.userInfo?.firstName}</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>LastName</p>
                        <p className='text-base'>{enterpriseState?.userInfo?.lastName}</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Email ID:</p>
                        <p className='text-base'>{enterpriseState?.userInfo?.emailId}</p>
                    </div>
                    <div className='col-span-6 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Phone Number</p>
                        <p className='text-base'>{enterpriseState?.userInfo?.phoneNumber}</p>
                    </div>

                    <div className='col-span-2 md:gird mx-2 mt-4'>
                        <p className='text-base underline font-bold mb-2'>Contract Type</p>
                        <p className='text-base'>{GetDropdownLabel(enterpriseState?.contractType, contractTypeList)}</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2 mt-4'>
                        <p className='text-base underline font-bold mb-2'>Signed Date</p>
                        <p className='text-base'>
                            {dayjs(
                                enterpriseState?.signedDate,
                                dateFormat
                            )?.format(dateFormat)}
                        </p>
                    </div>
                    <div className='col-span-2 md:gird mx-2 mt-4'>
                        <p className='text-base underline font-bold mb-2'>Enforcement Date</p>
                        <p className='text-base'>
                            {dayjs(
                                enterpriseState?.enforceDate,
                                dateFormat
                            )?.format(dateFormat)}
                        </p>
                    </div>
                    <div className='col-span-2 md:gird mx-2 mt-4'>
                        <p className='text-base underline font-bold mb-2'>Termination Date</p>
                        <p className='text-base'>
                            {dayjs(
                                enterpriseState?.terminateDate,
                                dateFormat
                            )?.format(dateFormat)}
                        </p>
                    </div>
                    <div className='col-span-2 md:gird mx-2 mt-4'>
                        <p className='text-base underline font-bold mb-2'>status</p>
                        <p className='text-base'>{GetDropdownLabel(enterpriseState?.status, contarctStatus)}</p>
                    </div>
                </div>


            </Card>}
            <Dialog isOpen={showContent}
                onClose={() => setShowContent(false)}>
                <div className='p-5'>
                    <img src={`${appConfig.apiPrefix}/media/uniqid/${content?.file_url}`} alt="Content" />
                    <Button onClick={() => window.open(`${appConfig.apiPrefix}/media/uniqid/${content?.file_url}`, '_blank')} className='mt-2' variant='solid'>Download</Button>
                </div>
            </Dialog>
        </>
    )
}

export default EnterprisePreview
