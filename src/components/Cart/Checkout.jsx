import classes from "./Checkout.module.css";
const Checkout = (props) => {
  const cancelOrderHandler = (event) => {
    event.preventDefault();
    props.setFoodOrdered(false);
  };
  return (
    <form>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">your Address</label>
        <input type="text" id="street" />
      </div>
      <div className={classes.control}>
        <label htmlFor="post">Postal Code</label>
        <input type="text" id="post" />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <button> Confirm</button>
      <button onClick={cancelOrderHandler}> Cancel</button>
    </form>
  );
};
export default Checkout;
