import Team from './teamSchema'
import {writeFile,readFile} from 'fs/promises'
import pokemonSchema from 'src/pokemon/pokemonSchema'

class teamService{
    async CreateTeam(Data){
        try {
        const pokeNames=Data.team.map((poke)=> {return{name:poke.name}})
        
        //const TeamPokes= await pokemonSchema.find({"Nome":{$in:pokeNames}})
        const NewTeam={
            trainerName:Data.trainerName,
            team:pokeNames
        }
        const team = await writeFile('Team.json',JSON.stringify(NewTeam,null,2))
        await Team.create({"trainerName":Data.trainerName,team:Data.team})
        
        
        return team
        } catch (error) {
            console.error('Erro ao criar o time ',error)
        }
    }

    async FindTeamByName(name){
        try {
            const team=await Team.findOne({"trainerName":name})
            return  team
        } catch (error) {
            console.error('Erro ao procura time pelo treinador',error)
        }
    }
    async FindTeams(){
        try {
            const team=await Team.find()
            
            return  team
        } catch (error) {
            console.error('Erro ao buscar os times',error)
        }
    }

    async FindLocalTeam(){
        try {
            const team=await readFile('Team.json','utf-8')
            return  team
        } catch (error) {
            console.error('Erro ao buscar os times',error)
        }
    }
    
    async UpdTeam(name,data){
        try {
            const team=await Team.findOneAndUpdate({"Nome":name},{data},{new:true})
            return  team
        } catch (error) {
            console.error('Erro ao atualizar o time',error)
        }
    }

    async UpdTeamLocal(data){
        try {
            const teamData= await writeFile('Team.json',JSON.stringify(data,null,2))
            const team = await readFile("Team.json", "utf-8");
            return  team
        } catch (error) {
            console.error('Erro ao atualizar o time',error)
        }
    }
     async DeleteTeamByName(name){
        try {
            const team=await Team.findOneAndDelete({"Name":name})
            return  team
        } catch (error) {
            console.error('Erro ao deletar o time',error)
        }
    }
}

export default new teamService();