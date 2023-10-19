const mongoose = require('mongoose')

const dbconnection = () => {
    mongoose.connect(process.env.DB_URI)
    .then((conn) => {
        console.log(`Database Connected: ${conn.connection.host}`);
      })
   
   
}
module.exports=dbconnection