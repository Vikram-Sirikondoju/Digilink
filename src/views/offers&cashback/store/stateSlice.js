import { createSlice, current } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'salesOrderList/state',
    initialState: {
        selectedRows: [],
        selectedRow: [],
        deleteMode: '',
        newOrderDialog: false,
    },
    reducers: {
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        addRowOrder: (state, { payload }) => {
            const currentState = current(state)
            if (!currentState.selectedRows.includes(payload)) {
                return {
                    selectedRows: [...currentState.selectedRows, ...payload],
                }
            }
        },
        removeRowOrder: (state, { payload }) => {
            const currentState = current(state)
            if (currentState.selectedRows.includes(payload)) {
                return {
                    selectedRows: currentState.selectedRows.filter(
                        (id) => id !== payload
                    ),
                }
            }
        },
        setDeleteMode: (state, action) => {
            state.deleteMode = action.payload
        },
        toggleNewOrderDialog: (state, action) => {
            state.newOrderDialog = action.payload
        },
    },
})

export const {
    setSelectedRows,
    setSelectedRow,
    addRowOrder,
    removeRowOrder,
    toggleDeleteConfirmation,
    setDeleteMode,
    toggleNewOrderDialog
} = stateSlice.actions

export default stateSlice.reducer
