import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
} from '../store/stateSlice'
import { deleteTemplates, getTemplates } from '../store/dataSlice'

const TemplateDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const selectedRows = useSelector(
        (state) => state.templatesList.state.selectedRows
    )
    const selectedRow = useSelector(
        (state) => state.templatesList.state.selectedRow
    )
    const deleteMode = useSelector(
        (state) => state.templatesList.state.deleteMode
    )
    const tableData = useSelector(
        (state) => state.templatesList.data.tableData
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
            const success = await deleteTemplates({ id: selectedRow })
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await deleteTemplates({ id: selectedRows })
            deleteSucceed(success, selectedRows.length)
            dispatch(setSelectedRows([]))
        }
    }

    const deleteSucceed = (success, Templates) => {
        if (success) {
            dispatch(getTemplates(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    {deleteMode === 'single' && 'Template '}
                    {deleteMode === 'batch' && `${Templates} Templates `}
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
                Are you sure you want to delete this Template? All record related
                to this Template will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default TemplateDeleteConfirmation
