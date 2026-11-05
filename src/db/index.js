import mongoose from "mongoose";



const connectDb = async()=>{
    try {

      const connectionInstance = mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
      console.log(`\n MongoDb connected !! DB HOST: ${connectionInstance}`)

    }catch(err){
      console.log("Error while connecting to database", err.message)
      process.exit(1)
      throw(err)

    }
        
}

export default connectDb