const mongoose = require('mongoose')

module.exports = ({ app, express }) => {
    express.mongooseLogin = async () => {

        mongoose.set('strictQuery', false)
        mongoose.Promise = global.Promise

        if (process.env.BUILD_MODE === 'production') {
            mongoose.connect(process.env.MONGODB_URI)
        } else if (process.env.BUILD_MODE === 'development') {
            mongoose.connect(process.env.MONGODB_URI_DEV)
        }

        mongoose.connection.on('connected', async () => {
            if (process.env.BUILD_MODE === 'production') {
                console.log(`Connected to Production Database.`)
            } else if (process.env.BUILD_MODE === 'development') {
                console.log(`Connected to Development Database.`)
            }
        })

        mongoose.connection.on('disconnected', async () => {
            if (process.env.BUILD_MODE === 'production') {
                console.log(`Disconnected from Production Database.`)
            } else if (process.env.BUILD_MODE === 'development') {
                console.log(`Disconnected from Development Database.`)
            }
        })

        mongoose.connection.on('err', async (error) => {
            console.log(error)
        })
        
    }
}
