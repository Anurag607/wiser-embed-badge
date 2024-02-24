import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showSidebar: [false, ""],
    showBottomSidebar: [false, ""],
    allBadges: [],
    currentBadge: null,
};

const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        toggleSidebar: (state, action) => {
            state.showSidebar = action.payload;
        },
        toggleBottomSidebar: (state, action) => {
            state.showBottomSidebar = action.payload;
        },
        setAllBadges: (state, action) => {
            state.allBadges = action.payload;
        },
        setCurrentBadge: (state, action) => {
            state.currentBadge = action.payload;
        }
    },
});

export const {
    toggleSidebar,
    toggleBottomSidebar,
    setAllBadges,
    setCurrentBadge,
} = drawerSlice.actions;

export default drawerSlice;
