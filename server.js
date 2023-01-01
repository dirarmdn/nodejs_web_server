const http = require('http');

/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */

const requestListener = (request, response) => {

    response.setHeader('Content-type', 'application/json'); //menentukan format dokumen yang digunakan
    response.setHeader('X-Powered-By', 'NodeJS');
    // response.statusCode = 200; //kode status response yang ditentukan

    const { url, method } = request;

    if(url === '/') {

        if(method === 'GET') {

            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Hello Madame, bienvenue au home page',
            })); // response ketika req dengan method GET

        } else {

            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            })); // jika request method selain get

        }

    } else if(url === '/about') {

        if(method === 'GET') {

            response.statusCode = 200;
            response.end(JSON.stringify({
                message: 'Bonjour! c\'est la page about',
            }));

        } else if(method === 'POST') {

            let body = []; // menampung buffer pada stream

            request.on('data', (chunk) => {
                body.push(chunk); //mengisi array body
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body); // parsing json

                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: `Hola, ${name}! welcome to about page`,
                }));
            });

        } else {

            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
        }

    } else {

        response.statusCode = 404;
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));

    }
    
};

const server = http.createServer(requestListener);

const port = 5000; // jalur yang digunakan untuk mengakses HTTP Server
const host = 'localhost'; // nama domain yang digunakan


/* ketika memanggil method listen() kita 
 * memberikan nilai port, hostname, 
 * dan listeningListener  
*/
server.listen(port, host, () => {
    console.log(`Server berjalan pada http:/${host}:${port}`);
})