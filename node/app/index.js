const express = require('express')
const mysql = require('mysql2')

const app = express()
const port = 3000
const config = {
    host: 'mysql',
    user: 'root',
    password: 'rootpwd',
    database: 'peopledb'
};

app.get('/', (req, res) => {
    const connection = mysql.createConnection(config)

    connection.query('SELECT name FROM people', (error, results, fields) => {
        if (error) {
            console.error(error);
            throw error;
        }

        console.log('Results: ', results);

        res.send(`<h1>Full Cycle Rocks!</h1>
                     <ol>
                         ${!!results.length ? results.map(person => `<li>${person.name}</li>`).join('') : 'No records available!' }
                     </ol>`)
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})