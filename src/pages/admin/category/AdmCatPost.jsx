import { FaPlus } from "react-icons/fa6";
import { usePostCategoryMutation } from "../../../app/api/categoryApiSlice";
import { PiSpinner } from "react-icons/pi";
import toast from "react-hot-toast";
import { useState } from "react";

const AdmCatPost = () => {
  const [name, setName] = useState("");
  const [postCategory, { isLoading }] = usePostCategoryMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    postCategory({ name })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        setName("");
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full sm:w-1/2 flex gap-1">
      <input
        type="text"
        value={name}
        placeholder="Add category"
        onChange={(e) => setName(e.target.value)}
        className="border rounded focus:outline-cyan-500 p-1 w-full bg-inherit"
      />
      <button className="border rounded flex items-center text-white justify-center w-10 text-sm bg-cyan-500 hover:opacity-70">
        {isLoading ? (
          <div className="text-xl animate-spin">
            <PiSpinner />
          </div>
        ) : (
          <FaPlus />
        )}
      </button>
    </form>
  );
};

export default AdmCatPost;
