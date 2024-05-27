import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    q: "",
    category: "",
    sortName: "",
    queryResult: "",
    query: {},
    queryTag: [],
    queryTagString: "",
    querySort: [],
    querySortString: "",
    queryString: "",
  },
  reducers: {
    setQ(state, action) {
      state.q = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSortName(state, action) {
      state.sortName = action.payload;
    },
    setQuery(state, action) {
      state.query = { ...state.query, ...action.payload };
      const result = Object.entries(state.query)
        .map((item) => item.join("="))
        .join("&");
      state.queryString = result;
    },
    setQueryTag(state, action) {
      state.queryTag = action.payload;
      const result = state.queryTag.join("&tag=");
      if (state.queryString.length > 0) state.queryTagString = "&tag=" + result;
      else state.queryTagString = "?tag=" + result;
    },
    setQuerySort(state, action) {
      state.querySort = { ...state.querySort, ...action.payload };
      let result = Object.values(state.querySort)
        .filter((item) => item !== "")
        .join(" ");
      if (!result || result === "") result = "name";
      state.querySortString = result;
    },
    setQueryResult(state) {
      state.queryResult = state.queryString + state.queryTagString;
    },
    resetQuery(state) {
      state.q = "";
      state.category = "";
      state.queryResult = "";
      state.query = {};
      state.queryTag = [];
      state.queryTagString = "";
      state.queryString = "";
    },
  },
});

export const { setQ, setCategory, setQuery, setQueryTag, setQueryResult, resetQuery, setQuerySort } = productSlice.actions;
export default productSlice.reducer;
