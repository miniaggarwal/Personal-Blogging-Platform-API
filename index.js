import {mongoose} from "mongoose";
import config from "./src/config/index.js";

import app from "./src/app.js"


//dB Connection


mongoose.connect(config.DB_URL).then((result)=>{
    console.log("dB Connected");

}).catch((err)=>{
    console.log(err);
})




//App listen
app.listen(config.PORT, ()=>{
    console.log(`App listening to PORT : ${config.PORT}`);
    
})




