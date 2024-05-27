import { useGetCategoriesQuery } from "../../../app/api/categoryApiSlice";
import { Err, Loading, Prev, Title } from "../../../components/Components";
import AdmCatPost from "./AdmCatPost";
import AdmCatItems from "./AdmCatItems";

const AdmCat = () => {
  const { data, isLoading, isError, isSuccess, error } = useGetCategoriesQuery();
  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    if (data?.length > 0) {
      const renderedData = data && data.map((item) => <AdmCatItems key={item?._id} item={item} />);
      content = <div className="w-full sm:w-1/2 my-2 flex flex-col gap-1">{renderedData}</div>;
    } else content = <Err className={"w-full sm:w-1/2"}>no content</Err>;
  }

  return (
    <div>
      <Title>
        <Prev />
        admin category
      </Title>
      <AdmCatPost />
      {content}
    </div>
  );
};

export default AdmCat;
