/**
 * 
 * https://www.mercadobitcoin.com.br/api-doc/
 * https://www.mercadobitcoin.com.br/trade-api/
 * 
 */

const axios = require('axios')

module.exports.getValorAtual = () => {
    return new Promise(cb => {

        axios.get(`https://www.mercadobitcoin.net/api/ticker/`)
            .then(response => response.data)
            .then(body => {

                //deu erro na API
                if (!body || !body.ticker)
                    return cb({ err: body })

                
                return cb({
                    compra: body.ticker.buy,
                    venda: body.ticker.sell
                })
            })
            .catch(error => {
                return cb({ err: `Erro chamar URL: ${JSON.stringify(error.message)}` })
            })
    })
}