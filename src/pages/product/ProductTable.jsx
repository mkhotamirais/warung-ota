import moment from "moment";

const ProductTable = ({ item, i }) => {
  return (
    <tr className="*:border *:px-2 text-sm">
      <td>{i + 1}</td>
      <td>{item?.name}</td>
      <td>Rp{item?.price?.toLocaleString("id-ID")}</td>
      <td className="hidden md:table-cell">{moment(item?.createdAt).fromNow()}</td>
      <td className="hidden lg:table-cell">{moment(item?.updatedAt).fromNow()}</td>
    </tr>
  );
};
ProductTable.propTypes;
export default ProductTable;
