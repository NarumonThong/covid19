const router = require('express').Router();
const service = require('../services/covid');


// แสดงข้อมูล
router.get('/',async (req, res) => {
    try {
        res.json(await service.find(req.query));
        // res.json({ message: "aaa"});
    }
    catch (ex) { res.error(ex); }
});

// เพิ่มข้อมูล
router.post('/', async (req, res) => {
    // res.json({ message: await service.onCreate()});
    try {
        res.json({ message: await service.onCreate()});
    }
    catch (ex) { res.error(ex); }
    // res.json({ message: "aaa"});
});



module.exports = router;