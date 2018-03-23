const express = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app = express();

var router = express.Router();
const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();


router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/mobile', function (req, res) {
    var queryParameter = req.query;
    const number = phoneUtil.parseAndKeepRawInput(queryParameter.mobile, queryParameter.countrycode);

    var mobile = number.getCountryCode() + number.getRawInput() ;
    var countrycode = phoneUtil.getRegionCodeForNumber(number);
    var isValidNumber = phoneUtil.isValidNumber(number);
    var getRawInput = number.getRawInput();
    var stdCode = number.getCountryCode();

    res.json({
        mobile: mobile,
        countrycode: countrycode,
        isValidNumber: isValidNumber,
        getRawInput: getRawInput,
        stdCode: stdCode
    });
});


app.use('/validate', router);

module.exports = app;