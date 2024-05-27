import { createSlice } from "@reduxjs/toolkit";

const basicSlice = createSlice({
  name: "basic",
  initialState: {
    dark: JSON.parse(localStorage.getItem("warungotaDark")) || false,
    openNav: false,
    openAuth: false,
    admUserView: JSON.parse(localStorage.getItem("admUserView")) || "card",
    admCatEdit: null,
    admTagEdit: null,
    admProductView: JSON.parse(localStorage.getItem("admProductView")) || "card",
    productView: JSON.parse(localStorage.getItem("productView")) || "card",
  },
  reducers: {
    toggleDark(state) {
      state.dark = !state.dark;
      localStorage.setItem("warungotaDark", JSON.stringify(state.dark));
    },
    removeDark(state) {
      state.dark = false;
      localStorage.setItem("warungotaDark", JSON.stringify(state.dark));
    },
    toggleOpenNav(state) {
      state.openNav = !state.openNav;
    },
    removeOpenNav(state) {
      state.openNav = false;
    },
    toggleOpenAuth(state) {
      state.openAuth = !state.openAuth;
    },
    removeOpenAuth(state) {
      state.openAuth = false;
    },
    setAdmUserView(state, action) {
      state.admUserView = action.payload;
      localStorage.setItem("admUserView", JSON.stringify(state.admUserView));
    },
    setAdmCatEdit(state, action) {
      state.admCatEdit = action.payload;
    },
    setAdmTagEdit(state, action) {
      state.admTagEdit = action.payload;
    },
    setAdmProductView(state, action) {
      state.admProductView = action.payload;
      localStorage.setItem("admProductView", JSON.stringify(state.admProductView));
    },
    setProductView(state, action) {
      state.productView = action.payload;
      localStorage.setItem("productView", JSON.stringify(state.productView));
    },
  },
});

export const {
  toggleDark,
  removeDark,
  toggleOpenNav,
  removeOpenNav,
  toggleOpenAuth,
  removeOpenAuth,
  setAdmUserView,
  setAdmCatEdit,
  setAdmTagEdit,
  setAdmProductView,
  setProductView,
} = basicSlice.actions;
export default basicSlice.reducer;
