import moment from "moment";
import { Actions } from "../../../components/Components";
import AdmUserModalDel from "./AdmUserModalDel";
import { useState } from "react";

const AdmUsersTable = ({ item, i }) => {
  const [idModalDel, setIdModalDel] = useState(null);

  return (
    <tr className="*:border *:px-2 text-sm">
      <td>{i + 1}</td>
      <td>{item?.username}</td>
      <td>{item?.role}</td>
      <td className="hidden sm:table-cell">{item?.email}</td>
      <td className="hidden md:table-cell">{moment(item?.createdAt).fromNow()}</td>
      <td className="hidden lg:table-cell">{moment(item?.updatedAt).fromNow()}</td>
      <td>
        <Actions id={item?._id} onDel={() => setIdModalDel(item?._id)} className={`justify-around`} />
        <AdmUserModalDel item={item} modalId={idModalDel} onClose={() => setIdModalDel(null)} />
      </td>
    </tr>
  );
};
AdmUsersTable.propTypes;
export default AdmUsersTable;
