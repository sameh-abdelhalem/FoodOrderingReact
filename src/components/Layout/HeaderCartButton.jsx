import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnOn, setBtnOn] = useState(false);
  const cartCtx = useContext(CartContext);
  const numOfCartItems = cartCtx.items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  const btnClasses = `${
    btnOn ? `${classes.button} ${classes.bump}` : classes.button
  }`;
  const { items } = cartCtx;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnOn(true);
    const timer = setTimeout(() => {
      setBtnOn(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
