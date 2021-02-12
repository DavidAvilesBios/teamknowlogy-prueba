var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var adnSchema = new Schema({
    adn: { type: String, required: [true, 'El adn es necesario'] },
    mutado: {type: Boolean, default: false}
});


module.exports = mongoose.model('Adns', adnSchema);