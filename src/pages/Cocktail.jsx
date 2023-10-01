import { Link, useLoaderData, useParams, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import axios from "./../lib/axios/custom";
import asyncHandler from "./../helpers/asyncHandler";

import CocktailWrapper from "./../assets/wrappers/CocktailPage";
import { routes } from "./../router";

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;

    await queryClient.ensureQueryData(getSingleCocktailQuery(id));

    return { id };
  };

const getSingleCocktailQuery = (id) => {
  return {
    queryKey: ["lookup", id],
    queryFn: async () => {
      const [
        {
          data: { drinks: data },
        },
        error,
      ] = await asyncHandler(
        axios.get("/lookup.php", {
          params: { i: id },
        })
      );

      if (error) throw error;

      if (!data?.length) return null;

      const {
        strDrink,
        strDrinkThumb,
        strAlcoholic,
        strCategory,
        strGlass,
        strInstructions,
      } = data[0];

      const ingredients = Object.keys(data[0]).reduce((prev, key) => {
        const value = data[0][key];

        if (key.toLowerCase().includes("ingredient") && value)
          return [...prev, value];

        return prev;
      }, []);

      const result = {
        name: strDrink,
        image: strDrinkThumb,
        info: strAlcoholic,
        category: strCategory,
        glass: strGlass,
        instructions: strInstructions,
        ingredients,
      };

      return result;
    },
  };
};

const Cocktail = () => {
  const params = useParams();
  const { id } = useLoaderData();
  const { data } = useQuery(getSingleCocktailQuery(id));

  if (!data) {
    toast.error("No such a cocktail found!");

    return <Navigate to={routes.landing.path} />;
  }

  const { name, image, info, category, glass, instructions, ingredients } =
    data;

  return (
    <CocktailWrapper>
      <header>
        <Link to={routes.landing.path} className="btn">
          back home
        </Link>

        <h3>{name}</h3>
      </header>

      <div className="drink">
        <img src={image} alt={name} className="img" />

        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients:</span>
            {ingredients.map((ingredient, index) => {
              return (
                <span className="ing" key={index}>
                  {ingredient} {index < ingredients.length - 1 && ", "}
                </span>
              );
            })}
          </p>
          <p>
            <span className="drink-data">instructions:</span>
            {instructions}
          </p>
        </div>
      </div>
    </CocktailWrapper>
  );
};

export default Cocktail;
