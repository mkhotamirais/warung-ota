import { Actions, Badge } from "../../../components/Components";
import { useState } from "react";
import AdmProductModalDel from "./AdmProductModalDel";

const AdmProductTable = ({ item, i }) => {
  const [idModalDel, setIdModalDel] = useState(null);

  return (
    <tr className="*:border *:px-1 text-sm">
      <td className="w-10">{i + 1}</td>
      <td className="capitalize">{item?.name}</td>
      <td>Rp{item?.price?.toLocaleString("id-ID")}</td>
      <td className="hidden sm:table-cell">{item?.desc}</td>
      <td className="hidden sm:table-cell">{item?.user?.username}</td>
      <td className="hidden md:table-cell">{item?.category?.name}</td>
      <td className="hidden lg:table-cell">
        <div className="flex flex-wrap gap-1">
          {item?.tag?.map((itm) => (
            <Badge key={itm?._id}>{itm?.name}</Badge>
          ))}
        </div>
      </td>
      <td className="w-auto sm:w-32">
        <Actions id={item?._id} onDel={() => setIdModalDel(item?._id)} className={`justify-around gap-2`} />
        <AdmProductModalDel item={item} modalId={idModalDel} onClose={() => setIdModalDel(null)} />
      </td>
    </tr>
  );
};
AdmProductTable.propTypes;
export default AdmProductTable;
