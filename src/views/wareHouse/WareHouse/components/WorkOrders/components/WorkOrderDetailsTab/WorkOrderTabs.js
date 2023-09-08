import React, { useCallback, useEffect } from 'react'
import { Tabs } from 'components/ui'
import WorkOrderTabDetails from './WorkOrderTabDetails'

import ActivityDetails from '../activity/ActivityDetails'
import { useParams } from 'react-router-dom'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'
import { injectReducer } from 'store'
import reducer from 'views/wareHouse/WareHouse/store'
import { useDispatch, useSelector } from 'react-redux'
import { getWorkOrderById } from 'views/wareHouse/WareHouse/store/dataSlice'
import { Loading } from 'components/shared'
import OrderProcessing from './OrderProcessing'

const { TabNav, TabList, TabContent } = Tabs
injectReducer('wareHouse', reducer)
const WorkOrderTabs = () => {
    const {id}=useParams()
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.wareHouse.data.loading)
 
    const data = useSelector((state) => state.wareHouse.data.workOrderItem)
    
    const fetchData = useCallback(() => {
        if(id){
            dispatch(getWorkOrderById(id))
            // dispatch(getItemVariants())
        }
    }, [dispatch,id])

    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData])
    
    const breadCrumbList = [
        {
            name: 'Home',
            link: '/home',
        },
        {
            name: 'Work Orders',
            link: '/warehouse-workorder',
        },
        {
            name: data?.wo_unq_id,
        },
    ]
    
    return (
        <>
            <Loading loading={loading} type="cover">
            <CustomBreadcrumbs list={breadCrumbList} />
            <br />
            <div>
                <Tabs defaultValue="workOrderDetails">
                    <TabList>
                        <TabNav value="workOrderDetails">
                            Work Order Details
                        </TabNav>
                        <TabNav value="orderPrcessing">OrderProcessing</TabNav>
                        <TabNav value="activity">Activity</TabNav>
                    </TabList>
                    <div>
                        <TabContent value="workOrderDetails">
                            <div className="lg:flex items-center justify-between mt-6 mb-6">
                            </div>
                            <WorkOrderTabDetails />
                        </TabContent>
                    </div>
                    <div>
                        <TabContent value="orderPrcessing">
                            <div className="lg:flex items-center justify-between mt-6 mb-6">
                            </div>
                            <OrderProcessing />
                        </TabContent>
                    </div>
                    <div>
                        <TabContent value="activity">
                            <div className="lg:flex items-center justify-between mt-6 mb-6">
                            </div>
                            <ActivityDetails />
                        </TabContent>
                    </div>
                </Tabs>
            </div>
            </Loading>
        </>
    )
}

export default WorkOrderTabs
