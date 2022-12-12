import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = (props) => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals
        mealsData={props.mealsData}
        err={props.err}
        isLoading={props.isLoading}
      />
    </>
  );
};
export default Meals;
