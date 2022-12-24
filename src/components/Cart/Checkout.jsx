import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
const Checkout = (props) => {
  const cancelOrderHandler = (event) => {
    event.preventDefault();
    props.setFoodOrdered(false);
  };

  const enteredNameRef = useRef();
  const enteredPostalCodeRef = useRef();
  const enteredStreetRef = useRef();
  const enteredCityRef = useRef();

  const [formInputValidaty, setFormInputValidaty] = useState({
    nameIsValid: true,
    streetIsValid: true,
    postalCodeIsValid: true,
    cityIsValid: true,
  });

  const confirmHandler = (event) => {
    const isEmpty = (value) => value.trim().length === 0;

    const isFive = (value) => value.trim().length === 5;

    event.preventDefault();
    const enteredName = enteredNameRef.current.value;
    const enteredPostalCode = enteredPostalCodeRef.current.value;
    const enteredCity = enteredCityRef.current.value;
    const enteredStreet = enteredStreetRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredPostalCodeIsValid = isFive(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);

    const formIsValid =
      enteredNameIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid;

    setFormInputValidaty({
      nameIsValid: enteredNameIsValid,
      streetIsValid: enteredStreetIsValid,
      postalCodeIsValid: enteredPostalCodeIsValid,
      cityIsValid: enteredCityIsValid,
    });
    console.log(formIsValid);
    if (!formIsValid) {
      return;
    } else
      console.log(
        `your values are ${
          (enteredName, enteredCity, enteredPostalCode, enteredStreet)
        }`
      );
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputValidaty.nameIsValid ? "" : "invalid"
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={enteredNameRef} />
      </div>
      {!formInputValidaty.nameIsValid && <p>please enter a valid name!</p>}
      <div
        className={`${classes.control} ${
          formInputValidaty.streetIsValid ? "" : "invalid"
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={enteredStreetRef} />
      </div>
      {!formInputValidaty.streetIsValid && <p>please enter a valid Street!</p>}
      <div
        className={`${classes.control} ${
          formInputValidaty.postalCodeIsValid ? "" : "invalid"
        }`}
      >
        {" "}
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={enteredPostalCodeRef} />
      </div>
      {!formInputValidaty.postalCodeIsValid && (
        <p>please enter a valid 5 num Postal Code!</p>
      )}

      <div
        className={`${classes.control} ${
          formInputValidaty.cityIsValid ? "" : "invalid"
        }`}
      >
        {" "}
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={enteredCityRef} />
      </div>
      {!formInputValidaty.cityIsValid && <p>please enter a valid City</p>}
      <div className={classes.actions}>
        <button type="button" onClick={cancelOrderHandler}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
