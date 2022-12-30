const http = require('http');

/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */

const requestListener = (request, response) => {

    response.setHeader('Content-type', 'text/html'); //menentukan format dokumen yang digunakan
    response.statusCode = 200; //kode status yang diberikan

    const { url, method } = request;

    if(url === '/') {

        if(method === 'GET') {

            response.end('<h1>Hello Madame</h1>'); // response ketika req dengan method GET

        } else {

            response.end(`Halaman tidak dapat diakses dengan ${method} request`); // jika request method selain get

        }

    } else if(url === '/about') {

        if(method === 'GET') {

            response.end("Bonjour! c'est la page about");

        } else if(method === 'POST') {

            let body = []; // menampung buffer pada stream

            request.on('data', (chunk) => {
                body.push(chunk); //mengisi array body
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body); // parsing json

                response.end(`<h1>Hola, ${name}! welcome to about page</h1>`);
            });

        } else {

            response.end(`Halaman tidak dapat diakses dengan ${method} request`);

        }

    } else {

        response.end('Halaman tidak ditemukan!');

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