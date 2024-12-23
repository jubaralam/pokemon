import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import Loading from "./Loading";
import Button from "./Button";

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

  const fetchPokemon = async (fetchURL) => {
    try {
      setLoading(true);
      const res = await fetch(fetchURL);
      const data = await res.json();

      const detailedPokemonData = await Promise.all(
        data.results.map(async (pokemon) => {
          try {
            const res = await fetch(pokemon.url);
            return await res.json();
          } catch {
            return null;
          }
        })
      );

      const validData = detailedPokemonData.filter((pokemon) => pokemon);
      setPokemonData(validData);
      setFilteredData(validData);
      setNextURL(data.next);
      setPrevURL(data.previous);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    if (e.target.value === "Next" && nextURL) fetchPokemon(nextURL);
    if (e.target.value === "Prev" && prevURL) fetchPokemon(prevURL);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch data only on initial render
  useEffect(() => {
    fetchPokemon(API);
  }, []);

  // Filter data when search or type changes
  useEffect(() => {
    let updatedData = pokemonData;

    // Apply filter by type if a type is selected
    if (type) {
      updatedData = updatedData.filter((currPokemon) =>
        currPokemon.types.some((t) =>
          t.type.name.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    // Apply search filter if search input is not empty
    if (search) {
      updatedData = updatedData.filter((currPokemon) =>
        currPokemon.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(updatedData);
  }, [search, type, pokemonData]);

  if (loading) return <Loading />;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div>
      <div className="text-center">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[300px] py-2 px-3 rounded-lg border-gray-400 border-2"
        />
        <select
          name="type"
          onChange={(e) => setType(e.target.value)}
          className="py-2 px-3"
        >
          <option value="">Filter By Type</option>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          {/* Add more types as needed */}
        </select>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 my-5 mx-auto px-6">
        {filteredData.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            img={pokemon.sprites.other.dream_world.front_default}
            {...pokemon}
          />
        ))}
      </div>
      <div className="flex items-center justify-center bg-gray-100">
        <Button text="Prev" onClick={handleClick}  />
        <Button text="Next" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Pokemon;
