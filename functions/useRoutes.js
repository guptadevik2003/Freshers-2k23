module.exports = ({ app, express }) => {
    express.useRoutes = async () => {

        // Import Routes
        const apiRoute  = require(`${process.cwd()}/routes/apiRoute`)
        const rootRoute = require(`${process.cwd()}/routes/rootRoute`)

        // Using Routes
        app.use('/api', apiRoute)

        // rootRoute (Always at second last)
        app.use('/', rootRoute)

        // 404 Page (Always at last)
        app.use('*', async (req, res) => { res.send('Page Not Found') })

    }
}
