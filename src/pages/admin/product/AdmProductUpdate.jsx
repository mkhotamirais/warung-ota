import { useEffect, useState } from "react";
import { Err, Loading, Prev, Title } from "../../../components/Components";
import { Input, Label, Select, Textarea } from "../../../components/Tags";
import { useNavigate, useParams } from "react-router-dom";
import {} from "../../../app/api/userApiSlice";
import toast from "react-hot-toast";
import { PiSpinner } from "react-icons/pi";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../../app/api/productApiSlice";
import { useGetTagsQuery } from "../../../app/api/tagApiSlice";
import { useGetCategoriesQuery } from "../../../app/api/categoryApiSlice";

const AdmProductUpdate = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess, error } = useGetProductByIdQuery(id);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [updateProduct, { isLoading: loadUpdate }] = useUpdateProductMutation();
  const navigate = useNavigate();
  const { data: tags } = useGetTagsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const handleChangeTag = (e) => {
    setTag((prev) => {
      if (prev.includes(e.target.value)) return prev.filter((item) => item !== e.target.value);
      else return [...prev, e.target.value];
    });
  };

  useEffect(() => {
    if (data) {
      setName(data?.name);
      setPrice(data?.price);
      setCategory(data?.category?._id);
      setTag(data?.tag.map((t) => t._id));
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = { id, name, price, category, tag };
    updateProduct(result)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        navigate(-1);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  let content;
  if (isLoading) content = <Loading />;
  else if (isError) content = <Err>{error}</Err>;
  else if (isSuccess) {
    content = (
      <div>
        <Title>
          <Prev />
          Update Product
        </Title>
        <form onSubmit={handleSubmit} className="border rounded-lg p-2">
          <Label id="name">name</Label>
          <Input id="name" autoFocus={true} placeholder={"name"} value={name} onChange={(e) => setName(e.target.value)} />
          <Label id="price">price</Label>
          <Input type="price" id="price" placeholder={"price"} value={price} onChange={(e) => setPrice(e.target.value)} />
          <Label id="desc">description</Label>
          <Textarea id="desc" value={desc} placeholder="description" onChange={(e) => setDesc(e.target.value)} />
          <Label id="category">category</Label>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">-category</option>
            {categories?.map((item) => (
              <option value={item?._id} key={item?._id}>
                {item?.name}
              </option>
            ))}
            <option value="user">User</option>
          </Select>
          <Label id="tag">tag</Label>
          <div className="flex flex-wrap gap-2 border rounded p-1 w-full mb-2">
            {tags?.map((item) => (
              <div key={item?._id} className="flex gap-1">
                <input
                  type="checkbox"
                  id={item?._id}
                  name="tag"
                  checked={tag?.includes(item?._id)}
                  value={item?._id}
                  onChange={handleChangeTag}
                />
                <label htmlFor={item?._id}>{item?.name}</label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-20 p-1 rounded bg-cyan-500 hover:opacity-70 text-white flex items-center justify-center"
          >
            {loadUpdate ? (
              <div className="text-2xl animate-spin">
                <PiSpinner />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    );
  }

  return content;
};

export default AdmProductUpdate;
