import { FaSearchengin } from "react-icons/fa6";
import { useGetTagsQuery } from "../../../app/api/tagApiSlice";
import { Badge } from "../../../components/Components";
import { Select } from "../../../components/Tags";
import { useGetCategoriesQuery } from "../../../app/api/categoryApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  resetQuery,
  setCategory,
  setQ,
  setQuery,
  setQueryResult,
  setQuerySort,
  setQueryTag,
} from "../../../app/features/productSlice";
import { useEffect } from "react";

export const ResetQuery = () => {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(resetQuery())} className="bg-cyan-500 rounded-lg px-2 hover:opacity-70 text-white">
      Reset
    </button>
  );
};

export const QuerySearch = () => {
  const { q } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery({ q }));
    dispatch(setQueryResult());
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full sm:w-56 flex">
        <input
          type="search"
          value={q}
          onChange={(e) => dispatch(setQ(e.target.value))}
          placeholder="search here"
          className="w-full border rounded-l p-1 focus:outline-cyan-300 bg-inherit"
        />
        <button
          type="submit"
          className="w-10 rounded-r hover:opacity-70 bg-cyan-500 flex items-center justify-center text-white"
        >
          <FaSearchengin />
        </button>
      </form>
    </div>
  );
};

export const QueryTag = () => {
  const { data } = useGetTagsQuery();
  const { queryTag } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    if (queryTag.includes(id)) {
      dispatch(setQueryTag(queryTag.filter((t) => t !== id)));
    } else dispatch(setQueryTag([...queryTag, id]));
    dispatch(setQueryResult());
  };

  return (
    <div className="flex gap-1 items-center flex-wrap mb-2">
      Tag:
      {data?.map((item) => (
        <Badge
          onClick={() => handleClick(item?._id)}
          key={item?._id}
          className={`${
            queryTag.includes(item?._id) ? "bg-cyan-500" : "bg-gray-500"
          } text-white cursor-pointer hover:bg-cyan-500`}
        >
          {item?.name}
        </Badge>
      ))}
    </div>
  );
};

export const QueryCategory = () => {
  const { category } = useSelector((state) => state.product);
  const { data } = useGetCategoriesQuery();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  useEffect(() => {
    dispatch(setQuery({ category }));
    dispatch(setQueryResult());
  }, [dispatch, category]);

  return (
    <Select className={"w-max mb-0"} value={category} onChange={handleChange}>
      <option value="">-category</option>
      {data?.map((item) => (
        <option key={item?._id} value={item?._id}>
          {item?.name}
        </option>
      ))}
    </Select>
  );
};

export const QuerySortName = () => {
  const { querySortString } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setQuerySort({ [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(querySortString);
    if (querySortString) {
      dispatch(setQuery({ sort: querySortString }));
      dispatch(setQueryResult());
    }
  }, [dispatch, querySortString]);

  return (
    <Select className={"w-max mb-0"} id="name" onChange={handleChange}>
      <option value="">-name</option>
      <option value="name">a-z</option>
      <option value="-name">z-a</option>
    </Select>
  );
};

export const QuerySortPrice = () => {
  const { querySortString } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setQuerySort({ [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (querySortString) {
      dispatch(setQuery({ sort: querySortString }));
      dispatch(setQueryResult());
    }
  }, [dispatch, querySortString]);

  return (
    <Select className={"w-max mb-0"} id="name" onChange={handleChange}>
      <option value="">-price</option>
      <option value="price">most expensive</option>
      <option value="-price">cheapest</option>
    </Select>
  );
};
