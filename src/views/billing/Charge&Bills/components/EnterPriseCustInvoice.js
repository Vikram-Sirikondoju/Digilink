import React, { useEffect, useMemo, useCallback, useState } from 'react'
import EnterPriceCustInvoiceTableTools from './EnterPriceCustInvoiceTableTools'
import { apiGetBillingInvoice } from 'services/BillingService'
import { DataTable } from 'components/shared'
import { Link, useLocation } from 'react-router-dom'
import { Button } from 'components/ui'
import { BsArrowLeftShort } from 'react-icons/bs'

function EnterPriseCustInvoice() {
    const location = useLocation()

    const [billingInvoiceData,setBillingInvoiceData]=useState([])
    useEffect(()=>{
        fetchInvoiceData()
    },[])

    const fetchInvoiceData=async()=>{
        const response = await apiGetBillingInvoice(location?.state?.rowData)
        const res = response?.data
        setBillingInvoiceData(res)
    }
   
    
    
    // const data = [
    //     {
    //         custId : 'C3681655',
    //         orderId : 'OD345681655',
    //         orderDateAndTime : '15 May 2023,10:00PM',
    //         invoiceID : 'DEF345681655',
    //         amount : '249.95 USD',
    //         status : 'Bill Not Generated'
    //     },
    //     {
    //         custId : 'C3681655',
    //         orderId : 'OD345681655',
    //         orderDateAndTime : '15 May 2023,10:00PM',
    //         invoiceID : 'DEF345681655',
    //         amount : '249.95 USD',
    //         status : 'Bill Not Generated'
    //     },
    //     {
    //         custId : 'C3681655',
    //         orderId : 'OD345681655',
    //         orderDateAndTime : '15 May 2023,10:00PM',
    //         invoiceID : 'DEF345681655',
    //         amount : '249.95 USD',
    //         status : 'Bill Not Generated'
    //     },
    //     {
    //         custId : 'C3681655',
    //         orderId : 'OD345681655',
    //         orderDateAndTime : '15 May 2023,10:00PM',
    //         invoiceID : 'DEF345681655',
    //         amount : '249.95 USD',
    //         status : 'Bill Not Generated'
    //     },
    //     {
    //         custId : 'C3681655',
    //         orderId : 'OD345681655',
    //         orderDateAndTime : '15 May 2023,10:00PM',
    //         invoiceID : 'DEF345681655',
    //         amount : '249.95 USD',
    //         status : 'Bill Not Generated'
    //     },
    // ]
    const columns = useMemo(
        () => [
            {
                header: 'Customer ID',
                accessorKey: 'relCustId',
            },
            {
                header: 'Order ID',
                accessorKey: 'orderId',
            },
            {
                header: 'Order Date And Time',
                accessorKey: 'orderDate',
            },
            {
                header: 'Invoice ID',
                accessorKey: 'id',
            },
            {
                header: 'Amount',
                accessorKey: 'orderAmount',
            }, 
            {
                header: 'Status',
                accessorKey: 'invoiceStatus',
                cell: (props) => {
                    console.log(props)
                    return (
                        <div className="flex items-center">
                            <span
                                className={`ml-2 rtl:mr-2 capitalize text-orange-500`}
                            >
                                {props.row.original.invoiceStatus}
                            </span>
                        </div>
                    )
                },
            },
         
          
        ],
        []
    )

  return (
    <>
    <div>
        <div className='mb-6'>Billing / EnterPriseCustomer / <span className='font-semibold text-blue-500'>Invoice List</span></div>
        <div className='flex justify-between mb-6'>
            <div>
                <h3>Invoice List</h3>
            </div>
            <EnterPriceCustInvoiceTableTools />
        </div>
        <DataTable 
            // ref={tableRef}
            columns={columns}
            data={billingInvoiceData}
            // loading={loading}
            // pagingData={tableData}
            // onPaginationChange={onPaginationChange}
            // onSelectChange={onSelectChange}
            // onSort={onSort}
            // onCheckBoxChange={onRowSelect}
            // onIndeterminateCheckBoxChange={onAllRowSelect}
            // selectable
         />
         <Link to='/billing/enterprise-customers'>
            <Button icon={<BsArrowLeftShort/>}>Previous</Button>
         </Link>
    </div>
    </>
  )
}

export default EnterPriseCustInvoice