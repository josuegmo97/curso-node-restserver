

// getting-started.js
const mongoose = require('mongoose');


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN
        //     , {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false
        // }
        );

        console.log("Database connect")

    } catch (error) {
        console.log(error)
        throw new Error('Database error')
    }

}

module.exports = {
    dbConnection
}