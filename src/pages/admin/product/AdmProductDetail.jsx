import { useParams } from "react-router-dom";
import { Badge, Err, Loading, Prev, Title } from "../../../components/Components";
import moment from "moment";
import { useGetProductByIdQuery } from "../../../app/api/productApiSlice";

const AdmProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess, error } = useGetProductByIdQuery(id);
  console.log(data);
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
          <div>
            <b>ID</b> : {data?._id}
          </div>
          <div>
            <b>name</b> : {data?.name}
          </div>
          <div>
            <b>price</b> : {data?.price}
          </div>
          <div>
            <b>description</b> : {data?.desc}
          </div>
          <div>
            <b>by</b> : {data?.user?.username}
          </div>
          <div className="flex gap-1 items-center flex-wrap">
            <div>
              <b>tags</b> :
            </div>
            {data?.tag?.map((item) => (
              <Badge key={item?._id}>{item?.name}</Badge>
            ))}
          </div>
          <div className="text-sm">
            <div>Created {moment(data?.createdAt).fromNow()}</div>
            <div>Updated {moment(data?.updatedAt).fromNow()}</div>
          </div>
        </div>
      </div>
    );
  }
  return content;
};

export default AdmProductDetail;
