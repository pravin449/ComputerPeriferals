var express = require('express/');
var router = express.Router();
const csv = require('csvtojson')
const csvFilePath = `${__dirname}/../data/test_listings.csv`;


csv()
.fromFile(csvFilePath)
.subscribe((json)=>{
    return new Promise((resolve,reject)=>{
        // Async operation on the json
        // don't forget to call resolve and reject
        resolve();
    })
})

const getRecordsByIndex = (records, currentPage) => {
    let pageSize = 20;
    let totalRecords = records.length;
    // calculate total pages
    let totalPages = Math.ceil(totalRecords / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    const startRecordPosition = pageSize * (currentPage -1);
    const remainingRecords = totalRecords - startRecordPosition;
    pageSize = pageSize < remainingRecords ? pageSize : remainingRecords;
    const finalRecords = records.splice(startRecordPosition, pageSize);
    return {
        records: finalRecords,
        currentPage: currentPage,
        totalRecords: totalRecords,
        startRecord: startRecordPosition + 1,
        endRecord: (startRecordPosition + pageSize),
        totalPages: totalPages
    }
}

const createRecordObject = (records, req) => {
    let recordObject = { 
        records: records,
        currentPage: 1,
        totalRecords: records.length,
        startRecord: 1,
        endRecord: 20,
        totalPages: Math.ceil(records / 20)
    };
    if (req.body && req.body.filterObject) {
        if(Object.keys(req.body.filterObject).length > 0) {
            req.body.filterObject.forEach(filterObj => {
                records = records.filter(item => filterObj.value ? item[filterObj.filterType].includes(filterObj.value) : item);
            });
        }
    }

    if(req.body && req.body.sortIndex) {
        if(req.body.sortIndex == 1) {
            records.sort(function(a, b){return parseFloat(a.price) - parseFloat(b.price)});
        } else if(req.body.sortIndex == 2){
            records.sort(function(a, b){return parseFloat(b.price) - parseFloat(a.price)});
        }
    }
    recordObject.records = records;
    recordObject.totalRecords = records.length;
    if(req.body && req.body.pageIndex) {
        recordObject = getRecordsByIndex(records, req.body.pageIndex);
    }
    return recordObject;
}

router.get('/', async function(req, res, next) {
    var jsonArray = await csv().fromFile(csvFilePath);
    const records = createRecordObject(jsonArray, req);
    res.send(records);
});

router.post('/', async function(req, res, next) {
    var jsonArray = await csv().fromFile(csvFilePath);
    const records = createRecordObject(jsonArray, req);
    res.send(records);
});

module.exports = router;