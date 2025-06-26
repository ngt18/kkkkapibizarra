const mysql = require('mysql2/promise');

const dbConfig ={
    host: 'localhost',
    user:'root',
    pass: 'root',
    database: 'clientes_db',
    waitForConenection: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

pool.getConnection()
            .then(connection => {
                console.log('Banco de dados conectado com sucesso!');
                connection.release();
            })
            .catch(error => {
                console.error('Erro ao conectar ao banco de dados:', error.message);
                process.exit(1);
            });

module.exports = pool;