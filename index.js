const Express = require('express')
const bodyParser = require('body-parser')

const productRoutes = require('./Routes/productRoutes')

const app = Express()



app.use(bodyParser.json())

app.use("/api/product" , productRoutes)


app.listen(4000)