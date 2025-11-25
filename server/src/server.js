import app from "./app.js"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 5005
app.listen(PORT,  (error)=>{
    if(error){
        console.log('Unable to start server');
    }else{
        console.log(`Server started successfully on port ${PORT}`);
    }
})

