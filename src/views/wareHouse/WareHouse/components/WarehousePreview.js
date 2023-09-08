import { Card } from 'components/ui'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import InventoryTable from './Inventory/InventoryTable'
import InventoryTableTools from './Inventory/InventoryTableTools'
import { injectReducer } from 'store'
import reducer from '../store'
import { useSelector } from 'react-redux'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'
import { MdModeEdit } from 'react-icons/md'
injectReducer('wareHouse', reducer)
function WarehousePreview() {
    const location = useLocation()
    const navigate = useNavigate()
    const warehouseData = location.state.data || {}
    const {
        id,
        wh_unq_id,
        wh_title,
        wh_location,
        wh_address_line1,
        wh_address_line2,
        wh_city,
        wh_state,
        wh_country,
        wh_zip_code,
        wh_contact_person,
        wh_email_id,
        wh_phone_number,
        wh_alternate_phone_number,
        wh_total_capacity,
        wh_allotted_capacity,
        wh_description,
        wh_status,
        acc_id,
        wh_latitude,
        wh_longitude,
        preferred,
    } = warehouseData

    const breadCrumbList = [
        {
            name: 'Home',
            link: '/home',
        },
        {
            name: 'WareHouse',
            link: '/wareHouse-menu-item-view-2',
        },
        {
            name: wh_title,
        },
    ]
    return (
        <>
            <CustomBreadcrumbs list={breadCrumbList} />
            <br />
            <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                        WAREHOUSE DETAILS{' '}
                    </h6>
                    <div className=" text-xs text-black font-bold flex justify-end cursor-pointer">
                        <MdModeEdit className="mt-1" />
                        <p
                            onClick={() =>
                                navigate(`/warehouse-new-warehouse`, {
                                    state: {
                                        data: warehouseData,
                                        mode: 'EDIT',
                                    },
                                })
                            }
                        >
                            EDIT
                        </p>
                    </div>
                </div>
                <div className="md:grid grid-cols-3">
                    <div className=" md:gird mx-2">
                        <div className="text-base text-black font-bold underline  decoration-2 mb-2">
                            Warehouse Info
                        </div>
                        <div className="col-span-6 md:grid gap-2">
                            <p className="mt-2 text-base">Title : {wh_title}</p>
                            <p className="mt-2 text-base">
                                Description : {wh_description}
                            </p>
                            <p className="mt-2 text-base">
                                Contact Person: {wh_contact_person}
                            </p>
                            <p className="mt-2 text-base">
                                Total Capacity: {wh_total_capacity}
                            </p>
                            <p className="mt-2 text-base">
                                Allocated Capacity: {wh_allotted_capacity}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold underline  decoration-2 mb-2">
                            Contract Info
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">
                                Location : {wh_location}
                            </p>
                            <p className="mt-2 text-base">
                                Email: {wh_email_id}
                            </p>
                            <p className="mt-2 text-base">
                                Phn No: {wh_phone_number}
                            </p>
                            <p className="mt-2 text-base">
                                Alt Phn No: {wh_alternate_phone_number}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold underline  decoration-2 mb-2">
                            Address
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">
                                Addr1: {wh_address_line1}
                            </p>
                            <p className="mt-2 text-base">
                                Addr2: {wh_address_line2}
                            </p>
                            <p className="mt-2 text-base">City: {wh_city}</p>
                            <p className="mt-2 text-base">State: {wh_state}</p>
                            <p className="mt-2 text-base">
                                Country: {wh_country}
                            </p>
                            <p className="mt-2 text-base">
                                Zipcode: {wh_zip_code}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
            <Card className="mx-3 mb-4 mt-1">
                {/* <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                        INVENTORY LIST{' '}
                    </h6>
                </div> */}
                <div className="mx-4 my-4">
                    <div className="lg:flex items-center justify-between mb-4">
                    <h3 className="mb-4 lg:mb-0 pr-2">Inventory</h3>
                    <InventoryTableTools warehouseData={warehouseData} />
                    </div>
                    <div>
                        <InventoryTable warehouseData={warehouseData} />
                    </div>
                </div>
            </Card>
        </>
    )
}

export default WarehousePreview
