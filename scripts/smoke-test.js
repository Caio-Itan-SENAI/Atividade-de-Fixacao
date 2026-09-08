const http = require("http");

const url = process.env.SMOKE_TEST_URL || "http://localhost:3000";

console.log(`Executando smoke test em: ${url}`);

const request = http.get(url, response => {
    console.log(`Status HTTP: ${response.statusCode}`);

    if (response.statusCode >= 200 && response.statusCode < 400) {
        console.log("SMOKE TEST: APROVADO");
        process.exit(0);
    }

    console.error("SMOKE TEST: FALHOU");
    process.exit(1);
});

request.on("error", error => {
    console.error("Não foi possível acessar a aplicação.");
    console.error(error.message);

    process.exit(1);
});

request.setTimeout(10000, () => {
    console.error("Timeout no smoke test.");

    request.destroy();

    process.exit(1);
});