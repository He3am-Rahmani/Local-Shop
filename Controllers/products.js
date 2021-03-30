let products = [{title:'Product 1',amount:55}, {title:'Product 2',amount:65}, {title:'Product 3',amount:75}, {title:'Product 4',amount:85}];

const getProducts = (req, res, next) => {
  res.json(products);
};

const addProduct = (req,res,next)=>{
    const title = req.body.title
    const amount = req.body.amount

    const product = {
        title: title,
        amount:amount
    }


    products.push(product)

    res.json('Message : Product Added Successfully')

}

exports.GETProducts = getProducts
exports.POSTProducts = addProduct