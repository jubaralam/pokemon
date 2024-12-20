import React, { useState } from "react";
import PokemonCard from "./Components/PokemonCard";
import Pokemon from "./Components/Pokemon";

const App = () => {
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center ">Pokemon</h1>
      <Pokemon />
 
    </div>
  );
};

export default App;
