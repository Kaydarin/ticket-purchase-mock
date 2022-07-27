import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: 1,
    username: 'John Doe',
};

export const app = createSlice({
    name: 'app',
    initialState,
});

export default app;