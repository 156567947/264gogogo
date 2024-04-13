import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";
const reqConfig = {};
export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", reqConfig, []);
  if (isLoading) {
    return <p className="center ">Loading...</p>;
  }
  if (!loadedMeals) {
    return <p>No meals found</p>;
  }
  if (error) {
    console.log(error);
    return <Error title={"failed to fetch meals"} message={error} />;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}
