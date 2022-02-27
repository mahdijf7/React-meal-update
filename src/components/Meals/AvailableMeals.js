import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsloading(true);
    setError(null);
    const fetchHandler = async () => {
      try {
        const response = await fetch(
          'https://react-http-1735d-default-rtdb.firebaseio.com/meals.json'
        );
        if (!response.ok) {
          throw new Error('somting went wrong!');
        }
        const data = await response.json();

        const loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadedMeals);
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        setError(error.message);
      }
    };
    fetchHandler();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        {!isLoading && mealsList.length > 0 && <ul>{mealsList}</ul>}
        {!isLoading && mealsList.length === 0 && <p>Food not found.</p>}
        {!isLoading && error && <p>{error}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
