import React, { useState } from "react";
import PokemonCard from "./Components/PokemonCard";
const App = () => {
  const [pokemonDate] = useState({
    name: "pokemon",
    id: 105,
    types: "String",
    sprite:
      "https://www.telugutimes.net/wp-content/uploads/public/news/news24206.jpeg",
  });
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center ">Pokemon Card</h1>
      <PokemonCard {...pokemonDate} />
    </div>
  );
};

export default App;
