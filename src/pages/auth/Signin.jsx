import { useState } from "react";
import { Input, Label } from "../../components/Tags";
import AuthLayout from "./AuthLayout";
import { useSigninMutation } from "../../app/api/authApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const [login] = useSigninMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(data)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <AuthLayout onSubmit={handleSubmit} title="login">
      <Label id="username">username</Label>
      <Input id="username" autoFocus={true} placeholder={"username"} onChange={handleChange} />
      <Label id="password">password</Label>
      <Input type="password" id="password" placeholder={"password"} onChange={handleChange} />
    </AuthLayout>
  );
};

export default Signin;
