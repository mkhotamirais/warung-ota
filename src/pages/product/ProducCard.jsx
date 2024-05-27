import { Badge } from "../../components/Components";

const ProducCard = ({ item }) => {
  return (
    <div className="border rounded p-1 flex flex-col justify-between gap-1">
      <div>
        <div className="capitalize">{item?.name}</div>
        <div className="text-xl">Rp{item?.price?.toLocaleString("id-ID")}</div>
        <div>Category {item?.category?.name}</div>
        <div className="flex gap-1 mt-3 flex-wrap">
          {item?.tag?.map((itm) => (
            <Badge key={itm?._id}>{itm?.name}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
ProducCard.propTypes;
export default ProducCard;
