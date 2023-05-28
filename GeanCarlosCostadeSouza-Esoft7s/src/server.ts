import App from '../app'

function main(){
    App.listen(3001,'localhost',()=>{
        console.log('Server running at http://localhost:3001/')
    })
}
main()