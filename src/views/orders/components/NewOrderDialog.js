import React from 'react'
import { Dialog } from 'components/ui'
import { toggleNewOrderDialog } from '../store/stateSlice'
import { useDispatch, useSelector } from 'react-redux'
import NewOrderForm from './NewOrderForm'

const NewOrderDialog = () => {
    const dispatch = useDispatch()

    const newOrderDialog = useSelector(
        (state) => state.salesOrderList.state.newOrderDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewOrderDialog(false))
    }

    return (
        <Dialog
            isOpen={newOrderDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>Order For</h4>
            <div className="mt-4">
                <NewOrderForm />
            </div>
        </Dialog>
    )
}

export default NewOrderDialog
