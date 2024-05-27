import { useDeleteUserMutation } from "../../../app/api/userApiSlice";
import { Modal } from "../../../components/Components";
import toast from "react-hot-toast";

const AdmUserModalDel = ({ onClose, item, modalId }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const onDel = (e) => {
    e.preventDefault();
    deleteUser(item?._id)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <Modal itemId={item?._id} modalId={modalId} onClose={onClose} type="delete" onDel={onDel} loadDel={isLoading}>
      <div>
        Delete <i>{item?.username}</i>, are you sure?
      </div>
    </Modal>
  );
};
AdmUserModalDel.propTypes;
export default AdmUserModalDel;
