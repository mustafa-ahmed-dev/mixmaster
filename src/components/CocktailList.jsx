import CocktailListWrapper from "./../assets/wrappers/CocktailList";
import CocktailCard from "./CocktailCard";

const CocktailList = ({ drinks }) => {
  if (!drinks || !drinks?.length) {
    return (
      <h4
        style={{
          textAlign: "center",
        }}
      >
        No matching cocktails found...
      </h4>
    );
  }

  return (
    <CocktailListWrapper>
      {drinks.map((drink) => (
        <CocktailCard key={drink.id} drink={drink} />
      ))}
    </CocktailListWrapper>
  );
};

export default CocktailList;
