import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserSliceState {
    id: number;
    fname: string;
    lname: string;
    email: string;
    isGuest: boolean;
    isAuthenticated: boolean;
}

const initialState: UserSliceState = {
    id: 1,
    fname: 'Ali',
    lname: 'El Zein',
    email: '',
    isGuest: false,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<Partial<UserSliceState>>) {
            Object.assign(state, action.payload);
        },
        logout: () => initialState,

        setIsGuest(state, action: PayloadAction<boolean>) {
            state.isGuest = action.payload;
        },
        setIsAuthenticated(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
    },
});

export const {
    setUser,
    logout,
    setIsGuest,
    setIsAuthenticated
} =
    userSlice.actions;
export default userSlice.reducer;
