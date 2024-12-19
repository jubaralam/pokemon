// import React from 'react'

const PokemonCard = ({ id, name, types, sprite }) => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md hover:shadow-xl trannsition-shadow duration-300">
      <img
        src={sprite}
        alt={name}
        className="w-full h-41 object-contain bg-gray-100 rounded-lg"
      />
      <div className="p-4">
        <h3 className="text-lg  font-bold text-gray-800">
          {" "}
          #{id} {name}
        </h3>
        <div className="flex flex-wrap mt-2">
          <p>{types}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
