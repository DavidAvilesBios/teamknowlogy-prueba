const express = require('express');

let app = express();

let {
    hasMutation,
    contenarAdn,
    isValidMatrix
} = require('../metodos/metodoMutaciones');
let Adn = require('../models/adn');

//aquí se agrega la ruta para ver si un adn tiene mutación o no
// cuenta con las validaciones correspondientes, de que en el body de la petición venga el adn
// y que tenga la estructura correspondiente, también se agregan los modelos para subir la respuesta en dado caso de tener mutación o no
// se subirá a un repositorio online de base de datos de mongo(MongoAtlas)
app.post('/mutation', (req, res) => {
    let body = req.body;
    if (body.adn) {
        if (Array.isArray(body.adn)) {
            if (isValidMatrix(body.adn)) {
                const respuesta = hasMutation(body.adn);
                if (respuesta) {
                    let adn = new Adn({
                        adn: contenarAdn(body.adn),
                        mutado: true
                    });

                    adn.save((err, adnDB) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                err
                            });
                        }

                        if (!adnDB) {
                            return res.status(400).json({
                                ok: false,
                                err
                            });
                        }

                        res.status(200).json({
                            ok: respuesta,
                            adn: adnDB,
                            notificacion: 'Se agrego correcto'
                        });
                    });
                } else {

                    let adn = new Adn({
                        adn: contenarAdn(body.adn),
                        mutado: false
                    });

                    adn.save((err, adnDB) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                err
                            });
                        }

                        if (!adnDB) {
                            return res.status(400).json({
                                ok: false,
                                err
                            });
                        }

                        res.status(403).json({
                            ok: respuesta,
                            err: 'el adn no está mutado'
                        });
                    });
                }
            } else {
                return res.status(500).json({
                    ok: false,
                    err: 'Formato de datos no valido'
                })
            }
        } else {
            return res.status(500).json({
                ok: false,
                err: 'Es necesario que sea un arreglo'
            })
        }
    } else {
        return res.status(500).json({
            ok: false,
            err: 'Estructura del objeto incorrecta(sin adn)'
        })
    }

});

//Está es la ruta para verificar los total de adn mutados y los no mutados que se encuentran en la base de datos
app.get('/stats', async (req, res) => {

    const mutados = await Adn.countDocuments({
        mutado: true
    }).exec();
    const nomutados = await Adn.countDocuments({
        mutado: false
    }).exec();
    res.json({
        ok: true,
        count_mutation: mutados,
        count_no_mutation: nomutados,
        ratio: mutados / nomutados
    });


});





module.exports = app;