import { createSlice } from '@reduxjs/toolkit';

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

export const order = createSlice({
    name: 'order',
    initialState,
});

export default order;