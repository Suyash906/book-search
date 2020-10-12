const express = require('express');
const router = express.Router();
const Book = require('../models/books');


router.post('/', async (req, res, next) => {
    const {
        bookName,
        authorName
    } = req.body;
    if (bookName === "") {
        return res.status(404).json('Invalid Book Name');
    }
    if (authorName === "") {
        return res.status(404).json('Invalid Book Name');
    }
    
    try {
        const bookToBeSaved = {
            bookName,
            authorName
        };

        const newBook = new Book(bookToBeSaved);
        await newBook.save();
        
        res.status(200).json(bookToBeSaved);
        
    } catch (err) {
        console.log(err);
        res.status(401).json('Server Error!!. Please try again later');
    }
});

router.get('/', (req, res, next) => {
    try {
        const query = req.query;
        const options = {
            page:1,
            limit:12 
        }
        if (typeof query.page !== 'undefined' && query.page !== null && query.page !== '') {
            options.page = parseInt(query.page)
        }
    
        if (typeof query.limit !== 'undefined' && query.limit !== null && query.limit !== '') {
            options.limit = parseInt(query.limit)
        }

        let searchObj = {};
        
        if (typeof query.bookName !== 'undefined' && query.bookName !== null && query.bookName !== '') {
            searchObj.bookName = new RegExp(query.bookName, "i")
        }
        Book.paginate(searchObj , options, function(err, result) {
            // console.log(result)
            // result.itemsList [here docs become itemsList]
            // result.paginator.itemCount = 100 [here totalDocs becomes itemCount]
            // result.paginator.perPage = 10 [here limit becomes perPage]
            // result.paginator.currentPage = 1 [here page becomes currentPage]
            // result.paginator.pageCount = 10 [here totalPages becomes pageCount]
            // result.paginator.next = 2 [here nextPage becomes next]
            // result.paginator.prev = null [here prevPage becomes prev]
            // result.paginator.slNo = 1 [here pagingCounter becomes slNo]
            // result.paginator.hasNextPage = true
            // result.paginator.hasPrevPage = false
            res.status(200).json(result);
        });
    } catch(err) {
        const responseObject = {
            success: false,
            docs:[],
            result:`Server error`
        }
        res.status(500).json(responseObject);
    }
});

module.exports = router;