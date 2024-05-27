import { useState } from "react";
import { Input, Label } from "../../components/Tags";
import AuthLayout from "./AuthLayout";
import { useSignupMutation } from "../../app/api/authApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const [register, { isLoading }] = useSignupMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    register(data)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        navigate("/signin");
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <AuthLayout onSubmit={handleSubmit} title="register" isLoading={isLoading}>
      <Label id="username">username</Label>
      <Input id="username" autoFocus={true} placeholder={"username"} onChange={handleChange} />
      <Label id="email">email</Label>
      <Input type="email" id="email" placeholder={"email"} onChange={handleChange} />
      <Label id="password">password</Label>
      <Input type="password" id="password" placeholder={"password"} onChange={handleChange} />
      <Label id="confPassword">Confirm Password</Label>
      <Input type="password" id="confPassword" placeholder={"Confirm Password"} onChange={handleChange} />
    </AuthLayout>
  );
};

export default Signup;
