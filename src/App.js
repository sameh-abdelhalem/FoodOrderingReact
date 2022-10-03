import { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import OrderForm from "./components/Form/OrderForm";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [mealsData, setMealsData] = useState([]);
  useEffect(() => {
    fetch(
      "https://meal-ordering-app-99474-default-rtdb.firebaseio.com/Meals.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const transformedMeals = [];

        for (const key in data) {
          transformedMeals.push({ id: key, ...data[key] });
          setMealsData(transformedMeals);
        }
      });
  }, []);
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      <OrderForm></OrderForm>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header showCart={showCartHandler} />
      <main>
        <Meals mealsData={mealsData} />
      </main>
    </CartProvider>
  );
}

export default App;
