import mongoose from "mongoose";
import pokemonController from "../pokemon/pokemonController";
import Pokemon from '../pokemon/pokemonSchema'
import pokemonService from "../pokemon/pokemonService";
import {writeFile,readFile} from 'fs/promises'

beforeEach(() => {
    jest.setTimeout(10000);
    mongoose.set("strictQuery", true)
    mongoose.connect("mongodb://0.0.0.0:27017/esoft7s");
  });
  
  afterAll(() => {
    mongoose.connection.close();
  });


  describe("Pokemon Tests", () => {
    test("Tratando as informações", async () => {
      const localRes = await pokemonController.ListPokemons();
      expect(localRes).toBeDefined();
      expect(localRes.length).toBeGreaterThan(0);
      expect(localRes[0]).toHaveProperty("Nome");
      expect(localRes[0]).toHaveProperty("Tipo");
      expect(localRes[0]).toHaveProperty("Status");
      expect(localRes[0]).toHaveProperty("DexId");
      expect(localRes[0]).toHaveProperty("Altura");
      expect(localRes[0]).toHaveProperty("Peso");
      expect(localRes[0]).toHaveProperty("Moves");
    });
  
    test("1-B Json", async () => {
      const pokemon = await pokemonController.SavePokemons();
      const data = pokemon.map((poke) => ({
        Nome: poke.Nome,
      }));
      const localList = await readFile("localList.json", "utf-8");
      const localRes = JSON.parse(localList);
      const readPokeJson = localRes.map((poke) => ({
        Nome: poke.Nome,
      }));
      expect(data).toStrictEqual(readPokeJson);
    });
  
    test("1-B Mongo", async () => {
        const localList = await readFile("localList.json", "utf-8");
      const localRes = JSON.parse(localList);
      const pokes = localRes.map((pokemon) => ({
        Nome: pokemon.Nome,
      }));

      const pokemons = await Pokemon.find({}).limit(pokes.length);
      const pokeNome = pokemons.map((poke) => ({
        Nome: poke.Nome,
      }));
      
      expect(pokeNome).toEqual(pokes);
    });
  
    test("questão 2", async () => {
      const pokemon = await readFile("pokemonsPorTipo.json", "utf-8");
      const poke = JSON.parse(pokemon);
      for (const type of poke) {
        const pokemonType = poke[type];
        const dexNumbers = pokemonType.map((pokemon) => pokemon.pokeIndex);
        expect(dexNumbers).toEqual([...dexNumbers].sort((a, b) => a - b));
      }
    });
    test("questõa 4", async () => {
      const type = "grass";
      const pokemon = await pokemonService.FindPokeByType(type);
      expect(pokemon).toBeDefined();
      expect(Array.isArray(pokemon)).toBe(true);
    });
  
    test("questão 6", async () => {
      const Nome = "Gengar"
      const pokemon = await pokemonService.FindPokeByName(Nome);
      expect(pokemon).toBeDefined();
      expect(Array.isArray(pokemon)).toBe(true);
    });
  });
  