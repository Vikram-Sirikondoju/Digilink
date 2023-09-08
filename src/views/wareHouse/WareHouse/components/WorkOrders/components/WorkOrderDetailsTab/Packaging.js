import Accordion from 'components/shared/Accordion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'components/ui'
import PackagingItem from './PackagingItem'
import { apiCreateWorkOrderPackagingItemsBulk } from 'services/WorkOrderService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg } from 'views/Servicefile'
import { getWorkOrderById } from 'views/wareHouse/WareHouse/store/dataSlice'

const Packaging = (props) => {
    const [AccordionItems, setAccordionItems] = useState([])
    const data = useSelector((state) => state.wareHouse.data)
    const dispatch = useDispatch()
    const workOrderItem = data?.workOrderItem
    const [message, setMessage] = useTimeOutMessage()
    const [work_order_pack, setWorkOrderPack] = useState(
        workOrderItem.dgl_work_order_packaging
    )
    useEffect(() => {
        handleUpdateAccordions(work_order_pack)
    }, [work_order_pack])
    useEffect(() => {
        if(work_order_pack?.length ===0){
            handleAddNewPackage()
        }
    }, [])
    const handleRemoveItem = (id) => {
        const data = [...work_order_pack]
        const findIndex = data?.findIndex((i) => i?.package_id === id)
        data.splice(findIndex, 1)
        setWorkOrderPack(data)
    }

    const handleUpdateItem = (dataItem) => {
        const data = [...work_order_pack]
        const updateData = data?.map((i) => {
            if (i?.package_id === dataItem?.package_id) {
                return {...i,...dataItem }
            } else {
                return { ...i }
            }
        })
        setWorkOrderPack(updateData)
    }

    const handleUpdateAccordions = (records) => {
        const list = records?.map((i) => {
            console.log('package_id',i?.package_id)
            let component = (
                <PackagingItem
                    dataItem={i}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateItem={handleUpdateItem}
                />
            )

            return { id: i?.package_id, title: i?.package_id, component }
        })
        setAccordionItems(list)
    }

    const handleCreateBulkPackaging = async () => {
        const data = [...work_order_pack]
        if (data?.length > 0) {
            const req = { dgl_work_order_packaging_dto: data,wo_info_id:workOrderItem?.id }
            const resp = await apiCreateWorkOrderPackagingItemsBulk(req)
            if (resp.status === 'success') {
                dispatch(getWorkOrderById(workOrderItem?.id))
                props?.onNext()
            } else if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp))
            }
        } else {
            setMessage(`Please do atleast One Package to Create Shipment`)
        }
    }

    const handleAddNewPackage = () => {
        let data = [...work_order_pack]
        const newItem = {
            package_id: `PACK${Math.floor(
                Math.random() * (999 - 100 + 1) + 100
            )}`,
            package_date: new Date(),
            net_weight: '',
            gross_weight: '',
            length: '',
            width: '',
            height: '',
            bar_code: '',
            is_shipping: false,
            package_items: [],
            shipping_label: null,
            way_bill: null,
            special_instruction: '',
            wo_info_id: null,
            wo_packaging_status: null,
        }
        data.push(newItem)
        setWorkOrderPack(data)
    }

    return (
        <div>
            <Accordion Items={AccordionItems} />
            <div className="mt-4 text-right">
                <Button variant="twoTone" onClick={() => handleAddNewPackage()}>
                    {'Add New Package'}
                </Button>
            </div>
            <div className="mt-4 text-right">
                <Button
                    type={'button'}
                    className="mx-2"
                    onClick={() => props?.onPrevious()}
                    variant="solid"
                    style={{
                        backgroundColor: '#4D4D4D',
                    }}
                >
                    {'Previous'}
                </Button>
                <Button
                    variant="solid"
                    onClick={() => handleCreateBulkPackaging()}
                >
                    {'Next: Create Shipment'}
                </Button>
            </div>
        </div>
    )
}

export default Packaging
