const connection = require('../configs/database');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    find() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tb_states', (error, result) => {
                if (error) return reject(error);
                resolve(result);
                // console.log(result)
            });
        });
    },
    onCreate() {
        return new Promise((resolve, reject) => {

            let status; 
            fetch('https://disease.sh/v3/covid-19/states')
            .then((res) => { 
                status = res.status; 
                return res.json() 
            })
            .then((jsonResponse) => {
                // console.log(jsonResponse);
                function createDataModel(e) {
                    let a = [];
                    
                    a.push(e.state)
                    a.push(e.updated)
                    a.push(e.cases)
                    a.push(e.todayCases)
                    a.push(e.deaths)
                    a.push(e.todayDeaths)
                    a.push(e.recovered)
                    a.push(e.active)
                    a.push(e.casesPerOneMillion)
                    a.push(e.deathsPerOneMillion)
                    a.push(e.tests)
                    a.push(e.testsPerOneMillion)
                    a.push(e.population)
                    
                    return a;
                }

                function getDataRow(jsonResponse) {
                    let arrRows = [];
                    
                    jsonResponse.forEach((e) => {
                        let row = createDataModel(e)
                        arrRows.push(row)
                    })
                    // console.log(arrRows)
                        let query = 'INSERT INTO tb_states (state, updated, cases, todayCases, deaths, todayDeaths, recovered, active, casesPerOneMillion, deathsPerOneMillion, tests, testsPerOneMillion, population) VALUES ?;';
                        
                        connection.query(query, [arrRows], (error, result) => {
                            // inserted rows -> 4
                            resolve(result);
                        });
                }
                
                getDataRow(jsonResponse)
            
            })
            .catch((err) => {
                console.error(err);
            });
            // connection.query('INSERT INTO tb_statestest SET ?', value, (error, result) => {
            //     if (error) return reject(error);
            //     resolve(result);
            // });
            
            // console.log('AAAAA')
            // let query = 'INSERT INTO tb_statestest (state, updated, cases, todayCases, deaths, todayDeaths, recovered, active, casesPerOneMillion, deathsPerOneMillion, tests, testsPerOneMillion, population) VALUES ?;';
            // let params = [
            //     ['a1', 34, 'car sales'],
            //     ['s1', 21, 'gardner'],
            //     ['d1', 17, 'postman'],
            //     ['f1', 55, 'engineer']
            // ];
            // connection.query(query, [jsonResponse], (error, result) => {
            //     // inserted rows -> 4
            //     resolve(result);
            // });
            
        });
    },
};