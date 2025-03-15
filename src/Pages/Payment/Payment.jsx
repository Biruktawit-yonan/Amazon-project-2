import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Products/ProductsCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormater/CurrencyFormater";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/Action.type";

//  code -1
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
const totalItem = Array.isArray(basket)
  ? basket.reduce((amount, item) => amount + item.amount, 0)
  : 0;
  // const totalItem = basket?.reduce((amount, item) => {
  //   return item.amount + amount;
  // }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.error?.message ? setCardError(e.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // 1. backend or functions----contact to the client secret

    try {
      setProcessing(true);

      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response);

      const clientSecret = response.data?.clientSecret;
      // 2. client side(react side confirmation)
      const { paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,

        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      // 3.after the confirmation --- order firestore database save and clear bascket

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // the basket will be empty
      dispatch({
        type: Type.EMPTY_BASKET,
      });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
      // alert("payment failed.please try again");
    }
  };
  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment__header}>Checkout {totalItem} items</div>

      {/* payment method */}
      <section className={classes.Payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user && user.email ? user.email : "No email available"}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* Product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* Card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order | </p> <CurrencyFormat value={total} />
                    </span>
                  </div>

                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
