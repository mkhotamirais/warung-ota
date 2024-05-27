import { useGetMeQuery } from "../../app/api/authApiSlice";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdmin = () => {
  const { data } = useGetMeQuery();
  let content;
  if (data && data?.role === "admin") content = <Outlet />;
  else if (data?.role === "" || data?.role === null) content = <Navigate to="/" replace />;
  return content;
};

export default ProtectedAdmin;

export const ProtectedUser = () => {
  const { data } = useGetMeQuery();
  let content;
  if (data?.role === "user") content = <Outlet />;
  else if (data?.role === "" || data?.role === null) content = <Navigate to="/" replace />;
  return content;
};
