const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')

test('extractExchangeRate', ()=>{
    const rate = api.extractExchangeRate({
        data: {
            value: [
                {cotacaoVenda: 3.90}
            ]
        }
    })
    
    expect(rate).toBe(3.90)
})

describe('getToday', () => {
    const RealDate = Date

    function mockDate(date) {
        global.Date = class extends RealDate {
            constructor(){
                return new RealDate(date)
            }
        }
    }
    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2019-01-01T12:00:00z')
        const today = api.getToday()
        expect(today).toBe('1-1-2019')

    })

    test('getDate', () => {
        mockDate('2020-01-01T12:00:00z')
        const date = api.getDate(new Date())
        expect(date).toBe('1-1-2020')
    })
})

test('getUrl', () => {
    const url = api.getUrl('1-1-2020')
    expect(url).toBe( 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%271-1-2020%27&$top=100&$format=json')
})