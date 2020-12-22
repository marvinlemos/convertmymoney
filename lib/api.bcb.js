const axios = require('axios')

const getUrl = date => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${date}%27&$top=100&$format=json`

const getExchangeRateAPI = url => axios.get(url)
const extractExchangeRate = res => {
    if (res.data.value.length >0)
        return res.data.value[0].cotacaoVenda
    else
        return -1

}

const ratesCache = {}

const getToday = () => {
    const today = new Date()
    const todayStr = (today.getMonth() + 1) + '-' + today.getDate()  + '-' + today.getFullYear()
    return todayStr
}

const getDate = (date) => {
    const dateStr = (date.getMonth() + 1) + '-' + date.getDate()  + '-' + date.getFullYear()
    return dateStr
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

const getExchangeRateLastDays = async(numDays) => {
    rates = []
    const date = new Date()
    date.setDate(date.getDate() - numDays)
    try{
        for (var n = 0; n < numDays; n++){
            date.setDate(date.getDate() + 1)
            const dateStr = getDate(date)
            if (! ratesCache[dateStr]){ //If we have not read this date so far
                const url = getUrl(dateStr)
                const res = await getExchangeRateAPI(url)
                const rate = extractExchangeRate(res)
                if (rate > -1){
                    rates.push({
                        date: dateStr,
                        rate
                    })
                }
                ratesCache[dateStr] =  rate
            }else{
                rate = ratesCache[dateStr]
                if (rate > 1){
                    rates.push({
                        date: dateStr,
                        rate: ratesCache[dateStr]
                    })
                }
            }
        }
        return rates
    }catch(err){
        console.log(err)
        return rates
    }
}

module.exports = {
    getExchangeRateAPI,
    getExchangeRate,
    getToday,
    getDate,
    getUrl,
    extractExchangeRate,
    getExchangeRateLastDays
}