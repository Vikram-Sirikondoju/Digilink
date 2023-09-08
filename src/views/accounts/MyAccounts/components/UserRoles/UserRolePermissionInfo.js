import { Card, Checkbox } from 'components/ui'
import React from 'react'

const arrMain = [
    {
        mainHeading: 'Account Management',
        tHead: ['View', 'Add', 'Edit', 'Deactivate', 'Approve'],
        tRow: ['Operaters', 'Providers', 'Partners', 'Customers']
    },
    {
        mainHeading: 'Catalogue',
        tHead: ['View', 'Add', 'Edit', 'Deactivate', 'Approve'],
        tRow: ['Templates', 'Items', 'Solutions', 'Solution Config']
    },
    {
        mainHeading: 'Warehouse Management',
        tHead: ['View', 'Add', 'Edit', 'Deactivate', 'Approve'],
        tRow: ['Ware House', 'Inventory', 'Work Order']
    },
    {
        mainHeading: 'Orders Management',
        tHead: ['View', 'Add', 'Edit', 'Deactivate', 'Approve'],
        tRow: ['Orders Placements', 'Orders Fulfillment', 'Replace/Cancel Order ', 'Activations & Renewal', 'Shipping & Delivery']
    },
    {
        mainHeading: 'Billing Management',
        tHead: ['View', 'Add', 'Edit', 'Deactivate', 'Approve'],
        tRow: ['Reciepts', 'Manage Settlements & Payments', 'Credit Payments']
    },
    {
        mainHeading: 'Offers & Cashbacks',
        tHead: ['View', 'Add', 'Edit', 'Deactivate', 'Approve'],
        tRow: ['Offers & Discounts Codes', 'View Orders with Applied Offers']
    },
    {
        mainHeading: 'Reports Management',
        tHead: ['View', 'Add', 'Edit', 'Deactivate', 'Approve'],
        tRow: ['User Reports', 'Finance Reports']
    },
    {
        mainHeading: 'Settings Management',
        tHead: ['View', 'Add', 'Edit', 'Deactivate', 'Approve'],
        tRow: ['General Settings', 'API Configuration', 'Notifications', 'Metadata']
    },
    {
        mainHeading: 'Customer Management',
        tHead: ['View', 'Add', 'Edit', 'Deactivate', 'Approve'],
        tRow: ['User Roles', 'Users', 'Doc Policy', 'Contracts', 'Hierarchy']
    },
    {
        mainHeading: 'Website Management',
        tHead: ['View', 'Add', 'Edit', 'Deactivate', 'Approve'],
        tRow: ['Home Page', 'Order Placements', 'Activate/Renewal Subscriptions']
    }
]

const UserRolePermissionInfo = () => {

    return (
        <>
            <div className=" p-5" style={{backgroundColor:"#F5F5F5"}}>
                <div className="md:grid grid-cols-3 gap-2">
                    {
                        arrMain.map(item => {
                            return (
                                <>
                                    <Card
                                        className={`rounded-none border-t-4 border-indigo-500 border-r-0 border-b-0 border-l-0 mb-3 mr-3`}>
                                        <div className="flex justify-between">
                                            <p className="text-base text-black font-bold">{item.mainHeading}</p>
                                            <div className="flex">
                                                <Checkbox className="" />
                                                <p className='text-base font-medium'>Select All</p>
                                            </div>
                                        </div>
                                        <table className='table-fixed mt-4'>
                                            <thead className="flex justify-end h-8 border-b-2 border-zinc-300">
                                                <th className='w-16'></th>
                                                {item.tHead.map(e => {
                                                    return (
                                                        <>
                                                            <th className='ml-3 text-xs	 font-semibold'>{e}</th>
                                                        </>
                                                    )
                                                })}
                                            </thead>
                                            <tbody>
                                            {item.tRow.map(i => {
                                                return(
                                                    <>
                                                    <tr className='flex h-20 border-b-2 border-zinc-300 mt-4'>
                                                        <td className='w-20 text-xs mt-3'>{i}</td>
                                                        <Checkbox className='mt-3'/>
                                                        <Checkbox className='mt-3 mx-2'/>
                                                        <Checkbox className='mt-3 mx-3'/>
                                                        <Checkbox className='mt-3 mx-6'/>
                                                        <Checkbox className='mt-3 ml-8'/>
                                                    </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                        </table>
                                    </Card>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default UserRolePermissionInfo
