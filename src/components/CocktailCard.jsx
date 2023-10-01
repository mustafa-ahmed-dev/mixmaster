import { Link } from "react-router-dom";

import CocktailCardWrapper from "./../assets/wrappers/CocktailCard";
import { routes } from "./../router";

const CocktailCard = ({ drink }) => {
  const { id, name, image, info, glass } = drink;

  return (
    <CocktailCardWrapper>
      <div className="img-container">
        <img src={image} alt={name} className="img" />
      </div>

      <div className="footer">
        <h4>{name}</h4>
        <h5>{glass}</h5>
        <p>{info}</p>
        <Link to={`/${routes.cocktail.route}/${id}`} className="btn">
          details
        </Link>
      </div>
    </CocktailCardWrapper>
  );
};

export default CocktailCard;
