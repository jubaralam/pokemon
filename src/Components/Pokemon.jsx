import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import Loading from "./Loading";

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [nextURL, setNextURL] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

  const fetchPokemon = async (fetchURl) => {
    // if (!nextUrl) return; // Stop fetching if no next URL
    // setIsFetching(true);
    try {
      const res = await fetch(fetchURl);

      const data = await res.json();
      console.log(data);

      const detailedPokemondata = data.results?.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponse = await Promise.all(detailedPokemondata);

      //   setPokemonData(detailedResponse);
      setPokemonData((prev) => [...prev, ...detailedResponse]);
      setNextURL(data.next);
      console.log(data.next);

      setLoading(false);
      setIsFetching(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
      setIsFetching(false);
    }
  };
  console.log(pokemonData);

  useEffect(() => {
    fetchPokemon(API);

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        fetchPokemon(nextURL);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [search, type, pokemonData, nextURL]);

  let searchData = pokemonData.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  const filterData = pokemonData.filter((currPokemon) =>
    // console.log(currPokemon.types[0].type.name)
    currPokemon.types[0].type.name.toLowerCase().includes(type.toLowerCase())
  );
  searchData = filterData;
  console.log("filter by type", filterData);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
      <div className=" text-center ">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[300px] py-2 px-3 rounded-lg border-gray-400 border-2"
        />

        <select
          name="type"
          id="type"
          onChange={(e) => setType(e.target.value)}
          className="py-2 px-3"
        >
          <option value="">Filter By Type</option>
          <option value="grass">Grass</option>
          <option value="poison">Poison</option>
          <option value="fire">Fire</option>
          <option value="flying">Flying</option>
          <option value="water">Water</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
        </select>
      </div>
      <div className="grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-1 gap-4 my-5  mx-auto px-6">
        {searchData?.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            img={pokemon.sprites.other.dream_world.front_default}
            {...pokemon}
          />
        ))}
      </div>
      {isFetching && <Loading />}
    </div>
  );
};

export default Pokemon;
