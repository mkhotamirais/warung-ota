import { FaCircleUser, FaUser } from "react-icons/fa6";
import { Actions } from "../../../components/Components";
import { useState } from "react";
import AdmUserModalDel from "./AdmUserModalDel";

const AdmUsersCard = ({ item }) => {
  const [idModalDel, setIdModalDel] = useState(null);

  return (
    <div className="border rounded p-2">
      <div className="flex items-center gap-2">
        <FaUser />
        {item?.username}
      </div>
      <div className="flex items-center gap-2">
        <FaCircleUser />
        {item?.role}
      </div>
      <Actions id={item?._id} onDel={() => setIdModalDel(item?._id)} className={`gap-3 mt-2 pt-2 border-t`} />
      <AdmUserModalDel item={item} modalId={idModalDel} onClose={() => setIdModalDel(null)} />
    </div>
  );
};
AdmUsersCard.propTypes;
export default AdmUsersCard;
