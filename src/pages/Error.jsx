import { Link, useRouteError } from "react-router-dom";

import ErrorWrapper from "./../assets/wrappers/ErrorPage";
import { routes } from "./../router";

import image from "./../assets/not-found.svg";

const Error = () => {
  const error = useRouteError();

  const getError = () => {
    if (error.status === 404) {
      return (
        <div>
          <img src={image} alt="Not found" />

          <h3>Ohh!</h3>

          <p>We can't seem to find you are looking for</p>

          <Link to={routes.landing.path}>Back {routes.landing.name}</Link>
        </div>
      );
    }

    return (
      <div>
        <h3>Something went wrong</h3>
      </div>
    );
  };

  return <ErrorWrapper>{getError()}</ErrorWrapper>;
};

export default Error;
