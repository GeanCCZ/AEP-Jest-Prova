import {Router} from 'express'
import pokemonController from './src/pokemon/pokemonController'
import teamController from './src/team/teamController';

const routes=Router();

routes.get('/SavePokemons',pokemonController.ListPokemons)
routes.get('/MapearPokemons',pokemonController.PokeMaping)
routes.get('/FindPokeByType/:type',pokemonController.FindPokeByType)
routes.get('/FindPokeByDexId/:id',pokemonController.FindPokeByDexId)
routes.get('/FindPokeByName/:name',pokemonController.FindPokeByName)
//Team
routes.post('/CreateTeam',teamController.CreateTeam)
routes.get('/FindTeamByName/:name',teamController.FindTeamByName)
routes.get('/FindTeams',teamController.FindTeams)
routes.put('/UpdTeam/:name',teamController.UpdTeam)
routes.delete('/DeleteByName/:name',teamController.DeleteTeamByName)
export default routes