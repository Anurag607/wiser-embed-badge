import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showSidebar: [false, ""],
    showBottomSidebar: [false, ""],
    allBadges: [],
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
        }
    },
});

export const {
    toggleSidebar,
    toggleBottomSidebar,
    allBadges,
} = drawerSlice.actions;

export default drawerSlice;
