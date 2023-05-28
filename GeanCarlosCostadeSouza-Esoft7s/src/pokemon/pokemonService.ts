import Pokemon from './pokemonSchema'
import {writeFile,readFile} from 'fs/promises'

class PokemonService{
    public async ListPokemons(){
        try {
            const pokemons=await fetch('http://localhost:3000/pokemons-data')
            const data=await pokemons.json()
            const Lista= data.map((poke)=>{
                    return {
                        Nome:poke.name,
                        Tipo:poke.types.map((type)=>{return type.type.name}),
                        Status:poke.stats.map((atributo)=>{return `${atributo.stat.name} : ${atributo.base_stat}`}),
                        DexId:poke.game_indices[9].game_index,
                        Altura:poke.height,
                        Peso:poke.weight,
                        Moves:poke.moves.map((pokemonMoves) => pokemonMoves.move.name)
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 4)
                    }
                })
        return Lista
        } catch (error) {
            console.error('Erro ao listar os Pokemons',error)
        }
    }

    public async SavePokemons(){
        try {
            const pokemons=await this.ListPokemons()
            await writeFile('localList.json',JSON.stringify(pokemons,null,2))
            await Pokemon.insertMany(pokemons)
            return pokemons
        } catch (error) {
            console.error('erro ao salvar pokemon',error)
        }
    }

    public async PokemonTypeMapping(){
        const ListaPokemon = await readFile('localList.json','utf-8')
        const PokemonsMapeados= JSON.parse(ListaPokemon).reduce((PokemonsMapeados,pokemonAtual)=>{
                PokemonsMapeados[pokemonAtual.Tipo]=PokemonsMapeados[pokemonAtual.Tipo]||[]
                PokemonsMapeados[pokemonAtual.Tipo].push(pokemonAtual)
                PokemonsMapeados[pokemonAtual.Tipo].sort((pokemon1,pokemon2)=>pokemon1.DexId-pokemon2.DexId)
                return PokemonsMapeados
        })
        console.log(typeof(PokemonsMapeados))
        await writeFile('pokemonsPorTipo.json',JSON.stringify(PokemonsMapeados,null,2))
        return PokemonsMapeados
    }

    public async FindPokeByType(type){
        try {
            const team=await Pokemon.find({"Tipo":type})
            return  team
        } catch (error) {
            console.error('Erro ao buscar pokemon pelo tipo',error)
        }
    }
    public async FindPokeByDexId(id){
        try {
            const team=await Pokemon.find({"DexId":id})
            return  team
        } catch (error) {
            console.error('Erro ao buscar pokemon pelo ID',error)
        }
    }
    public async FindPokeByName(name){
        try {
            const team=await Pokemon.find({"Nome":name})
            return  team
        } catch (error) {
            console.error('Erro ao buscar pokemon pelo nome',error)
        }
    }

}

export default new PokemonService()
