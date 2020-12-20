const express = require('express')
const path = require('path')
const convert = require('./lib/convert')
const apiBCB = require('./lib/api.bcb')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname,'public')))

app.get('/', async(req, res) => {
    const rate = await apiBCB.getExchangeRate()
    res.render('home', {
        rate
    })
})

app.get('/exchange', (req, res) =>{
    const {rate, amount} = req.query
    if (rate && amount){
        const converted = convert.convert(rate, amount)
        res.render('exchange', {
            error: false,
            rate: convert.toMoney(rate),
            amount: convert.toMoney(amount),
            converted: convert.toMoney(converted)
        })
    }else{
        res.render('exchange',{
            error: 'invalid values'
        })
    }
})

app.listen(3000, err => {
    if (err){
        console.log(err)
    }else{
        console.log('ConvertMyMoney is running...')
    }
})