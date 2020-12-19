const convert = (rate, amount) => {
    return rate * amount
}

const toMoney = value => {
    return parseFloat(value).toFixed(2)
}

module.exports = {
    convert,
    toMoney
}