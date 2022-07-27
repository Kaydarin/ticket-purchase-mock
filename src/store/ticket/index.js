import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [
        {
            id: 1,
            title: 'Foo Fighters',
            img: 'https://www.syracuse.com/resizer/0X7L9GNUtqQj6TppSRkDIjK6mEc=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/NPKVVKP6PBEWRISW7FTSWEK2QM.jpg',
            startDate: '1 Feb 2022',
            endDate: '30 Dec 2022',
            venue: 'Kuala Lumpur City Centre (KLCC)',
            price: 100.50,
            currency: 'MYR',
            quantity: 0
        },
        {
            id: 2,
            title: 'Eminem',
            img: 'https://render.fineartamerica.com/images/rendered/default/poster/8/10/break/images/artworkimages/medium/1/eminem-greatom-london.jpg',
            startDate: '22 Mac 2022',
            endDate: '27 April 2022',
            venue: 'Malaysia International Trade and Exhibition Centre (MITEC)',
            price: 125.00,
            currency: 'MYR',
            quantity: 0
        },
        {
            id: 3,
            title: 'Veiled in Scarlet',
            img: 'https://i.scdn.co/image/ab67616d0000b273c62fb85518fcf3e2f06354c7',
            startDate: '11 May 2022',
            endDate: '18 July 2022',
            venue: 'Shah Alam Convention Centre (SACC)',
            price: 85.00,
            currency: 'MYR',
            quantity: 0
        },
    ]
};

export const ticket = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setTicketQuantity: (state, { payload }) => {
            const ticketList = [...state.list];
            const ticketIndex = ticketList.findIndex(obj => obj.id === payload.id);

            if (ticketIndex !== -1 && !isNaN(payload.value)) {
                ticketList[ticketIndex].quantity = payload.value;
            }


            state.list = ticketList;
        },
        resetQuantity: (state) => {
            let ticketList = [...state.list];

            ticketList = ticketList.map(ticket => ({
                ...ticket,
                quantity: 0
            }));

            state.list = ticketList;
        }
    },
});

export const { setTicketQuantity, resetQuantity } = ticket.actions;

export default ticket;