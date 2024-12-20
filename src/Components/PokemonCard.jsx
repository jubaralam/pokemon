// import React from 'react'

const PokemonCard = ({ id, name, height, img, types,stats }) => {
  // console.log(sprites.other.dream_world.front_default)
  // sprites?.map((url)=> {
  //   console.log(url)
  // })

  return (
    <div className="max-w-xs  bg-white rounded-lg shadow-md hover:shadow-xl trannsition-shadow duration-300 my-5 ">
      <figure className=" curved-edge w-full rounded-lg ">
        <img
          src={img}
          alt={name}
          className="w-[110px] object-contain text-center m-auto py-2"
        />
      </figure>
      <div className="p-4">
        <div className="  bg-green-700 text-center rounded-2xl ">
          <p className="my-1 mx-1 text-white  w-auto ">
       
            {types.map((currType) => currType.type.name).join(", ")}
          </p>
        </div>
        <div>
          <p>Id: #{id}</p>
   
        <h3 className="text-base font-bold text-gray-800">
    
           Name: {name} 
        </h3>
        <div className="flex justify-between">

        <p>Base Stat: <strong> {stats[5].base_stat}</strong> </p>
        <p>Effort: <strong> {stats[5].effort}</strong></p>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default PokemonCard;
