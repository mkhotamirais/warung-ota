import { FaCheck, FaPenToSquare, FaTrashCan, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setAdmCatEdit } from "../../../app/features/basicSlice";
import { useState } from "react";
import { useUpdateCategoryMutation } from "../../../app/api/categoryApiSlice";
import AdmCatModalDel from "./AdmCatModalDel";
import toast from "react-hot-toast";
import { PiSpinner } from "react-icons/pi";

const AdmCatItems = ({ item }) => {
  const dispatch = useDispatch();
  const { admCatEdit } = useSelector((state) => state.basic);
  const [name, setName] = useState("");
  const [idCatDel, setIdCatDel] = useState(null);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const handleSetEdit = () => {
    setName(item?.name);
    dispatch(setAdmCatEdit(item?._id));
  };
  const handleOpenModalDel = () => {
    setIdCatDel(item?._id);
  };
  const handleCancel = () => {
    setName(item?.name);
    dispatch(setAdmCatEdit(null));
  };
  const handleSave = () => {
    updateCategory({ id: item?._id, name })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        dispatch(setAdmCatEdit(null));
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <div className="flex justify-between gap-2 border rounded p-1">
      {admCatEdit === item?._id ? (
        <input
          type="text"
          autoFocus={true}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus:outline-none w-full bg-inherit capitalize"
        />
      ) : (
        <div onClick={handleSetEdit} className="w-full hover:cursor-text capitalize">
          {item?.name}
        </div>
      )}
      {admCatEdit === item?._id ? (
        <div className="flex gap-3">
          <button onClick={handleSave} className="text-green-500">
            {isLoading ? <PiSpinner className="animate-spin" /> : <FaCheck />}
          </button>
          <button onClick={handleCancel} className="text-red-500">
            <FaXmark />
          </button>
        </div>
      ) : (
        <div className="flex gap-3">
          <button onClick={handleSetEdit} className="text-green-500">
            <FaPenToSquare />
          </button>
          <button onClick={handleOpenModalDel} className="text-red-500">
            <FaTrashCan />
          </button>
          <AdmCatModalDel item={item} modalId={idCatDel} onClose={() => setIdCatDel(null)} />
        </div>
      )}
    </div>
  );
};
AdmCatItems.propTypes;
export default AdmCatItems;
