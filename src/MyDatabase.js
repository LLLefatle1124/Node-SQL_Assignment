// establishing a connection to a database
const {Client} = require("pg");
const client = new Client({
  user: "user",
  host: "localhost",
  database: "MyDatabase",
  password: "pass",
  port: 5432
});

client.connect();

// function to save a new visitor to MyDatabase
const addNewVisitor = async(name, age, visit_date, visit_time, assistant_name, comments) => {
    try {
        let result = await client.query(

        `INSERT INTO visitors(
            visitor_name, 
            visitor_age, 
            date_of_visit, 
            time_of_visit, 
            name_of_assistant, 
            comments)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;`,

        [name, age, visit_date, visit_time, assistant_name, comments]
        
        );

        return result.rows;

    } catch (e) {
        console.log(e);
        throw e;
    }
};

const listAllVisits = async() => {
    const SQL = `SELECT visitor_ID, visitor_name FROM visitors;`
    try {
        query = await client.query(SQL);
        return query.rows;
    } catch (e) {
        throw e;
    }
};

// taking an ID parameter because I need to delete a specific record
const deleteVisit = async(id) => {
    try {
        let deleted = await client.query(`DELETE FROM visitors WHERE visitor_ID=$1;`, [id]);
        return deleted;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

// taking row, a condition and value parameters because I need to know where, when and what am i updating in a record
const updateVisit = async(id, where, value) => {
    try {
        let updated = await client.query(`UPDATE visitors SET ${where}= $2 WHERE visitor_ID=$1;`, [id, value]);
        return updated;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const veiwVisit = async(id) => {
    try {
        const query = await client.query(`SELECT * FROM visitors WHERE visitor_ID=$1;`, [id]);
        return query.rows;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const emptyVisits = async() => {
    try {
        let emptied = await client.query('DELETE FROM visitors;');
        return emptied;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = {
    emptyVisits,
    veiwVisit,
    updateVisit,
    deleteVisit,
    listAllVisits,
    addNewVisitor
}