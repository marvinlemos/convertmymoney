const axios = require('axios')

const getUrl = date => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${date}%27&$top=100&$format=json`

const getExchangeRateAPI = url => axios.get(url)
const extractExchangeRate = res => res.data.value[0].cotacaoVenda

const getToday = () => {
    const today = new Date()
    const todayStr = (today.getMonth() + 1) + '-' + (today.getDate() - 4)  + '-' + today.getFullYear()
    return todayStr
}

const getExchangeRate = async() => {
    try{
        const today = getToday()
        const url = getUrl(today)
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