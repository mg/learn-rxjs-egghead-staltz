// https://egghead.io/lessons/javascript-the-array-foreach-method

const stocks= [
  {symbol: 'XFX', price: 240.22, volume: 23432},
  {symbol: 'TNZ', price: 332.19, volume: 234},
  {symbol: 'JXJ', price: 120.22, volume: 5323},
]

const getStockSymbols1= stocks => {
  let symbols= [],
      counter,
      stock

  for(counter= 0; counter < stocks.length; counter++) {
    stock= stocks[counter]
    symbols.push(stock.symbol)
  }

  return symbols
}

const getStockSymbols2= stocks => {
  let symbols= []
  stocks.forEach(stock => symbols.push(stock.symbol))
  return symbols
}

console.log('VIDEO 01')
console.log(JSON.stringify(getStockSymbols1(stocks)))
console.log(JSON.stringify(getStockSymbols2(stocks)))
