import toast from "react-hot-toast";
import { useDeleteMeMutation } from "../../app/api/authApiSlice";
import { Modal } from "../../components/Components";
import { useNavigate } from "react-router-dom";

const ProfileModalDel = ({ item, modalId, onClose }) => {
  const [deleteMe, { isLoading }] = useDeleteMeMutation();
  const navigate = useNavigate();
  const onDel = (e) => {
    e.preventDefault();
    deleteMe()
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
    <Modal itemId={item?._id} modalId={modalId} onClose={onClose} type={"delete"} loadDel={isLoading} onDel={onDel}>
      <div className="my-3">
        Delete <i>{item?.username}</i>, are you sure?
      </div>
    </Modal>
  );
};
ProfileModalDel.propTypes;

export default ProfileModalDel;
