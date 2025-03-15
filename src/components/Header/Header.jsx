import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { TfiLocationPin } from "react-icons/tfi";
import { BiCart } from "react-icons/bi";
import style from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../../components/DataProvider/DataProvider";
import {auth} from "../../Utility/firebase"
import { Link} from "react-router-dom";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
const totalItem = Array.isArray(basket)
  ? basket.reduce((amount, item) => amount + item.amount, 0)
  : 0;
  // const totalItem = basket?.reduce((amount, item) => {
  //     // return item.amount + amount;
  // }, 0);
  return (
    <section className={style.fixed}>
      <div className={style.header__container}>
        <div className={style.logo__container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon logo"
            />
          </Link>
        </div>

        <div className={style.delivery}>
          <span>
            <TfiLocationPin />
          </span>
          <div>
            <p>Delivered to</p>
            <span>Ethiopia</span>
          </div>
        </div>
        <div className={style.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" />
          <BsSearch size={25} />
        </div>
        <div className={style.order__container}>
          <Link to="#" className={style.language}>
            <img
              src="https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-cartoons-american-flag-png-image_867205.jpg"
              alt="flag"
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>
          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello{user?.email?.split("@")}[0]</p>
                  <span onClick={() => auth.signOut}>signOut</span>
                </>
              ) : (
                <>
                  <p>Sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>
          <Link to ="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className={style.cart}>
            <BiCart size={35} />

            <span>{totalItem}</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </section>
  );
}

export default Header;
