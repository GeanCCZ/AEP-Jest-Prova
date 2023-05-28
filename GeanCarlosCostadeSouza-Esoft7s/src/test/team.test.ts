import teamController from "../team/teamController";
import teamService from "../team/teamService";
import Team from '../team/teamSchema';
import {writeFile,readFile} from 'fs/promises'
import { existsSync } from "fs";
import mongoose from "mongoose";

beforeEach(() => {
    jest.setTimeout(10000);
    mongoose.set("strictQuery", true)
    mongoose.connect("mongodb://0.0.0.0:27017/esoft7s");
  });
  
  afterAll(() => {
    mongoose.connection.close();
  });
  
describe("Team Tests", () => {

    
    const data = {
      trainerName: "Katchau",
      team: [
        { name: "gengar" },
        { name: "gengar" },
        { name: "gengar" },
        { name: "gengar" },
      ],
    };
    test("questão 3A", async () => {
      const team = await teamService.CreateTeam(data);
      const teamData = await readFile("Team.json", "utf-8");
      const Infos = JSON.parse(teamData);
      
      expect(Infos.trainerName).toBe(data.trainerName);
    });
  
    test("questão 3B - Mongo", async () => {
      const team = await teamController.FindTeams();
      const teamData = await Team.find()
      //await readFile("Team.json", "utf-8");

      //const Infos = JSON.parse(teamData);
      expect(teamData).toEqual(team);
    });

    test("questão 3B - Local", async () => {
      const team = await teamService.FindLocalTeam();
      const teamData = await readFile('Team.json','utf-8')
      expect(teamData).toEqual(team);
    });
  
    test("questão 3C - Mongo", async () => {
      const team = await teamService.FindTeamByName(data.trainerName);
      const teamData = await Team.findOne({"trainerName":data.trainerName});
      expect(teamData).toEqual(team);
    });

    test("questão 3D - Local", async () => {
      const newData = {
        trainerName: "Ash",
        team: [
          { name: "bulbasaur" },
          { name: "bulbasaur" },
          { name: "bulbasaur" },
          { name: "bulbasaur" },
          { name: "bulbasaur" },
        ],
      };
      const team = await teamService.UpdTeam(
        data.trainerName,
        newData
      );
      const teams = await teamService.FindTeamByName(data.trainerName);
      //const teamData = await readFile("team.json", "utf-8");
      //const Infos = JSON.parse(teamData);
      expect(team).toEqual(teams);
    });

    test("questão 3D - Local", async () => {
      const newData = {
        trainerName: "Ash",
        team: [
          { name: "bulbasaur" },
          { name: "bulbasaur" },
          { name: "bulbasaur" },
          { name: "bulbasaur" },
          { name: "bulbasaur" },
        ],
      };
      const team = await teamService.UpdTeamLocal(
        newData
      );
      //const teams = await teamService.FindTeamByName(data.trainerName);
      const teamData = await readFile("Team.json", "utf-8");
      //const Infos = JSON.parse(teamData);
      expect(team).toEqual(teamData);
    });
  
    test("questão 3E", async () => {
      const team = "team.json";
      const teamCheck = existsSync(team);
      expect(teamCheck).toBe(true);
    });
  });
  