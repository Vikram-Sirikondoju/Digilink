import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
} from '../store/stateSlice'
import { deleteOrders, getOrders } from '../store/dataSlice'

const EnterpriseDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const selectedRows = useSelector(
        (state) => state.enterpriseList.state.selectedRows
    )
    const selectedRow = useSelector(
        (state) => state.enterpriseList.state.selectedRow
    )
    const deleteMode = useSelector(
        (state) => state.enterpriseList.state.deleteMode
    )
    const tableData = useSelector(
        (state) => state.enterpriseList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            dispatch(setSelectedRow([]))
        }
    }

    const onDelete = async () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            const success = await deleteOrders({ id: selectedRow })
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await deleteOrders({ id: selectedRows })
            deleteSucceed(success, selectedRows.length)
            dispatch(setSelectedRows([]))
        }
    }

    const deleteSucceed = (success, orders) => {
        if (success) {
            dispatch(getOrders(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    {deleteMode === 'single' && 'Order '}
                    {deleteMode === 'batch' && `${orders} orders `}
                    successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={deleteMode === 'single' || deleteMode === 'batch'}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Delete product"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this order? All record related
                to this order will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default EnterpriseDeleteConfirmation
