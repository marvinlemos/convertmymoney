const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json`

const url = getUrl('11-20-2020')
console.log(url)

axios.get(url).then(res => console.log(res.data.value[0].cotacaoVenda))
