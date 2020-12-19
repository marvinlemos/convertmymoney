const convert = require('./convert')

test('Convert rate 4 and amount 4', () => {
    expect(convert.convert(4,4)).toBe(16)
})


test('Convert rate 0 and amount 4', () => {
    expect(convert.convert(0,4)).toBe(0)
})

test('toMonet converts float', () => {
    expect(convert.toMoney(2)).toBe('2.00')
})

test('toMonet converts string', () => {
    expect(convert.toMoney(3)).toBe('3.00')
})