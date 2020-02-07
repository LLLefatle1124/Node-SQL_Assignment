// establishing a connection to a database
const {Client} = require("pg");
const client = new Client({
  user: "user",
  host: "localhost",
  database: "mydatabase",
  password: "pass",
  port: 5432
});

const myclient = new Client({
    user: "user",
    host: "localhost",
    database: "mydatabase",
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

addNewVisitor("Nolo", 12, "04/02/2020", "15:50", "Sihle", "none");
addNewVisitor("KC", 12, "04/02/2020", "15:50", "Sihle", "none");
addNewVisitor("Sihle", 12, "04/02/2020", "15:50", "Sihle", "none");
addNewVisitor("Sbongile", 13, "04/02/2020", "15:50", "Sihle", "none");

const listAllVisits = async() => {
    const SQL = `SELECT visitor_ID, visitor_name FROM visitors;`
    try {
        query = await client.query(SQL);
        console.log(query.rows)
    } catch (e) {
        throw e;
    }
};

listAllVisits();

// taking an ID parameter because I need to delete a specific record
const deleteVisit = async(id) => {
    try {
        await client.query('DELETE FROM visitors WHERE visitor_ID=$1;', [id]);
    } catch (e) {
        console.log(e);
        throw e;
    }
};

deleteVisit(1);
deleteVisit(3);

// taking row, a condition and value parameters because I need to know where, when and what am i updating in a record
const updateVisit = async(id, where, value) => {
    try {
        await client.query(`UPDATE visitors SET ${where}= $2 WHERE visitor_ID=$1;`, [id, value]);
    } catch (e) {
        console.log(e);
        throw e;
    }
};

updateVisit(4, "visitor_name", "Shanny");
updateVisit(4, 'visitor_age', '22');

const veiwVisit = async(id) => {
    try {
        const query = await client.query(`SELECT * FROM visitors WHERE visitor_ID=$1;`, [id]);
        console.log(query.rows)
        client.end();
    } catch (e) {
        console.log(e);
        client.end();
        throw e;
    }
    emptyVisits();
};

veiwVisit(4);

const emptyVisits = async() => {
    myclient.connect();
    try {
        await myclient.query('DELETE FROM visitors;');
        myclient.end();
    } catch (e) {
        console.log(e);
        myclient.end();
        throw e;
    }
};