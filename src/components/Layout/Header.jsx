import mealsImage from "../../assets/meals.jpg";

const Header = (props) => {
  return (
    <>
      <header>
        <h1>ReactMeals</h1>
        <button>Cart</button>
      </header>
      <div>
        <img src={mealsImage} />
      </div>
    </>
  );
};

export default Header;
