# teamknowlogy-prueba
# Documentación

En la carpeta routes/adn.js se encuentran las rutas que se utilizaran tanto como para validar el adn y subirlo a una base de datos de mongo, como para llamar la ruta get para traer los starts las rutas para llamar todo eso desde el servidor de heroku es: 
// Url valida con un adn que no está mutado
https://teamknowlogy-prueba.herokuapp.com/mutation

{
"adn":["TTTTAA","TACTGC","TAGTGT","CGAAGG","CCCTTA","TCACAG"]
}


Respuesta

{
    "ok": false,
    "err": "el adn no está mutado"
}

// Url valida con un adn que está mutado
https://teamknowlogy-prueba.herokuapp.com/mutation

{
"adn":["TTTTAA","TACTGC","TAGTGT","CGAAGG","CCCATA","TCACAG"]
}

Respuesta 

{
    "ok": true,
    "adn": {
        "mutado": true,
        "_id": "60262c4e2eb3100015bec45b",
        "adn": "TTTTAATACTGCTAGTGTCGAAGGCCCATATCACAG",
        "__v": 0
    },
    "notificacion": "Se agrego correcto"
}

Url para llamar los stats

https://teamknowlogy-prueba.herokuapp.com/stats

{
    "ok": true,
    "count_mutation": 7,
    "count_no_mutation": 7,
    "ratio": 1
}

body invalido 
{
"adn":["TTTTAA","TACTGC","TAGTGT","CGAAGG","CCCATX","TCACAX"]
}

respuesta

{
    "ok": false,
    "err": "Formato de datos no valido"
}


En la carpeta Metodos/metodosMutaciones

Se encuentran todas las funciones utilizadas para hacer todas las validaciones necesarias para ver si el adn esta mutado o no, tales como también las validaciones del body que se encuentren incorrectas. la explicación de cada metodo se encuentra en los metodos y en el archivo.


Para correr el metodo local es muy sencillo, debido a que se solamente se necesita descargar este repositorio y utilizar el comando npm i para descargas todos los modules de node necesarios para la utilización de este proyecto. La base de datos de este proyecto se encuentra en cloud así que no sería necesaria instalar nada para utilizar este proyecto.

Para inicializarlo solamente es requerido correr el comando npm start y tener la aplicación de postman para poder llamar las apis que necesites utilizar tales como:

localhost:3000/stats //metodo get

localhost:3000/mutation //metodo post es necesario mandar un body

https://teamknowlogy-prueba.herokuapp.com/mutation