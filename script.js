// script.js
// Função para imprimir a lista criada
function imprimirLista() {
    // Obtém a tabela
    var tabela = document.getElementById('resultado').querySelector('table');

    // Clona a tabela
    var tabelaImpressao = tabela.cloneNode(true);

    // Remove a última coluna de checkboxes
    var linhas = tabelaImpressao.querySelectorAll('tr');
    linhas.forEach(function(linha) {
        linha.removeChild(linha.lastElementChild);
    });

    // Abre uma nova janela para impressão
    var janelaImpressao = window.open('', '_blank');
    janelaImpressao.document.write('<html><head><title>Lista de Corte</title></head><body>');
    janelaImpressao.document.write('<h1>Lista de Corte</h1>');
    janelaImpressao.document.write(tabelaImpressao.outerHTML);
    janelaImpressao.document.write('</body></html>');
    janelaImpressao.document.close();
    janelaImpressao.print();
}

// Função para calcular a lista de corte
function calcularCorte(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obter valores do formulário
    var largura = parseFloat(document.getElementById('largura').value);
    var altura = parseFloat(document.getElementById('altura').value);
    var profundidade = parseFloat(document.getElementById('profundidade').value);
    var espessura = parseFloat(document.getElementById('espessura').value);
    var numGavetas = parseInt(document.getElementById('numGavetas').value);
    var materialPrincipal = document.getElementById('materialPrincipal').value;
    var frenteColorida = document.getElementById('frenteColorida').value;
    var folgaEntreGavetas = parseFloat(document.getElementById('folgaEntreGavetas').value);
    var largTrava = parseFloat(document.getElementById('largTrava').value);
    var espessuraCorredica = parseFloat(document.getElementById('espessuraCorredica').value);

    // Realizar os cálculos para obter a lista de corte

    // Cálculo para a linha 5
    var dados = (((altura - (2 * espessura) - espessura) + espessura) - ((numGavetas - 1) * folgaEntreGavetas)) / numGavetas;
    var alturaGaveta = (dados < 120) ? dados - 15 : 120;

    // Cálculo para a linha 6
    var larguraGaveta = ((largura - (2 * espessura) - (2 * espessuraCorredica)) - (2 * espessura));
    var dados2 = (((altura - (2 * espessura) - espessura) + espessura) - ((numGavetas - 1) * folgaEntreGavetas)) / numGavetas;
    var alturaGaveta2 = (dados2 < 120) ? dados2 - 15 : 120;

    // Cálculo para a linha 7
    var larguraGaveta3 = largura - espessura;
    var dados3 = (((altura - (2 * espessura) - espessura) + espessura) - ((numGavetas - 1) * folgaEntreGavetas)) / numGavetas;
    var alturaGaveta3 = dados3;

    // Cálculo para a linha 8
    var larguraGaveta4 = larguraGaveta + 20;
    var alturaGaveta4 = ((profundidade - espessura) - 35) - 10;
    // Aqui você pode realizar os cálculos conforme necessário

    // Exibir resultados na página
    var resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <table>
            <tr>
                <th>Qtd</th>
                <th>Grupo</th>
                <th>Largura (mm)</th>
                <th>Altura (mm)</th>
                <th>Espessura (mm)</th>
                <th>Material</th>
                <th>Descrição</th>
            </tr>
            <tr>
                <td>1</td>
                <td>estrutura</td>
                <td>${profundidade}</td>
                <td>${largura}</td>
                <td>${espessura}</td>
                <td>${materialPrincipal}</td>
                <td>Tampo</td>
            </tr>

            <tr>
            <td>2</td>
            <td>estrutura</td>
            <td>${profundidade - espessura}</td>
            <td>${altura - espessura}</td>
            <td>${espessura}</td>
            <td>${materialPrincipal}</td>
            <td>Lateral da Estrutura</td>
        </tr>

        <tr>
            <td>4</td>
            <td>estrutura</td>
            <td>${largura - (2 * espessura)}</td>
            <td>${largTrava}</td>
            <td>${espessura}</td>
            <td>${materialPrincipal}</td>
            <td>Trava da Estrutura</td>
        </tr>
        <tr>
            <td>1</td>
            <td>estrutura</td>
            <td>${largura - 10}</td>
            <td>${altura - 25}</td>
            <td>6</td>
            <td>${materialPrincipal}</td>
            <td>Fundo da Estrutura</td>
        </tr>
        <tr>
        <td>${2 * numGavetas}</td>
        <td>Gavetas</td>
        <td>${(profundidade - espessura) - 35}</td>
        <td>${alturaGaveta}</td>
        <td>${espessura}</td>
        <td>${materialPrincipal}</td>
        <td>Lateral da Gaveta</td>
    </tr>

    <tr>
            <td>${2 * numGavetas}</td>
            <td>Gavetas</td>
            <td>${larguraGaveta}</td>
            <td>${alturaGaveta2}</td>
            <td>${espessura}</td>
            <td>${materialPrincipal}</td>
            <td>Frente da Gaveta</td>
        </tr>


        <tr>
            <td>${numGavetas}</td>
            <td>Gavetas</td>
            <td>${larguraGaveta3}</td>
            <td>${alturaGaveta3}</td>
            <td>${espessura}</td>
            <td>${materialPrincipal}</td>
            <td>Capa da Gaveta</td>
        </tr>

        <tr>
        <td>${numGavetas}</td>
        <td>Gavetas</td>
        <td>${larguraGaveta4}</td>
        <td>${alturaGaveta4}</td>
        <td>6</td>
        <td>${materialPrincipal}</td>
        <td>Fundo da Gaveta</td>
    </tr>

        </table>
    `;
}

// Adicionar evento de submit ao formulário
document.getElementById('formCorte').addEventListener('submit', calcularCorte);
var botaoImprimir = document.createElement('button');
botaoImprimir.textContent = 'Imprimir Lista';
botaoImprimir.addEventListener('click', imprimirLista);
document.body.appendChild(botaoImprimir);

