const { exec } = require('child_process')

const argumentos = process.argv.slice(2)
const nombreArchivo = argumentos[0]
const extensionArchivo = argumentos[1]
const indicadorEconomico= argumentos[2]
const cantidadPesos= argumentos[3]
// 5. Ejecutamos la aplicación desde un archivo externo con el módulo child_process
// enviando los argumentos correspondientes y devolviendo por consola el contenido
// del archivo luego de que haya sido creado (revisar euro.txt). Es decir vinculamos el archivo externo 
exec(`node cotiza_bluemoney.js ${nombreArchivo} ${extensionArchivo} ${indicadorEconomico} ${cantidadPesos}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`)
        return
    }
    console.log(`stdout: ${stdout}`)// standard output
    console.error(`stderr: ${stderr}`)// standard error
})
