import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    paymentMethod: [
        {
            id: 1,
            name: 'Visa'
        },
        {
            id: 2,
            name: 'MasterCard'
        },
    ],
    taxRate: 20,
    cart: [],
    paymentForm: {
        userId: null,
        paymentMethod: null,
        paymentCardNo: null,
        paymentCardCCV: null,
        paymentCardExpiry: null
    }

};


export const addToCart = createAsyncThunk(
    'order/addToCart',
    async (ticketListIndex, { rejectWithValue, getState }) => {

        const ticket = getState().ticket.list[ticketListIndex];
        const ticketOrderList = getState().order.cart;

        try {

            const ticketOrderIndex = ticketOrderList.findIndex(obj => obj.id === ticket.id);

            if (ticketOrderIndex !== -1) {
                return {
                    ticketIndex: ticketOrderIndex,
                    ticketData: ticket
                }
            } else {
                return {
                    ticketIndex: null,
                    ticketData: ticket
                }
            }

        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const submitOrder = createAsyncThunk(
    'order/submitOrder',
    async (formData, { rejectWithValue, getState }) => {

        const userId = getState().app.userId;

        try {

            return {
                ...formData,
                userId
            }

        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setTicketOrderQuantity: (state, { payload }) => {
            const ticketOrder = [...state.cart];
            const ticketIndex = ticketOrder.findIndex(obj => obj.id === payload.id);

            if (ticketIndex !== -1 && !isNaN(payload.value)) {
                ticketOrder[ticketIndex].quantity = payload.value;
            }

            state.cart = ticketOrder;
        },
        removeTicketOrder: (state, { payload }) => {

            const ticketOrder = [...state.cart];
            ticketOrder.splice(payload, 1);

            state.cart = ticketOrder;
        },
        resetOrder: (state, { payload }) => {
            state.cart = [];
            state.paymentForm.userId = null;
            state.paymentForm.paymentMethod = null;
            state.paymentForm.paymentCardNo = null;
            state.paymentForm.paymentCardCCV = null;
            state.paymentForm.paymentCardExpiry = null;
        },
    },
    extraReducers: builder => {

        builder.addCase(addToCart.fulfilled, (state, { payload }) => {

            const ticketIndex = payload.ticketIndex;
            const ticket = payload.ticketData;

            if (ticketIndex !== null) {
                state.cart[ticketIndex] = ticket
            } else {
                const cart = [...state.cart];
                cart.push(ticket)
                state.cart = cart;
            }
        });

        builder.addCase(submitOrder.fulfilled, (state, { payload }) => {
            state.paymentForm.userId = payload.userId;
            state.paymentForm.paymentMethod = payload.paymentMethod;
            state.paymentForm.paymentCardNo = payload.cardNo;
            state.paymentForm.paymentCardCCV = payload.cardCCV;
            state.paymentForm.paymentCardExpiry = payload.cardExpiry;
        });
    },
});

export const { setTicketOrderQuantity, removeTicketOrder, resetOrder } = order.actions;

export default order;