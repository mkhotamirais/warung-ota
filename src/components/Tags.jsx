import { useSelector } from "react-redux";

export const Label = ({ id, children }) => (
  <label htmlFor={id} className="capitalize leading-relaxed block">
    {children}
  </label>
);
Label.propTypes;

export const Input = ({ type = "text", id, value, onChange, placeholder, autoFocus, className }) => {
  return (
    <input
      type={type}
      id={id}
      name={id}
      autoComplete={"off"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      className={`${className} border rounded p-1 bg-inherit focus:outline-cyan-500 block mb-2 w-full`}
    />
  );
};
Input.propTypes;

export const Select = ({ children, id, value, onChange, autoFocus, className }) => {
  const { dark } = useSelector((state) => state.basic);
  return (
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      className={`${className} ${
        dark ? "bg-slate-800" : "bg-white"
      } border rounded p-1 focus:outline-cyan-500 block mb-2 w-full`}
    >
      {children}
    </select>
  );
};
Select.propTypes;

export const Textarea = ({ id, value, onChange, placeholder, className }) => {
  const { dark } = useSelector((state) => state.basic);
  return (
    <textarea
      name={id}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`${className} ${
        dark ? "bg-slate-800" : "bg-white"
      } border rounded p-1 focus:outline-cyan-500 block mb-2 w-full`}
    />
  );
};
Textarea.propTypes;
