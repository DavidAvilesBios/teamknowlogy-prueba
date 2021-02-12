let contadorMutacionesEncontradas = 0
function hasMutation(array) {
    let matrix = [];
    let letra = '';
    let contador = 0;
    let mutation = false;
    contadorMutacionesEncontradas = 0
    for (let secuencia of array) {
        contador = 0;
        letra = secuencia.split('')[0];
        for (let letraSecuencia of secuencia.split('')) {
            if (letra === letraSecuencia) {
                contador++
                if(contador === 4){
                    contador = 0
                    contadorMutacionesEncontradas++
                    if(contadorMutacionesEncontradas > 1){
                       mutation = true
                       break;
                    }
                  }
            } else {
                contador = 1;
                letra = letraSecuencia;
            }
        }
        if (mutation) {
            break;
        }
        matrix.push(secuencia.split(''))
    }
    if (!mutation) {
        mutation = readVerticalMatrix(matrix);
    }
    if (!mutation) {
        mutation = diagonalUp(diagonal(array, true));
        if (!mutation) {
            mutation = diagonalUp(diagonal(array, false));
        }
    }
    return mutation;
}


function readVerticalMatrix(matrix) {
    mutation = false;
    for (let i = 0; i < matrix.length; i++) {
        letra = matrix[0][i]
        contador = 0;
        for (let j = 0; j < matrix[0].length; j++) {
            if (letra === matrix[j][i]) {
                contador++
                if(contador === 4){
                    contador = 0
                    contadorMutacionesEncontradas++
                    if(contadorMutacionesEncontradas >1){
                       mutation = true
                       break;
                    }
                  }
            } else {
                contador = 0;
                letra = matrix[j][i];
            }
        }

        if (mutation) {
            break;
        }

    }
    return mutation;

}

function diagonal(array, bottomToTop) {
    var Ylength = array.length;
    var Xlength = array[0].length;
    var maxLength = Math.max(Xlength, Ylength);
    var temp;
    var returnArray = [];
    for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
        temp = [];
        for (var y = Ylength - 1; y >= 0; --y) {
            var x = k - (bottomToTop ? Ylength - y : y);
            if (x >= 0 && x < Xlength) {
                temp.push(array[y][x]);
            }
        }
        if (temp.length > 0) {
            returnArray.push(temp.join(''));
        }
    }
    return returnArray.filter((e) => e.length > 3);
}

function diagonalUp(array) {
    mutation = false;
    for (let secuencia of array) {
        contador = 0;
        letra = secuencia.split('')[0];
        for (let letraSecuencia of secuencia.split('')) {
            if (letra === letraSecuencia) {
                contador++
                if(contador === 4){
                    contador = 0
                    contadorMutacionesEncontradas++
                    if(contadorMutacionesEncontradas >1){
                       mutation = true
                       break;
                    }
                  }
            } else {
                contador = 1
                letra = letraSecuencia;
            }
        }
        if (mutation) {
            break;
        }
    }
    return mutation;
}

function contenarAdn(array) {
    let adn = "";
    for (let registro of array) {
        adn += registro;
    }

    return adn;
}

const isValidMatrix = (matrix) => {

    const validLength = matrix[0].length;

    for (let array of matrix) {
        if (array.length != validLength) {
            return false;
        }

        if (!(isTypoValid(array))) {
            return false;
        }

    }

    return true;

}

const isTypoValid = (array) => {

    //const validTypo = ["A","T","C","G"];

    for (let char of array) {

        if (char != "A" && char != "T" && char != "C" && char != "G") {
            return false;
        }

    }

    return true;
}


module.exports = {
    hasMutation,
    contenarAdn,
    isValidMatrix
}