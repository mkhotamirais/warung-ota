import { useDeleteProductMutation } from "../../../app/api/productApiSlice";
import { Modal } from "../../../components/Components";
import toast from "react-hot-toast";

const AdmProductModalDel = ({ onClose, item, modalId }) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const onDel = (e) => {
    e.preventDefault();
    deleteProduct(item?._id)
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
AdmProductModalDel.propTypes;
export default AdmProductModalDel;
