import { useState } from "react";
import { Input, Label, Select, Textarea } from "../../../components/Tags";
import { PiSpinner } from "react-icons/pi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Prev, Title } from "../../../components/Components";
import { usePostProductMutation } from "../../../app/api/productApiSlice";
import { useGetTagsQuery } from "../../../app/api/tagApiSlice";
import { useGetCategoriesQuery } from "../../../app/api/categoryApiSlice";

const AdmProductPost = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const { data: tags } = useGetTagsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const handleChangeTag = (e) => {
    setTag((prev) => {
      if (prev.includes(e.target.value)) return prev.filter((item) => item !== e.target.value);
      else return [...prev, e.target.value];
    });
  };

  const [postProduct, { isLoading }] = usePostProductMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, price, desc, tag, category };
    postProduct(data)
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        navigate(-1);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };

  return (
    <div>
      <Title>
        <Prev />
        Post Product
      </Title>
      <form onSubmit={handleSubmit} className="border rounded-lg p-2">
        <Label id="name">name</Label>
        <Input id="name" autoFocus={true} placeholder={"name"} value={name} onChange={(e) => setName(e.target.value)} />
        <Label id="price">price</Label>
        <Input type="number" id="price" placeholder={"price"} value={price} onChange={(e) => setPrice(e.target.value)} />
        <Label id="desc">description</Label>
        <Textarea id="desc" value={desc} placeholder="description" onChange={(e) => setDesc(e.target.value)} />
        <Label id="category">
          category{" "}
          <Link to="/adm-category" className="text-sm underline leading-none">
            Add one
          </Link>
        </Label>
        <Select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-category</option>
          {categories?.map((item) => (
            <option key={item?._id} value={item?._id}>
              {item?.name}
            </option>
          ))}
        </Select>
        <Label id="tag">
          tag{" "}
          <Link to="/adm-tag" className="text-sm underline leading-none">
            Add one
          </Link>
        </Label>
        <div className="flex flex-wrap gap-2 border rounded p-1 w-full mb-2">
          {tags?.map((item) => (
            <div key={item?._id} className="flex gap-1">
              <input type="checkbox" id={item?._id} name="tag" value={item?._id} onChange={handleChangeTag} />
              <label htmlFor={item?._id}>{item?.name}</label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-20 p-1 rounded bg-cyan-500 hover:opacity-70 text-white flex items-center justify-center"
        >
          {isLoading ? (
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
};

export default AdmProductPost;
