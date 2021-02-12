let contadorMutacionesEncontradas = 0
//Este es el metodo que determina si el arreglo está mutado o no,
// lo primero que se hace es validar de forma horizontal la matrix, en este caso es validar como viene normalmente el arreglo para ver si tiene mutaciones
// lo segundo es con un contador es ir contando las letras que va encontrando, si viene la misma letra consecutiva 4 veces, va y suma 1 al contador de mutaciones
// si el contador de mutaciones llega a 2, entonces tira break y convierte la variable mutatation en true, señal de que encontro 2 mutaciones en el adn y no se recorre el arreglo
// de forma vertical, ni diagonal, retorna un true, en dado caso contrario va a recorrer el metodo readVerticalMatrix y diagonalup en busca de mutaciones.
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

/*  este metodo lo que hace es recorrer la matrix de forma vertical en busca de mutaciones, en dado caso de encontrarlas
hace lo mismo que el anterior metodo, alimenta un contador con las letras que va encontrando y si encuentra 4 letras iguales de forma consecutiva, alimenta
la variable contador de mutaciones encontradas, hasta que este contador de un total de 2, es cuando el arreglo tiene mutaciones.*/
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
/* este metodo se encarga de encontrar de forma diagonal ya sea de arriba hacia abajo o de abajo hacia arriba
combinaciones de letras mayores a 4 para que puedan ser examinadas para encontrar permutaciones.*/
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

/*  este metodo lo que hace es recorrer la matrix de forma diagonal en busca de mutaciones, en dado caso de encontrarlas
hace lo mismo que el anterior metodo, alimenta un contador con las letras que va encontrando y si encuentra 4 letras iguales de forma consecutiva, alimenta
la variable contador de mutaciones encontradas, hasta que este contador de un total de 2, es cuando el arreglo tiene mutaciones.*/
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
//este metodo concatena el arreglo dado con las combinaciones de letras para crear un string con todas las combinaciones
// y así guardar el string en la base de datos en mongo
function contenarAdn(array) {
    let adn = "";
    for (let registro of array) {
        adn += registro;
    }

    return adn;
}

//Este metodo valida si la estructura de las cadenas vienen iguales, en dado de que una cadena no tenga la misma estructura que las demas
// no dejará entrar a validar el adn

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
//Este metodo valida si la estructura de las cadenas tienen las letras requeridas, en dado caso de no tener las estructuras correctas,
//no entrará a validar el adn
const isTypoValid = (array) => {

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