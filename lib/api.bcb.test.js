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