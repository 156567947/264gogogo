import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch("http://localhost:3000/meals");
      if (!res.ok) {
      }
      const meals = await res.json();
      setLoadedMeals(meals);
    };
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meals) => {
        return <li key={meals.id}>{meals.name}</li>;
      })}
    </ul>
  );
}
