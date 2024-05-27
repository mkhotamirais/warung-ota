import { useState } from "react";
import { Actions, Badge } from "../../../components/Components";
import AdmProductModalDel from "./AdmProductModalDel";

const AdmProducCard = ({ item }) => {
  const [idModalDel, setIdModalDel] = useState(null);

  return (
    <div className="border rounded shadow-md p-1 flex flex-col justify-between gap-1">
      <div>
        <div className="capitalize font-medium">{item?.name}</div>
        <div className="text-2xl">Rp{item?.price?.toLocaleString("id-ID")}</div>
        <div className="italic">{item?.category?.name}</div>
        <div className="flex gap-1 mt-3 flex-wrap">
          {item?.tag?.map((itm) => (
            <Badge key={itm?._id}>{itm?.name}</Badge>
          ))}
        </div>
      </div>
      <Actions id={item?._id} onDel={() => setIdModalDel(item?._id)} className={`gap-3 mt-2 pt-2 border-t`} />
      <AdmProductModalDel item={item} modalId={idModalDel} onClose={() => setIdModalDel(null)} />
    </div>
  );
};
AdmProducCard.propTypes;
export default AdmProducCard;
