import toast from "react-hot-toast";
import { Modal } from "../../../components/Components";
import { useDeleteTagMutation } from "../../../app/api/tagApiSlice";

const AdmTagModalDel = ({ onClose, item, modalId }) => {
  const [deleteTag, { isLoading }] = useDeleteTagMutation();
  const onDel = (e) => {
    e.preventDefault();
    deleteTag(item?._id)
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
        Delete <i>{item?.name}</i>, are you sure?
      </div>
    </Modal>
  );
};
AdmTagModalDel.propTypes;
export default AdmTagModalDel;
