import React, { useCallback, useEffect, useState } from 'react'
import { Steps, Button, Card, Alert } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { HiCheckCircle } from 'react-icons/hi'
import Accordion from 'components/shared/Accordion'
import InventoryAllocation from './InventoryAllocation'
import Labelling from './Labelling'
import { apiCreateWorkOrderLabelling } from 'services/WorkOrderService'
import { GetErrorMsg } from 'views/Servicefile'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import Packaging from './Packaging'
import Dispatch from './Dispatch'
import ShipmentForm from './ShipmentForm'
import { useNavigate } from 'react-router-dom'

const OrderProcessing = () => {
    const res = useSelector((state) => state.wareHouse.data);
    const navigate= useNavigate()
    const workOrderData = res?.workOrderItem
    const [shipmentFormVisible, setShipmentFormVisible] = useState(false)
    const [step, setStep] = useState(0)
    const [message, setMessage] = useTimeOutMessage()
    const onChange = (nextStep) => {
        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep > 3) {
            setStep(3)
        } else {
            setStep(nextStep)
        }
    }

    const onNext = () => {
        setStep(step + 1)
    }
    const handleCreateLabelling = async () => {
        const work_order_labelling = workOrderData?.dgl_wo_intry_allocation
            ?.filter((i) => !i?.dgl_work_order_labelling)
            ?.map((j) => {
                return {
                    wo_inventry_id: j?.id,
                    item_var_id: j?.item_var_id,
                }
            })
        if (work_order_labelling?.length > 0) {
            const req = {
                dgl_work_order_labelling: work_order_labelling,
                wo_info_id: workOrderData?.id,
            }
            const resp = await apiCreateWorkOrderLabelling(req)
            if (resp.status === 'success') {
                onNext()
            } else if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp))
            }
        } else {
            onNext()
        }
    }

    const onPrevious = () => onChange(step - 1)
    const handleComplete = () => {
        navigate(`/warehouse-workorder`)
    }
    const handleShipmentFormPrevious=()=>{
        setShipmentFormVisible(false);
        setStep(2)
    }
    const handleDispatchFormPrevious=()=>{
        setShipmentFormVisible(true);
        setStep(2)
    }

    const showShipmentForm = () => {
        setShipmentFormVisible(true);
    }
    return (
        <div className="mt-5">
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {Array.isArray(message) ? message.join(', ') : message}
                </Alert>
            )}
            <Steps current={step}>
                <Steps.Item title={'INVENTORY ALLOCATION'} />
                <Steps.Item title="LABELLING" />
                <Steps.Item title="PACKAGING" />
                <Steps.Item title="DISPATCH" />
            </Steps>
            {step === 0 && (
                <div>
                    <InventoryAllocation onNext={handleCreateLabelling} />
                </div>
            )}
            {step === 1 && (
                <div>
                    <Labelling onNext={onNext} onPrevious={onPrevious} />
                </div>
            )}
            {step === 2 && (
                <div>
                    <Packaging onNext={() => showShipmentForm()} onPrevious={onPrevious} />
                </div>
            )}
            {step === 3 && (
                <div>
                    <Dispatch onNext={handleComplete} onPrevious={handleDispatchFormPrevious} />
                </div>
            )}
            <ShipmentForm shipmentFormVisible={shipmentFormVisible} onNext={onNext} setShipmentFormVisible={setShipmentFormVisible} onPrevious={handleShipmentFormPrevious} />
        </div>
    )
}

export default OrderProcessing
