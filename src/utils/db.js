import dotenv from 'dotenv'
dotenv.config();
import mongoose from 'mongoose';

//this was added becaause there is some problme with node 24+ versions and dns error occurs
import dns from 'dns'
dns.setServers(['8.8.8.8']);

async function connectDb(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected....");
    }catch(err){
        console.log("cannot connect Database");
        console.log(err);
    }
}
export default connectDb;