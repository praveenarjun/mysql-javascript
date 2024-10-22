const mysql = require("mysql2/promise");

async function connect() {
    try {
        const con = await mysql.createConnection({
            host: "localhost",
            port: 3307,
            user: "root",
            password: "password",
            database: "test"
        });

        await con.beginTransaction();
    
        const insert1 = await con.query("insert into EMPLOYEES (NAME, SSN) values (?,?)", ['Lavada Harsha','924']);

        const resultsAll = await con.query(
            "SELECT * FROM EMPLOYEES"
        );

        console.table(resultsAll[0]);

        con.commit();
        console.log("Transaction committed");


        const name = "Chanty"

        const resultInsert = await con.query(
            "INSERT INTO EMPLOYEES (NAME, SSN) VALUES (?, ?)",['Vikram','999']
        );
        console.log(resultInsert[0]);


        const resultName = await con.query(`SELECT * FROM EMPLOYEES WHERE NAME = ?`, [name]);

        console.table(resultName[0]);

        // const resultUpdate = await con.query(
        //     "UPDATE EMPLOYEES SET NAME = CONCAT('MR',NAME) WHERE NAME IN (?,?)",['Vikram','Chanty','Anki','aaaa']
        // )
        // console.log(resultUpdate[0]);
    
        // await con.commit();

    } catch (ex) {
        console.error(ex);
    }
}

connect();