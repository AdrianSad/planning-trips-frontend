export const setUserData = (state, action) => {
    state.userData = action.payload;
};

export const clearAuth = state => {
    state.userData = null;
}