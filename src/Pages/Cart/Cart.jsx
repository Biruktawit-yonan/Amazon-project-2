import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Products/ProductsCard";
import CurrencyFormat from "../../components/CurrencyFormater/CurrencyFormater";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import { Type } from "../../Utility/Action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
function Cart() {
  const [{ basket },dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount; 
  }, 0); 

  

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>No items in your cart</p>
          ) : (
            basket?.map((item, i) => {
              //call back, we have item variable in the basket and we use maping method to return to render the product in the product card.
              return (
                <section className={classes.cart__product}>
                  <ProductCard //pass by props
                    key={i}
                    product={item} //product prop, pass the items in product.
                    renderDesc={true}
                    renderAdd={false} //we don't need renderAdd in cart page so we will make it false.
                    flex={true}
                  />

                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={20} />
                    </button>

                    <span>{item.amount}</span>

                    <button
                      className={classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
              {/* total amount in line 12 is passed here to get the total amount in the currency format. */}
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to Check out</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
