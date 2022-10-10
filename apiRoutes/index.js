const CategoryRouter = require('./Categorys')
const ProductsRouter = require('./Products')
const UsersRouter = require('./Users')
const InvoicesRouter = require('./Invoices')


function route (app) {
    app.use('/',CategoryRouter)
    app.use('/',ProductsRouter)
    app.use('/',UsersRouter)
    app.use('/',InvoicesRouter)
}
module.exports = route