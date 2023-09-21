const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)

module.exports = ({ app, express }) => {
    express.appConfig = async () => {

        let storeSession = new MongoDBSession({
            uri: process.env.MONGODB_URI,
            collection: 'LoginSessions',
        })

        app.use(express.static(`${process.cwd()}/views`))

        app.set('view engine', 'ejs')

        app.use(express.json())

        app.use(express.urlencoded({ extended: false }))

        app.use( session({
            secret: process.env.EXPRESS_SESSION_SECRET,
            resave: false,
            rolling: true,
            saveUninitialized: false,
            store: storeSession,
            cookie: {
                maxAge: 6 * 60 * 60 * 1000 // 6 Hours
            },
            name: 'Login_Session'
        }) )

    }
}
