const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

async function main() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log("Conectado ao banco de dados.");

    const migrationsPath = path.join(__dirname, "..", "migrations");

    const files = fs
        .readdirSync(migrationsPath)
        .filter(file => file.endsWith(".sql"))
        .sort();

    for (const file of files) {
        console.log(`Executando migration: ${file}`);

        const sql = fs.readFileSync(
            path.join(migrationsPath, file),
            "utf8"
        );

        await connection.query(sql);

        console.log(`Migration concluída: ${file}`);
    }

    await connection.end();

    console.log("Todas as migrations foram executadas.");
}

main().catch(error => {
    console.error("Erro durante migration:");
    console.error(error);

    process.exit(1);
});