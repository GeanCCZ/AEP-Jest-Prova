import { Request,Response } from "express";
import pokemonService from "./pokemonService";
class pokemonController{

    public async ListPokemons(){
        const list= await pokemonService.ListPokemons()
        return list
    }
    public async SavePokemons(){
        const savedPokes= await pokemonService.SavePokemons()
        return savedPokes
    }
    public async PokeMaping(){
        const mapeamento= await pokemonService.PokemonTypeMapping()
        return mapeamento
    }
    public async FindPokeByType(req:Request,res:Response){
        const pokemon= await pokemonService.FindPokeByType(req.params.type)
        return res.json(pokemon)
    }
    public async FindPokeByDexId(req:Request,res:Response){
        const pokemon= await pokemonService.FindPokeByDexId(req.params.id)
        return res.json(pokemon)
    }
    public async FindPokeByName(req:Request,res:Response){
        const pokemon= await pokemonService.FindPokeByName(req.params.name)
        return res.json(pokemon)
    }
    
}

export default new pokemonController()