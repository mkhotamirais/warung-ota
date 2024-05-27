import {
  FaSun,
  FaMoon,
  FaGithub,
  FaBars,
  FaXmark,
  FaUserShield,
  FaUser,
  FaRightToBracket,
  FaUserGear,
  FaUserGroup,
  FaList,
  FaTags,
  FaUserPlus,
  FaCartShopping,
} from "react-icons/fa6";
import { removeOpenAuth, removeOpenNav, toggleDark, toggleOpenAuth, toggleOpenNav } from "../app/features/basicSlice";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, ScrollRestoration } from "react-router-dom";
import { useGetMeQuery, useSignoutMutation } from "../app/api/authApiSlice";
import toast from "react-hot-toast";

const navMenus = [
  { href: "", text: "home" },
  { href: "product", text: "product" },
];

const authUserMenus = [{ href: "user-profile", text: "profile", icon: <FaUserGear /> }];
const authAdminMenus = [
  { href: "adm-profile", text: "profile", icon: <FaUserGear /> },
  { href: "adm-users", text: "users", icon: <FaUserGroup /> },
  { href: "adm-product", text: "product", icon: <FaCartShopping /> },
  { href: "adm-category", text: "category", icon: <FaList /> },
  { href: "adm-tag", text: "tag", icon: <FaTags /> },
];
const authGuestMenus = [
  { href: "signin", text: "login", icon: <FaRightToBracket /> },
  { href: "signup", text: "register", icon: <FaUserPlus /> },
];

const Header = () => {
  const { dark } = useSelector((state) => state.basic);
  return (
    <>
      <header className={`z-30 ${dark ? "bg-slate-800" : "bg-white"} h-16 sticky top-0 border-b px-3 lg:px-12`}>
        <div className="flex h-full justify-between items-center gap-5">
          <div className="min-w-max flex gap-4">
            <NavBtn />
            <Logo />
          </div>
          <div className="w-full">
            <NavMain />
          </div>
          <div className="flex gap-4 items-center">
            <DarkMode />
            <SourceCode />
            <AuthBtn />
          </div>
        </div>
      </header>
      <NavCollapse />
      <ScrollRestoration />
    </>
  );
};
export default Header;

// auth
const AuthBtn = () => {
  const { data } = useGetMeQuery();
  let content;
  if (data?.role) {
    if (data?.role === "admin") content = <AdminBtn />;
    else if (data?.role === "user") content = <UserBtn />;
    else content = <LoginBtn />;
  } else content = <LoginBtn />;

  return content;
};

const AuthBubble = ({ icon, menus, logoutBtn = true }) => {
  const { dark, openNav, openAuth } = useSelector((state) => state.basic);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (openNav) dispatch(removeOpenNav());
    dispatch(toggleOpenAuth());
  };
  return (
    <div className="relative">
      <button onClick={handleClick} className="text-xl flex">
        {icon}
      </button>
      <div
        className={`z-50 ${dark ? "bg-slate-900" : "bg-slate-50"} ${
          openAuth ? "scale-100" : "scale-0"
        } origin-top-right absolute right-0 top-full translate-y-3 border rounded-lg shadow p-2 px-3 transition-all duration-100`}
      >
        {menus.map((item, i) => (
          <NavLink
            onClick={() => dispatch(removeOpenAuth())}
            to={item.href}
            key={i}
            className={"flex gap-2 items-center hover:text-cyan-500 py-2 border-b rounded"}
          >
            {item.icon}
            {item.text}
          </NavLink>
        ))}
        {logoutBtn && <LogoutBtn />}
      </div>
    </div>
  );
};
AuthBubble.propTypes;

const LoginBtn = () => <AuthBubble icon={<FaRightToBracket />} menus={authGuestMenus} logoutBtn={false} />;
const UserBtn = () => <AuthBubble icon={<FaUser />} menus={authUserMenus} />;
const AdminBtn = () => <AuthBubble icon={<FaUserShield />} menus={authAdminMenus} />;
const LogoutBtn = () => {
  const [signout] = useSignoutMutation();
  const handleClick = () => {
    signout()
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
      })
      .catch((err) => {
        toast.error(err?.data?.message);
      });
  };
  return (
    <a
      onClick={handleClick}
      href="/signin"
      className="flex gap-2 items-center border rounded-lg p-1 px-2 mt-2 bg-slate-500 text-white hover:opacity-70"
    >
      <FaRightToBracket /> Logout
    </a>
  );
};
// nav
const NavBtn = () => {
  const { openNav, openAuth } = useSelector((state) => state.basic);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleOpenNav());
    if (openAuth) dispatch(removeOpenAuth());
  };

  return (
    <button
      onClick={handleClick}
      className={`block sm:hidden text-xl ${openNav ? "rotate-180" : ""} transition-all duration-100`}
    >
      {openNav ? <FaXmark /> : <FaBars />}
    </button>
  );
};

const NavContent = ({ classLink }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeOpenNav());
  };
  return navMenus.map((item, i) => (
    <NavLink onClick={handleClick} to={item.href} key={i} className={`${classLink} hover:text-cyan-500 capitalize`}>
      {item?.text}
    </NavLink>
  ));
};

const NavMain = () => {
  return (
    <div className="hidden sm:block">
      <div className="flex gap-3">
        <NavContent />
      </div>
    </div>
  );
};

const NavCollapse = () => {
  const { dark, openNav } = useSelector((state) => state.basic);
  return (
    <div
      className={`z-50 block sm:hidden ${dark ? "bg-slate-800" : "bg-white"} ${
        openNav ? "scale-y-100" : "scale-y-0"
      } origin-top fixed top-16 w-full border-b shadow rounded-lg p-3 transition-all duration-100`}
    >
      <div className="flex flex-col">
        <NavContent classLink={"py-2 border-b rounded"} />
      </div>
    </div>
  );
};

// logo, source code, dark mode
const Logo = () => {
  return (
    <a href="/" className="flex flex-col gap-1 *:leading-none min-w-max">
      <div className="text-lg">Mkhotami</div>
      <div className="text-sm">Warungota</div>
    </a>
  );
};

const SourceCode = () => {
  return (
    <a href="" className="text-xl">
      <FaGithub />
    </a>
  );
};

const DarkMode = () => {
  const { dark } = useSelector((state) => state.basic);
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(toggleDark())} className="w-5 h-5 text-xl overflow-hidden">
      <FaMoon className={`${dark ? "-translate-y-full" : "translate-y-0"} transition-all duration-100`} />
      <FaSun className={`${dark ? "-translate-y-full" : "translate-y-0"} transition-all duration-100`} />
    </button>
  );
};
