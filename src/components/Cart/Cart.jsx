import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [foodOrdered, setFoodOrdered] = useState(false);
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const confirmOrderHandler = async (userData) => {
    setIsSubmitting(true);
    console.log(userData);
    await fetch(
      "https://meal-ordering-app-99474-default-rtdb.firebaseio.com/user-data.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const orderFoodHandler = () => {
    setFoodOrdered(true);
  };
  const modalCartData = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {foodOrdered && (
        <Checkout
          onConfirm={confirmOrderHandler}
          setFoodOrdered={setFoodOrdered}
        />
      )}
      {!foodOrdered && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onHideCart}>
            Close
          </button>
          {hasItems && (
            <button className={classes.button} onClick={orderFoodHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isSubmitting && !didSubmit && modalCartData}
      {isSubmitting && <p>Your Order is being Sent...</p>}
      {didSubmit && <p>we received your order and it will be delivered soon</p>}
    </Modal>
  );
};

export default Cart;
