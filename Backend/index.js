const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const config = require('./configs');
const PORT = 3000;

// ตั้งค่าการ Parse ตัวแปรเมื่อ Client ส่งข้อมูลเข้ามา
server.use(bodyParser.urlencoded({ extended: false}));
server.use(bodyParser.json());
server.use(express.static(`${__dirname}/www`));


// เรียกใช้งาน routes
server.use('/api', require('./routes'));

server.get('*', (req, res) => {
    res.sendFile(`${__dirname}/www/index.html`);

    // res.end(`<h1>Backend server is startd.  3000</h1>`);
});

server.listen(PORT, () => console.log(`Server is started, Port ${PORT}.`))


