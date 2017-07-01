const mercadobitcoin = require('./lib/mercadobitcoin')
const beep = require('./lib/beep')
//
// ----------------------------------------------------------------------------
//

let inicioVenda = -1
const alarmarQuando = 0.05 //Quando cair ou subir 5%, ser avisado!

//
// ----------------------------------------------------------------------------
//
const run = async () => {
    valorMercadobitcoin = await mercadobitcoin.getValorAtual()
    setTimeout(run, 60000)

    if (valorMercadobitcoin.err) {
        console.log('Deu erro --> ',valorMercadobitcoin.err)
        return
    }

    if (inicioVenda == -1) {
        inicioVenda = valorMercadobitcoin.venda
    }

    if (
        valorMercadobitcoin.venda <= inicioVenda - inicioVenda*alarmarQuando ||
        valorMercadobitcoin.venda >= inicioVenda + inicioVenda*alarmarQuando
    ) {
        beep()
    }

    console.log(`Valor: R$ ${valorMercadobitcoin.venda} --> ${(((valorMercadobitcoin.venda - inicioVenda) / valorMercadobitcoin.venda)*100).toFixed(2)}%`)
}

//
// ----------------------------------------------------------------------------
//
run()