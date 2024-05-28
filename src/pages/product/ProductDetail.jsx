import { useParams } from "react-router-dom";
import { Badge, Err, Loading, Prev, Title } from "../../components/Components";
import { useGetProductByIdQuery } from "../../app/api/productApiSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess, error } = useGetProductByIdQuery(id);
  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = (
      <div>
        <Title>
          <Prev />
          Detail User <i>{data?.name}</i>
        </Title>
        <div className="border rounded-lg p-3 shadow flex flex-col gap-2">
          <div className="capitalize">
            <b>name</b> : {data?.name}
          </div>
          <div>
            <b>price</b> : Rp{data?.price?.toLocaleString("id-ID")}
          </div>
          <div>
            <b>category</b> : {data?.category?.name}
          </div>
          <div>
            <b>description</b> : {data?.desc}
          </div>
          <div className="flex gap-1 items-center flex-wrap">
            <div>
              <b>tags</b> :
            </div>
            {data?.tag?.map((item) => (
              <Badge key={item?._id}>{item?.name}</Badge>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return content;
};

export default ProductDetail;
