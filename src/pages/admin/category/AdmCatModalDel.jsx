import toast from "react-hot-toast";
import { useDeleteCategoryMutation } from "../../../app/api/categoryApiSlice";
import { Modal } from "../../../components/Components";

const AdmCatModalDel = ({ onClose, item, modalId }) => {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const onDel = (e) => {
    e.preventDefault();
    deleteCategory(item?._id)
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
AdmCatModalDel.propTypes;
export default AdmCatModalDel;
