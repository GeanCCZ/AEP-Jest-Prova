import teamService from "./teamService";
import { Request,Response } from "express";


class teamController{
    public async CreateTeam(req:Request,res:Response){
        const team= await teamService.CreateTeam(req.body)
        return res.json(team)
    }
    public async FindTeamByName(req:Request,res:Response){
        const team= await teamService.FindTeamByName(req.params.name)
        return res.json(team)
    }
    public async FindTeams(){
        const team= await teamService.FindTeams()
        return team
    }
    public async UpdTeam(req:Request,res:Response){
        const team= await teamService.UpdTeam(req.params.name,req.body)
        return res.json(team)
    }
    public async DeleteTeamByName(req:Request,res:Response){
        const team= await teamService.DeleteTeamByName(req.params.name)
        return res.json(team)
    }
    public async FindLocalTeam(req:Request,res:Response){
        const team= await teamService.FindLocalTeam()
        return res.json(team)
    }
    public async UpdTeamLocal(req:Request,res:Response){
        const team= await teamService.UpdTeamLocal(req.body)
        return res.json(team)
    }
     
}

export default new teamController();