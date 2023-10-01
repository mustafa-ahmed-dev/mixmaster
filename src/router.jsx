import { createBrowserRouter } from "react-router-dom";

import {
  About,
  Cocktail,
  Error,
  Landing,
  NewsLetter,
  SinglePageError,
} from "./pages";
import Layout from "./Layout";

import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsletterAction } from "./pages/NewsLetter";

export const routes = {
  landing: {
    path: "/",
    name: "Home",
  },
  about: {
    path: "/about",
    name: "about",
  },
  cocktail: {
    route: "cocktail",
    path: "/cocktail/:id",
    name: "cocktail",
  },
  error: {
    path: "/error",
    name: "error",
  },
  newsletter: {
    path: "/newsletter",
    name: "newsletter",
  },
};

Object.freeze(routes);

const router = (queryClient) =>
  createBrowserRouter([
    {
      path: routes.landing.path,
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          loader: landingLoader(queryClient),
          errorElement: <SinglePageError />,
        },
        {
          path: routes.cocktail.path,
          element: <Cocktail />,
          errorElement: <SinglePageError />,
          loader: singleCocktailLoader(queryClient),
        },
        {
          path: routes.newsletter.path,
          element: <NewsLetter />,
          action: newsletterAction,
        },
        {
          path: routes.about.path,
          element: <About />,
        },
      ],
    },
  ]);

export default router;
