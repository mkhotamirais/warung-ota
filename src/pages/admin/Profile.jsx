import { useEffect, useState } from "react";
import { useGetMeQuery, useUpdateMeMutation } from "../../app/api/authApiSlice";
import { Err, Loading, Prev, Title } from "../../components/Components";
import toast from "react-hot-toast";
import { PiSpinner } from "react-icons/pi";
import ProfileModalDel from "./ProfileModalDel";

const Profile = () => {
  const { data, isLoading, isError, isSuccess, error } = useGetMeQuery();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [edit, setEdit] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [updateMe, { isLoading: loadUpdateMe }] = useUpdateMeMutation();
  const [idModalDel, setIdModalDel] = useState(null);

  useEffect(() => {
    if (data) {
      setUsername(data?.username);
      setEmail(data?.email);
      setRole(data?.role);
    }
  }, [data]);

  const handleCancel = () => {
    setEdit(false);
    if (editPass) setEditPass(false);
  };

  const openModalDel = () => {
    setIdModalDel(data?._id);
  };

  const handleUpdate = () => {
    let result = { username, email, role };
    if (password) result = { ...result, password, confPassword };
    updateMe(result)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        setEdit(false);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = (
      <div>
        <Title>
          <Prev />
          Profile {data?.username}
        </Title>
        <div>
          <table className="w-full border-separate">
            <tbody className="text-left">
              <tr>
                <th className="border rounded px-1">username</th>
                <td className="border rounded px-1">
                  {edit ? (
                    <input
                      type="text"
                      autoFocus
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="focus:outline-none"
                    />
                  ) : (
                    <div>{data?.username}</div>
                  )}
                </td>
              </tr>
              <tr>
                <th className="border rounded px-1">email</th>
                <td className="border rounded px-1">
                  {edit ? (
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus:outline-none"
                    />
                  ) : (
                    <div>{data?.email}</div>
                  )}
                </td>
              </tr>
              {edit && (
                <tr>
                  <td colSpan={2}>
                    <button onClick={() => setEditPass((prev) => !prev)} className="underline">
                      {edit && editPass ? "Hide" : "Edit"} password
                    </button>
                  </td>
                </tr>
              )}
              {edit && editPass && (
                <tr>
                  <th className="border rounded px-1 flex items-start">password</th>
                  <td className="border rounded px-1">
                    <input
                      type="password"
                      value={password}
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full mb-1 border-b focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder="confirm password"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                      className="block w-full mb-1 border-b focus:outline-none"
                    />
                  </td>
                </tr>
              )}
              <tr>
                <th className="border rounded px-1">role</th>
                <td className="border rounded px-1">
                  {edit ? (
                    <select
                      name="role"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="focus:outline-none"
                    >
                      <option value="">-role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  ) : (
                    <div>{data?.role}</div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          {edit ? (
            <div className="flex gap-1 mt-2">
              <button
                onClick={handleUpdate}
                className="bg-cyan-500 rounded-lg p-1 w-20 flex items-center justify-center text-white hover:opacity-70"
              >
                {loadUpdateMe ? <PiSpinner className="animate-spin" /> : "save"}
              </button>
              <button onClick={handleCancel} className="bg-gray-500 rounded-lg p-1 w-20 text-white hover:opacity-70">
                cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-1 mt-2">
              <button onClick={() => setEdit(true)} className="bg-cyan-500 rounded-lg p-1 w-20 text-white hover:opacity-70">
                edit
              </button>
              <button
                onClick={openModalDel}
                className="bg-red-500 rounded-lg p-1 w-20 flex items-center justify-center text-white hover:opacity-70"
              >
                delete
              </button>
              <ProfileModalDel item={data} modalId={idModalDel} onClose={() => setIdModalDel(null)} />
            </div>
          )}
        </div>
      </div>
    );
  }
  return content;
};

export default Profile;
