const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const bookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required : true,
        unique : true
    },
    authorName:{
        type: String,
        required : true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

bookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Book', bookSchema);