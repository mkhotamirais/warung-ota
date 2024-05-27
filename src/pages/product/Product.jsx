import { useGetProductsQuery } from "../../app/api/productApiSlice";
import { Err, ItemsCard, Loading, Title, ViewOption } from "../../components/Components";
import { useSelector } from "react-redux";
import ProducCard from "./ProducCard";
import ProductTable from "./ProductTable";
import { setProductView } from "../../app/features/basicSlice";
import { QueryCategory, QuerySearch, QueryTag } from "../admin/product/ProductQuery";

const Product = () => {
  const { data, isLoading, isError, isSuccess, error } = useGetProductsQuery();
  const { productView } = useSelector((state) => state.basic);

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    if (data?.length > 0) {
      const renderedCard = data && data.map((item) => <ProducCard key={item?._id} item={item} />);
      const renderedTable = data && data.map((item, i) => <ProductTable key={item?._id} item={item} i={i} />);
      if (productView === "card") {
        content = <ItemsCard>{renderedCard}</ItemsCard>;
      } else if (productView === "table") {
        content = (
          <table className="w-full border-separate">
            <thead>
              <tr className="*:border *:rounded *:text-left *:px-2">
                <th>no</th>
                <th>name</th>
                <th>price</th>
                <th className="hidden md:table-cell">created</th>
                <th className="hidden lg:table-cell">updated</th>
              </tr>
            </thead>
            <tbody>{renderedTable}</tbody>
          </table>
        );
      }
    }
  }
  return (
    <div>
      <Title>
        admin product
        <ViewOption view={productView} setView={setProductView} />
      </Title>
      <div className="flex gap-1 w-full justify-between">
        <QuerySearch />
        <QueryCategory />
      </div>
      <div>
        <QueryTag />
      </div>
      {content}
    </div>
  );
};

export default Product;
