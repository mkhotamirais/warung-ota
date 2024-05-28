import { Actions, Badge } from "../../components/Components";

const ProductTable = ({ item, i }) => {
  return (
    <tr className="*:border *:px-2 text-sm">
      <td>{i + 1}</td>
      <td>{item?.name}</td>
      <td>Rp{item?.price?.toLocaleString("id-ID")}</td>
      <td className="hidden sm:table-cell">{item?.desc}</td>
      <td className="hidden md:table-cell">{item?.category?.name}</td>
      <td className="hidden lg:table-cell">
        <div className="flex flex-wrap gap-1">
          {item?.tag?.map((itm) => (
            <Badge key={itm?._id}>{itm?.name}</Badge>
          ))}
        </div>
      </td>
      <td>
        <Actions id={item?._id} update={false} del={false} className={"mt-2"} />
      </td>
    </tr>
  );
};
ProductTable.propTypes;
export default ProductTable;
