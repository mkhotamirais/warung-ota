import { useGetProductsQuery } from "../../../app/api/productApiSlice";
import { Err, ItemsCard, Loading, Prev, Title, ViewOption } from "../../../components/Components";
import { useSelector } from "react-redux";
import AdmProducCard from "./AdmProducCard";
import AdmProductTable from "./AdmProductTable";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { setAdmProductView } from "../../../app/features/basicSlice";
import { QueryCategory, QuerySearch, QuerySortName, QuerySortPrice, QueryTag, ResetQuery } from "./ProductQuery";

const AdmProduct = () => {
  const { queryResult } = useSelector((state) => state.product);
  const { data, isLoading, isError, isSuccess, error } = useGetProductsQuery(queryResult);
  const { admProductView } = useSelector((state) => state.basic);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    if (data?.length > 0) {
      const renderedCard = data && data.map((item) => <AdmProducCard key={item?._id} item={item} />);
      const renderedTable = data && data.map((item, i) => <AdmProductTable key={item?._id} item={item} i={i} />);
      if (admProductView === "card") {
        content = <ItemsCard>{renderedCard}</ItemsCard>;
      } else if (admProductView === "table") {
        content = (
          <table className="w-full border-separate">
            <thead>
              <tr className="*:border *:rounded *:text-left *:px-1">
                <th>no</th>
                <th>name</th>
                <th>price</th>
                <th className="hidden sm:table-cell">description</th>
                <th className="hidden sm:table-cell">user</th>
                <th className="hidden md:table-cell">category</th>
                <th className="hidden lg:table-cell">tag</th>
                <th className="flex justify-center">Action</th>
              </tr>
            </thead>
            <tbody>{renderedTable}</tbody>
          </table>
        );
      }
    } else content = <Err>no content</Err>;
  }
  return (
    <div>
      <Title>
        <Prev />
        admin product
        <Link to="post" className="text-xl text-cyan-500 hover:opacity-70">
          <FaCirclePlus />
        </Link>
        <ViewOption view={admProductView} setView={setAdmProductView} />
      </Title>
      <div className="flex justify-between gap-2">
        <QuerySearch />
        <ResetQuery />
      </div>
      <div className="flex gap-1 items-center my-1">
        <div className="min-w-max">Sort By:</div>
        <QuerySortName />
        <QuerySortPrice />
      </div>
      <div className="flex gap-1 items-center my-1">
        <div className="min-wmax">Filter By:</div>
        <QueryCategory />
      </div>
      <QueryTag />
      {content}
    </div>
  );
};

export default AdmProduct;
