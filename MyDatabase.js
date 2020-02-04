
// npm install --save pg
// find out more here: https://node-postgres.com/

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "user",
  host: "localhost",
  database: "MyDatabase",
  password: "pass",
  port: 5432
});

const addNewVisitor = (name, age, visit_date, visit_time, assistant_name, comments) => {
    pool.query(
    `INSERT INTO visitors(visitor_name, visitor_age, date_of_visit, time_of_visit, name_of_assistant, comments)VALUES($1, $2, $3, $4, $5, $6)`,
    [name, age, visit_date, visit_time, assistant_name, comments],
        (error, results) => {
            if(error){
                throw error;
            }
            console.log(results.rows)
        }
        )
};

addNewVisitor("posh", 12, "04/02/2020", "15:50", "Sihle", "non");

