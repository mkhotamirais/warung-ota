import { FaSearchengin } from "react-icons/fa6";
import { useGetTagsQuery } from "../../../app/api/tagApiSlice";
import { Badge } from "../../../components/Components";
import { Select } from "../../../components/Tags";
import { useGetCategoriesQuery } from "../../../app/api/categoryApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  resetQuery,
  setFilterCategory,
  setQ,
  setQuery,
  setQueryResult,
  setQuerySort,
  setQueryTag,
  setSortCategory,
  setSortCreated,
  setSortName,
  setSortPrice,
  setSortUpdated,
} from "../../../app/features/productSlice";
import { useEffect } from "react";

export const ResetQuery = () => {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(resetQuery())} className="bg-cyan-500 rounded px-2 hover:opacity-70 text-white">
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
  const { filterCategory } = useSelector((state) => state.product);
  const { data } = useGetCategoriesQuery();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setFilterCategory(e.target.value));
  };

  useEffect(() => {
    dispatch(setQuery({ category: filterCategory }));
    dispatch(setQueryResult());
  }, [dispatch, filterCategory]);

  return (
    <Select className={"w-max mb-0"} value={filterCategory} onChange={handleChange}>
      <option value="">category</option>
      {data?.map((item) => (
        <option key={item?._id} value={item?._id}>
          {item?.name}
        </option>
      ))}
    </Select>
  );
};

export const QuerySortName = () => {
  const { querySortString, sortName } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setSortName(e.target.value));
    dispatch(setQuerySort({ [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (querySortString) {
      dispatch(setQuery({ sort: querySortString }));
      dispatch(setQueryResult());
    }
  }, [dispatch, querySortString]);

  return (
    <Select className={"w-max mb-0"} value={sortName} id="name" onChange={handleChange}>
      <option value="">name</option>
      <option value="name">a-z</option>
      <option value="-name">z-a</option>
    </Select>
  );
};

export const QuerySortPrice = () => {
  const { querySortString, sortPrice } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setSortPrice(e.target.value));
    dispatch(setQuerySort({ [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (querySortString) {
      dispatch(setQuery({ sort: querySortString }));
      dispatch(setQueryResult());
    }
  }, [dispatch, querySortString]);

  return (
    <Select className={"w-max mb-0"} value={sortPrice} id="price" onChange={handleChange}>
      <option value="">price</option>
      <option value="price">cheap</option>
      <option value="-price">expensive</option>
    </Select>
  );
};

export const QuerySortCategory = () => {
  const { querySortString, sortCategory } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setSortCategory(e.target.value));
    dispatch(setQuerySort({ [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (querySortString) {
      dispatch(setQuery({ sort: querySortString }));
      dispatch(setQueryResult());
    }
  }, [dispatch, querySortString]);

  return (
    <Select className={"w-max mb-0"} value={sortCategory} id="category" onChange={handleChange}>
      <option value="">category</option>
      <option value="category">a-z</option>
      <option value="-category">z-a</option>
    </Select>
  );
};

export const QuerySortCreated = () => {
  const { querySortString, sortCreated } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setSortCreated(e.target.value));
    dispatch(setQuerySort({ [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (querySortString) {
      dispatch(setQuery({ sort: querySortString }));
      dispatch(setQueryResult());
    }
  }, [dispatch, querySortString]);

  return (
    <Select className={"w-max mb-0"} value={sortCreated} id="createdAt" onChange={handleChange}>
      <option value="">created</option>
      <option value="category">latest</option>
      <option value="-category">oldest</option>
    </Select>
  );
};

export const QuerySortUpdated = () => {
  const { querySortString, sortUpdated } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setSortUpdated(e.target.value));
    dispatch(setQuerySort({ [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (querySortString) {
      dispatch(setQuery({ sort: querySortString }));
      dispatch(setQueryResult());
    }
  }, [dispatch, querySortString]);

  return (
    <Select className={"w-max mb-0"} value={sortUpdated} id="updatedAt" onChange={handleChange}>
      <option value="">updated</option>
      <option value="category">latest</option>
      <option value="-category">oldest</option>
    </Select>
  );
};
