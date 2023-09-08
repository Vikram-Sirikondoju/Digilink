import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
} from '../store/stateSlice'
import { deleteItems, getItems } from '../store/dataSlice'

const ItemDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const selectedRows = useSelector(
        (state) => state.itemsList.state.selectedRows
    )
    const selectedRow = useSelector(
        (state) => state.itemsList.state.selectedRow
    )
    const deleteMode = useSelector(
        (state) => state.itemsList.state.deleteMode
    )
    const tableData = useSelector(
        (state) => state.itemsList.data.tableData
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
            const success = await deleteItems({ id: selectedRow })
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await deleteItems({ id: selectedRows })
            deleteSucceed(success, selectedRows.length)
            dispatch(setSelectedRows([]))
        }
    }

    const deleteSucceed = (success, Items) => {
        if (success) {
            dispatch(getItems(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    {deleteMode === 'single' && 'Item '}
                    {deleteMode === 'batch' && `${Items} Items `}
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
                Are you sure you want to delete this Item? All record related
                to this Item will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default ItemDeleteConfirmation
