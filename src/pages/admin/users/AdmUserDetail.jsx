import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../../app/api/userApiSlice";
import { Err, Loading, Prev, Title } from "../../../components/Components";
import moment from "moment";

const AdmUserDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess, error } = useGetUserByIdQuery(id);
  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = (
      <div>
        <Title>
          <Prev />
          Detail User <i>{data?.username}</i>
        </Title>
        <div className="border rounded-lg p-3 shadow flex flex-col gap-2">
          <div>
            <b>Username</b> : {data?.username}
          </div>
          <div>
            <b>Email</b> : {data?.email}
          </div>
          <div>
            <b>Role</b> : {data?.role}
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

export default AdmUserDetail;
