const axios = require('axios')

const getUrl = date => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${date}%27&$top=100&$format=json`

const getExchangeRateAPI = url => axios.get(url)
const extractExchangeRate = res => res.data.value[0].cotacaoVenda

const getToday = () => {
    const today = new Date()
    return (today.getMonth() + 1) + '-' + today.getDate()  + '-' + today.getFullYear()
}

const getExchangeRate = async() => {
    try{
        const url = getUrl(getToday())
        const res = await getExchangeRateAPI(url)
        const rate = extractExchangeRate(res)
        return rate 
    }catch(err){
        console.log(err)
        return ''
    }
}

module.exports = {
    getExchangeRateAPI,
    getExchangeRate,
    extractExchangeRate
}