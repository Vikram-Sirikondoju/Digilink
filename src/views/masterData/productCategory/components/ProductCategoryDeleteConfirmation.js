import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
} from '../store/stateSlice'
import { deleteSolutions } from '../store/dataSlice'

const ProductCategoryDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const selectedRows = useSelector(
        (state) => state.solutionsList.state.selectedRows
    )
    const selectedRow = useSelector(
        (state) => state.solutionsList.state.selectedRow
    )
    const deleteMode = useSelector(
        (state) => state.solutionsList.state.deleteMode
    )
    const tableData = useSelector(
        (state) => state.solutionsList.data.tableData
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
            const success = await deleteSolutions({ id: selectedRow })
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await deleteSolutions({ id: selectedRows })
            deleteSucceed(success, selectedRows.length)
            dispatch(setSelectedRows([]))
        }
    }

    const deleteSucceed = (success, Solutions) => {
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    {deleteMode === 'single' && 'Solution '}
                    {deleteMode === 'batch' && `${Solutions} Solutions `}
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
                Are you sure you want to delete this Solution? All record related
                to this Solution will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default ProductCategoryDeleteConfirmation
