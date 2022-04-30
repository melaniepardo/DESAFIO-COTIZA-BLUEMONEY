const fs = require('fs')
const https = require('https')
const mensaje = `A la fecha: Thu Sep 03 2020 18: 41: 00 GMT - 0400(GMT - 04: 00)
Fue realizada la cotización con los siguientes datos:
Cantidad de pesos a convertir: 250000 pesos
Convertido a "dólar" da un total de:
$324, 06`


const argumentos = process.argv.slice(2)
const nombreArchivo = argumentos[0]
const extensionArchivo = argumentos[1]
const indicadorEconomico = argumentos[2]
const cantidadPesos = argumentos[3]

//segundo punto, consumiremos api
// Sintaxis https.get(url[, options][, callback])


const dia = new Date().toUTCString() //deja el formato gmt en otra zona horaria que más se parece

// 2. Consultar la API con el módulo https y almacenar la respuesta en una variable.

const url = 'https://mindicador.cl/api'
https.get(url, (resp) => { //le pasamos la api como argumento
    resp.on('data', (data) => {
        const datos = JSON.parse(data)
        const cambio = datos[indicadorEconomico].valor //.valor es para que nos dé el tipo de cambio
        const total = (cantidadPesos / cambio).toFixed(2)
        const mensaje = `A la fecha: ${dia}
Fue realizada la cotización con los siguientes datos:
Cantidad de pesos a convertir: ${cantidadPesos} pesos
Convertido a ${indicadorEconomico} da un total de: $ ${total}`
        fs.writeFile(`${nombreArchivo}.${extensionArchivo}`, mensaje, 'utf8', () => {// punto 3 crea el archivo dolar, con su extensión y mensaje
// Creamos un archivo con el módulo fs cuyos datos están formados por los argumentos
// recibidos por línea de comando y su contenido basado en el template de la
// descripción.
            console.log(mensaje)
        }//muestra el mensaje pusimos arriba
        )
    })
})
    .on('error', (err) => {
        console.log('Error: ' + err.message)
    })





// 4. Enviar por consola el contenido del archivo luego de que haya sido creado (revisar dolar.txt).
