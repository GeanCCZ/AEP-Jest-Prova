import { read, write } from "./fileUtils.js";

export class RequestDataApi {
  async getAllPokeUrl() {
    const pokeApiResponse = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );

    pokeApiResponse.json().then((result) => {
      write("allPokeUrl.json", result.results);
    });
  }

  async fetchAllPokemonData() {
    const allPokemonUrl = await read("allPokeUrl.json");

    const pokeList = allPokemonUrl.map(async (pokeLink) => {
      let url = pokeLink.url.toString();

      const response = await fetch(url);
      const result = await response.json();

      return result;
    });

    const pokeArr = await Promise.all(pokeList);

    write("pokedex.json", pokeArr);
  }
}
