const { Pool } = require("pg");

const config = {
    host: "localhost",
    port: 5432,
    database: "repertorio",
    user: "postgres",
    password: "1234",
};
const pool = new Pool(config);

const insertar = async (datos) => {
        const insert = {
            text: "INSERT INTO canciones (titulo, artista, tono) values ($1, $2, $3)",
            values: datos,
        };

        const registro = await pool.query(insert); 
        return registro;
};

const consultar= async () => {

        const result = await pool.query("SELECT * FROM canciones");
        return result;
};

const editar = async (datos) => {
        const consulta = {
            text: 'UPDATE canciones SET titulo = $2, artista = $3, tono = $4 WHERE id = $1 RETURNING *',
            values: datos,
        };
        const result = await pool.query(consulta); 
        
        return result;        
};

const eliminar = async (id) => {
    const result = await pool.query(`DELETE FROM canciones WHERE id = '${id}'`); 
    return result;       
};

module.exports = { insertar, consultar, editar, eliminar }