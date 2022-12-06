const CategoryRouter = require('./Categorys')
const ProductsRouter = require('./Products')
const UsersRouter = require('./Users')
const InvoicesRouter = require('./Invoices')
const InvoicesDetailRouter = require('./InvoicesDetail')
const RatesRouter = require('./Rates')
const NewsandeventsRouter = require('./Newsandevents')


function route (app) {
    app.use('/',CategoryRouter)
    app.use('/',ProductsRouter)
    app.use('/',UsersRouter)
    app.use('/',InvoicesRouter)
    app.use('/',RatesRouter)
    app.use('/',NewsandeventsRouter)
    app.use('/',InvoicesDetailRouter)
}
module.exports = route