import { FaCheck, FaPenToSquare, FaTrashCan, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setAdmTagEdit } from "../../../app/features/basicSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { PiSpinner } from "react-icons/pi";
import { useUpdateTagMutation } from "../../../app/api/tagApiSlice";
import AdmTagModalDel from "./AdmTagModalDel";

const AdmTagItems = ({ item }) => {
  const dispatch = useDispatch();
  const { admTagEdit } = useSelector((state) => state.basic);
  const [name, setName] = useState("");
  const [idTagDel, setIdTagDel] = useState(null);
  const [updateTag, { isLoading }] = useUpdateTagMutation();
  const handleSetEdit = () => {
    setName(item?.name);
    dispatch(setAdmTagEdit(item?._id));
  };
  const handleOpenModalDel = () => {
    setIdTagDel(item?._id);
  };
  const handleCancel = () => {
    setName(item?.name);
    dispatch(setAdmTagEdit(null));
  };
  const handleSave = () => {
    updateTag({ id: item?._id, name })
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        dispatch(setAdmTagEdit(null));
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <div className="flex justify-between gap-2 border rounded p-1">
      {admTagEdit === item?._id ? (
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
      {admTagEdit === item?._id ? (
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
          <AdmTagModalDel item={item} modalId={idTagDel} onClose={() => setIdTagDel(null)} />
        </div>
      )}
    </div>
  );
};
AdmTagItems.propTypes;
export default AdmTagItems;
