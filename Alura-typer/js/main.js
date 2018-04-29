
var tempoInicial = $("#tempo-digitacao").text();

$(function () { //o mesmo que   $(document).ready(function(parameters) {})
    
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});




function atualizaTamanhoFrase() {
    var frase = jQuery(".frase").text();//pega texto da tag p referenciado pela classe frase
    var numPalavras = frase.split(" ").length ;//quebra a string e espaços
    //console.log(numPalavras); 
    var tamanhoFrase = $("#tamanho-frase"); //pega conteudo da tag span, vazio
    tamanhoFrase.text(numPalavras); //tamanho do array

}

var campo = $(".campo-digitacao");//pega conteudo da classe compo-digitacao, dentro d tag span

function inicializaContadores() {
    //A função on() do jQuery, recebe como parâmetro dois argumentos: O primeiro sendo uma string com o nome do evento que ela vai passar
    //escutar e o segundo uma função, com a ação que ela deve executar quando o evento acontecer.
    campo.on("input", function () { //qdo inserir dados no campo input

        var conteudo = campo.val(); //pega conteudo do campo, referenciado´por campo-digitacao
        var qtdPalavras = conteudo.split(/\s+/).length - 1; //quebra em espacos e obtem qtde de palavras(considera espaços como so um espaço
        $("#contador-palavras").text(qtdPalavras);//coloca  qtdPalavras ta tag<li>  <span id = "#contador-palavras">
        var qtdCaracters = conteudo.length;
        $("#contador-caracteres").text(qtdCaracters);
    });

}

function inicializaCronometro() {//inicia contagem decrescente
  
    campo.one("focus", function () {
        var tempoRestante = $("#tempo-digitacao").text(); //pega conteudo da taga ao ckicar na compo de digitacao
        $("#botao-reiniciar").attr("disabled", true);//desabilita botao reiniciar

        var cronometroID = setInterval(function () { //funcao one, aciona evento uma unica vez
            tempoRestante--; //pega tempo-responte e subtrai a cada segundo que passa
            //  console.log(tempoRestante);
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante <= 0) {


                clearInterval(cronometroID);
                finalizaJogo();//inserePlacar();

            }

        }, 1000);

    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}
function inicializaMarcadores() {//compara frases
    var frase = $(".frase").text(); // pega texto a ser digitado
    campo.on("input", function () {
        var frase = $(".frase").text();
        var digitado = campo.val(); //pega valor digitado
        var comparavel = frase.substr(0, digitado.length);//posicao 0 da string ate tamaho atual digitado
        if (digitado === comparavel) { //compara frase com frase digitada
            campo.addClass("borda-verde"); //correto
            campo.removeClass("borda-vermelho");
        } else
            campo.addClass("borda-vermelho");// errado
        campo.removeClass("borda-verde");
    });

}


$('#botao-placar').click(mostraPlacar);


function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Marcos";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);

    $(".placar").slideDown(500);// se habilitadomostra placar no fim do jojo,se nao habilitado teclar botao verde oara mostrar placar
    scrollPlacar();
}


function novaLinha(usuario, palavras) {
    var linha = $("<tr>");//retorna uma tr com todas as propriedade de um elemnto html
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href", "#").addClass("botao-remover");//cria tag<a>  com link
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    // Icone dentro do <a>
    link.append(icone);//add elemento como ultimo filho

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}
function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();

    linha.fadeOut(1000);// elemento vai ficando transparendo aos poucos, nao remove , apenas fica display none(obs: fadein: aparece, fadetagle:aparece e desaparece)
    setTimeout(function () {//
        linha.remove();
    }, 1000);//tempo deve ser igual ao do fadeout
}



function reiniciaJogo() {
    campo.removeClass("campo-desativado");//remove/desativa  classe QUE atribui FUNDO CINZA
    campo.attr("disabled", false);//disabilita campo de digitaçao
    campo.val("");//limpa campo
    $("#contador-palavras").text("0");//reset contador de palavras
    $("#contador-caracteres").text("0");//reset contador de caracteres
    $("#tempo-digitacao").text(tempoInicial);//reset contador de palavras
    inicializaCronometro();
    // campo.toggleClass("campo-desativado");//remove fundo cinza
    campo.removeClass("borda-vermelho");//remove borda vermelha
    campo.removeClass("borda-verde"); //remove borda verde


}

function mostraPlacar() {
    $(".placar").stop().slideToggle(600);//mostra ou esconde(stop serve clicks simultaneos, animaçao rara no ultimo click) 

}
function scrollPlacar() {//desce o scroll de rolagem e mostra placar atual 
    var posicaoPlacar = $(".placar").offset().top;//posiçao do placa ate o topo

    $("html").animate(
        {
            scrollTop: posicaoPlacar + "px"
        }, 1000);
}


//$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {//consertar : receber todas as frases e selecionar qual vai aparecer 

    Id = $('#frase-id').val();
    console.log('id'+Id);
    $("#spinner").toggle();//mostra redinha no inicio de requizicao 
    $.ajax({
            method: 'get',
            url: "metodGetFrase", //view pertence a este contrloller entao passa-se so o método
            data: { id: Id },//bisca por id, a referencia Id
            success: function(response) {

                console.log('response:' + response);
                //var tempo = response[1].Int32Array;
                var frase = $(".frase");
                frase.text(response[0]); //insere frase retornada pelo ajax na tag com id='frase'

                atualizaTempoInicial(response[1]); //parametro e uma lista.  atualiza tempo ao tracar frase     
                atualizaTamanhoFrase();
            }
        }).fail(function() { //se ajax falhar mostra mensagem erro na tela
            $('#erro').show();
            setTimeout(function() {
                    $("#erro").toggle();
            }, 2000);//mensagem de erro permanece na tela 2000 ms
                
        })
        .always(function() {//escone sppiner ao acabar a requisicao
            $("#spinner").toggle();
        });
}

function sincronizaPlacar() {
    var placar = [];

    var linhas = &("tbody > tr");//pega todas as trs que sao filhas diretas de tbody

}