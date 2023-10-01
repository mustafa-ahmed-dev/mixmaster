import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import axios from "./../lib/axios/custom";
import SearchForm from "../components/SearchForm";
import CocktailList from "../components/CocktailList";
import asyncHandler from "./../helpers/asyncHandler";

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get("search") || "";

    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));

    return {
      searchTerm,
    };
  };

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || ""],
    queryFn: async () => {
      const [
        {
          data: { drinks: data },
        },
        error,
      ] = await asyncHandler(
        axios.get("/search.php", {
          params: {
            s: searchTerm,
          },
        })
      );

      if (error) throw error;

      if (!data) return [];

      const drinks = data.map((drink) => {
        const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
          drink;
        return {
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
          info: strAlcoholic,
          glass: strGlass,
        };
      });

      return drinks;
    },
  };
};

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />

      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
