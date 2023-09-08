import { Alert, Button, Card, Dialog } from 'components/ui'
import React, { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GetDropdownLabel from 'views/Servicefile';
import { timeZone } from '../../../../mock/data/timezones'
import appConfig from 'configs/app.config';
import DateFormat from 'components/template/DateFormat';
import dayjs from 'dayjs';
import ReactHtmlParser from 'html-react-parser'


const language = [
    { label: 'English', value: 1 },
    { label: 'Spanish', value: 2 },
    { label: 'Arabic', value: 3 },
    { label: 'Portugese', value: 4 },

]
const orientationtype = [
    { label: 'RTL', value: 'RTL' },
    { label: 'LTR', value: 'LTR' },
]







function OperatorPreview({ operaterState, step, setStep, message, mode }) {



    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)
    const dateFormat = useSelector((state) => state.locale.dateFormat)

    const currencyList = useSelector((state) => state.salesOrderList?.data?.currencyList)
    const parentAccountList = useSelector((state) => state.salesOrderList?.data?.parentAccountList)
    const publicRolesList = useSelector((state) => state.salesOrderList?.data?.publicRolesList)

    const timeZoneList = timeZone?.map((timezone) => ({
        value: timezone.id,
        label: timezone.value,
    }))

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


console.log('message',Array.isArray(message))

    return (
        <>
            {message && (
                // <Alert className="mb-4" type="danger" showIcon>
                //     {Array.isArray(message) ? message.join(", "): message}
                    
                // </Alert>
                <></>
            )}
            <h3 className="mx-4 mb-4 mt-2">Preview</h3>

            <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">OPERATOR DETAILS{' '}</h6>
                    <div className=" text-base  font-bold flex justify-end pointer-events-auto" >

                        <button onClick={() => { setStep(0) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </button>


                    </div>
                </div>
                <div className="md:grid grid-cols-6">
                    <div className="col-span-1 md:gird mx-2">
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Accounts Info</div>
                        <div className="md:grid gap-2">
                            {/* <p className="mt-2 text-base">ID : {operaterState?.operatrId}</p> */}
                            <p className="mt-2 text-base">{operaterState?.accName}</p>
                            {/* <p className="mt-2 text-base">Ajjas Enterprices</p> */}
                            <p className="mt-2 text-base">{GetDropdownLabel(operaterState?.accTimeZone, timeZoneList)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(operaterState?.accMnoParentId, parentAccountList)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(operaterState?.accCurrency, currencyList)}</p>
                            <div className='flex'>
                                <p className="mt-2 text-base  whitespace-nowrap">Inc Date: </p>
                                <p className='mt-[11px]'>
                                    {dayjs(
                                        operaterState?.accIncorpDt,
                                        dateFormat
                                    )?.format(dateFormat)}
                                </p>
                            </div>
                            <p className="mt-2 text-base">{GetDropdownLabel(operaterState?.accLang, language)}</p>
                            <p className="mt-2 text-base">Tax: {operaterState?.accTaxId}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(operaterState?.accOrient, orientationtype)}</p>
                            {/* <p className="mt-2 text-base">Sensors</p> */}
                        </div>
                    </div>
                    <div className='ml-6'>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Contact Info</div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            {/* <p className="mt-2 text-base whitespace-nowrap">CXO : {operaterState?.accPrimContName}</p> */}
                            <p className="mt-2 text-base">{operaterState?.custFirstName}</p>
                            <p className="mt-2 text-base">{operaterState?.custLastName}</p>
                            <p className="mt-2 text-base">{operaterState?.custMiddleName}</p>

                            <p className="mt-2 text-base">{operaterState?.accEmailId}</p>
                            <p className="mt-2 text-base">{operaterState?.accPrimCont}</p>
                            <p className="mt-2 text-base">{operaterState?.accAltCont}</p>
                            <p className="mt-2 text-base">{operaterState?.accWebUrl}</p>
                        </div>
                    </div>
                    <div className='ml-6'>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Address</div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">{operaterState?.accAddL1}</p>
                            <p className="mt-2 text-base">{operaterState?.accCity}</p>
                            <p className="mt-2 text-base">{operaterState?.accState}</p>
                            <p className="mt-2 text-base">{operaterState?.accCountry}</p>
                            <p className="mt-2 text-base">{operaterState?.accZipcode}</p>
                        </div>
                    </div>
                    <div className='ml-6'>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Billing Info</div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">{operaterState?.sameCorrespondenceAddress == true ? 'Yes' : 'No'}</p>
                            <p className="mt-2 text-base">{operaterState?.accSftpAdd}</p>

                        </div>
                    </div>
                    <div className='ml-6'>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Files</div>
                        {operaterState?.uploadFiles.map(e => {
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
                        {operaterState?.additionalFiles.map(e => {
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

            {mode == 'ADD' && <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">MASTER PERMISSIONS{' '}</h6>
                    {mode == 'ADD' && <div className=" text-base  font-bold flex justify-end">
                        <Link onClick={() => { setStep(1) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </Link>
                    </div>}
                </div>

                <div className="md:grid grid-cols-12">
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>PublicRole</p>
                        <p className='text-base'>{GetDropdownLabel(operaterState?.permissionInfo?.publicRole, publicRolesList)}</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>UserRole</p>
                        <p className='text-base'>{operaterState?.permissionInfo?.userRole}</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Description</p>
                        <p className='text-base'>{ReactHtmlParser(operaterState?.permissionInfo?.description)}</p>
                    </div>

                </div>
            </Card>}
            {mode == 'ADD' && <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">MASTER USER{' '}</h6>
                    {mode == 'ADD' && <div className="text-base font-bold flex justify-end ">
                        <Link onClick={() => { setStep(2) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </Link>

                    </div>}
                </div>
                <div className="md:grid grid-cols-12">
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>First Name</p>
                        <p className='text-base'>{operaterState?.userInfo?.firstName}</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Middle Name</p>
                        <p className='text-base'>{operaterState?.userInfo?.middleName}</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Last Name</p>
                        <p className='text-base'>{operaterState?.userInfo?.lastName}</p>
                    </div>
                    {/* <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Register Id:</p>
                        <p className='text-base'>4679812656_AIRTEL</p>
                    </div> */}
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Email ID:</p>
                        <p className='text-base'>{operaterState?.userInfo?.emailId}</p>
                    </div>
                    <div className='col-span-4 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Phone Number</p>
                        <p className='text-base'>{operaterState?.userInfo?.phoneNumber}</p>
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

export default OperatorPreview



