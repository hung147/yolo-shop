import React, { useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "~/assets/images/Logo-2.png";
import {
  BiMenuAltLeft,
  BiChevronLeft,
  BiSearch,
  BiUser,
  BiCart,
  BiLogOut,
} from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectUser } from "~/redux/userSlice";
import Button from "~/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "~/features/auth/AuthUser";

const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
  {
    display: "Phụ kiện",
    path: "/accessories",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
];

export default function Header(props) {
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const menuLeft = useRef(null);
  const { logOut } = useContext(AuthContext);

  const menuToggle = () => {
    menuLeft.current.classList.toggle("active");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className="header fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Menu */}
        <div className="header__menu flex items-center">
          {/* Mobile Menu Toggle */}
          <div
            className="header__menu__mobile-toggle text-2xl cursor-pointer md:hidden"
            onClick={menuToggle}
          >
            <BiMenuAltLeft />
          </div>

          {/* Left Menu */}
          <div
            ref={menuLeft}
            className="header__menu__left fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform -translate-x-full transition-transform duration-300 md:relative md:translate-x-0 md:flex md:items-center md:gap-6"
          >
            <div
              className="header__menu__left__close text-2xl cursor-pointer p-4 md:hidden"
              onClick={menuToggle}
            >
              <BiChevronLeft />
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className="header__menu__item header__menu__left__item text-lg font-medium text-gray-700 hover:text-blue-500"
                onClick={menuToggle}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 ${
                      isActive ? "text-blue-500 font-bold" : ""
                    }`
                  }
                >
                  {item.display}
                </NavLink>
              </div>
            ))}
          </div>

          {/* Right Menu */}
          <div className="header__menu__right flex items-center gap-4">
            {currentUser ? (
              <div className="header__menu__right__wrapper flex items-center gap-4">
                <div className="header__menu__item header__menu__right__item text-2xl cursor-pointer">
                  <BiSearch />
                </div>
                <div className="header__menu__item header__menu__right__item relative">
                  <Link to="/cart" className="text-2xl">
                    <BiCart />
                    <div className="cart-quantity absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {props.totalProducts}
                    </div>
                  </Link>
                </div>
                <div className="header__menu__item header__menu__right__item relative">
                  <BiUser className="text-2xl cursor-pointer" />
                  <div className="user__info absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg p-4 w-64">
                    <div className="user__info__wrapper flex items-center gap-4">
                      <div
                        className="user__info__img w-12 h-12 bg-cover bg-center rounded-full"
                        style={{
                          backgroundImage: `url(${currentUser.photoUrl})`,
                        }}
                      ></div>
                      <div className="user__info__content">
                        <div className="user__info__content__name font-bold text-gray-800">
                          {currentUser.name}
                        </div>
                        <div className="user__info__content__signInTime text-sm text-gray-500">
                          {currentUser.lastSignInTime}
                        </div>
                      </div>
                    </div>
                    <Button
                      className="log-out mt-4 w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                      size="sm"
                      onClick={() => logOut()}
                    >
                      <BiLogOut />
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="header__menu__right__wrapper flex items-center gap-4">
                <Button
                  className="btn-signin bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100"
                  size="sm"
                  onClick={() => navigate("/signin")}
                >
                  Đăng nhập
                </Button>
                <Button
                  className="btn-signup bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  size="sm"
                  onClick={() => navigate("/signup")}
                >
                  Đăng ký
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
