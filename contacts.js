const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const dirPath = './data'
const dataPath = `${dirPath}/data.json`

if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]')
}

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (isi) => {
            resolve(isi)
        })
    })
}

const simpanContact = (nama, umur, email, noHp) => {
    const data = { nama, umur, email, noHp }
    const fileBuffer = fs.readFileSync(dataPath, 'utf-8')
    const datas = JSON.parse(fileBuffer)

    datas.push(data)

    fs.writeFileSync(dataPath, JSON.stringify(datas))

    console.log('Terimakasih, Data berhasil disimpan')
}

// const loop = (loop) => {
//     if (loop==='y' || loop==='Y') {
//         main.main()
//     }else{
//         console.log('Terimakasih, Sudah mengisi data')
//         rl.close()
//     }
// }

module.exports = {tulisPertanyaan, simpanContact, rl}