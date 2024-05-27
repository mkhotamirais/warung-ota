import { useGetMeQuery } from "../app/api/authApiSlice";

const Home = () => {
  const { data } = useGetMeQuery();
  return (
    <div>
      Welcome <span className="capitalize">{data && data?.username}</span>
    </div>
  );
};

export default Home;
