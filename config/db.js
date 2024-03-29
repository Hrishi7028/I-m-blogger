require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')

module.exports = connection = async () => {
    try {
        const response = await mongoose.connect(process.env.DATABASE_KEY, { useNewUrlParser: true,useUnifiedTopology:true ,useFindAndModify: false})
        console.log("database connection established successfully");
    } catch (error) {
        console.log(error);
    }
}