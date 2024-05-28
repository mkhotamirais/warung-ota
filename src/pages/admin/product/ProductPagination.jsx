import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery, setQueryResult } from "../../../app/features/productSlice";

const ProductPagination = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  let limit = 5;
  let skip = currentPage * limit - limit;
  const totalPage = Math.ceil(data?.count / limit);
  const pageNumbers = Array.from({ length: totalPage }, (v, i) => i + 1);

  const handleCurrentPage = (num) => setCurrentPage(num);
  const nextPage = () => (currentPage !== totalPage ? setCurrentPage(currentPage + 1) : null);
  const prevPage = () => (currentPage !== 1 ? setCurrentPage(currentPage - 1) : null);

  useEffect(() => {
    dispatch(setQuery({ skip, limit }));
    dispatch(setQueryResult());
  }, [dispatch, skip, limit]);

  return (
    <div>
      <button disabled={currentPage === 1 && true} onClick={prevPage} className="border px-2 disabled:opacity-50">
        Prev
      </button>
      {pageNumbers.map((num, i) => (
        <button
          onClick={() => handleCurrentPage(num)}
          key={i}
          className={`border px-2 hover:bg-blue-500 hover:text-white  ${
            currentPage === num ? "bg-blue-500 text-white" : ""
          }`}
        >
          {num}
        </button>
      ))}
      <button disabled={currentPage === totalPage && true} onClick={nextPage} className="border px-2 disabled:opacity-50">
        Next
      </button>
    </div>
  );
};
ProductPagination.propTypes;
export default ProductPagination;
