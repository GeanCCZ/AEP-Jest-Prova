import {Schema,model} from 'mongoose'


const teamSchema=new Schema(
    {
        trainerName:{ 
            type:String,
            required:true},
        team: [{
            name:{ type:String,
            required:true}
        }]
    }
)

export default model('Team',teamSchema)