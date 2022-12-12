import { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import OrderForm from "./components/Form/OrderForm";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [mealsData, setMealsData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://meal-ordering-app-99474-default-rtdb.firebaseio.com/Meals"
      );
      if (!response.ok) {
        throw new Error("something went wrong!!");
      }

      const responseData = await response.json();
      const transformedMeals = [];

      for (const key in responseData) {
        transformedMeals.push({ id: key, ...responseData[key] });
        setMealsData(transformedMeals);
        setIsLoading(false);
      }
    };

    fetchMeals().catch((err) => {
      setIsLoading(false), setErrorMsg(err.message);
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
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header showCart={showCartHandler} />
      <main>
        <Meals mealsData={mealsData} err={errorMsg} isLoading={isLoading} />
      </main>
    </CartProvider>
  );
}

export default App;
