import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../../app/api/authApiSlice";

const AuthRedirect = () => {
  const { data } = useGetMeQuery();

  let content;
  if (!data || data === undefined) content = <Outlet />;
  else content = <Navigate to={"/"} replace />;
  return content;
};

export default AuthRedirect;
