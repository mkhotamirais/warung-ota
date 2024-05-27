import { useState } from "react";
import { Input, Label } from "../../../components/Tags";
import { usePostUserMutation } from "../../../app/api/userApiSlice";
import { PiSpinner } from "react-icons/pi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Prev, Title } from "../../../components/Components";

const AdmUsersPost = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [postUser, { isLoading }] = usePostUserMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    postUser(data)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        navigate(-1);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <div>
      <Title>
        <Prev />
        Post User
      </Title>
      <form onSubmit={handleSubmit} className="border rounded-lg p-2">
        <Label id="username">username</Label>
        <Input id="username" autoFocus={true} placeholder={"username"} onChange={handleChange} />
        <Label id="email">email</Label>
        <Input type="email" id="email" placeholder={"email"} onChange={handleChange} />
        <Label id="password">password</Label>
        <Input type="password" id="password" placeholder={"password"} onChange={handleChange} />
        <Label id="confPassword">Confirm Password</Label>
        <Input type="password" id="confPassword" placeholder={"Confirm Password"} onChange={handleChange} />
        <button
          type="submit"
          className="w-20 p-1 rounded bg-cyan-500 hover:opacity-70 text-white flex items-center justify-center"
        >
          {isLoading ? (
            <div className="text-2xl animate-spin">
              <PiSpinner />
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdmUsersPost;
