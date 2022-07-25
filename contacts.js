const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const dirPath = './data'
const dataPath = `${dirPath}/data.json`

if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]')
}

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (isi) => {
            resolve(isi)
        })
    })
}

const simpanContact = (name, email, phone) => {
    const data = { name, email, phone }
    const fileBuffer = fs.readFileSync(dataPath, 'utf-8')
    const datas = JSON.parse(fileBuffer)

    // cek duplikat
    const duplikat = datas.find((data) => data.name === name)
    if (duplikat) {
        console.log('Nama sudah ada, gunakan nama lain')
        return false
    }

    datas.push(data)

    fs.writeFileSync(dataPath, JSON.stringify(datas))

    console.log('Terimakasih, Data berhasil disimpan')
    rl.close()
}

module.exports = { tulisPertanyaan, simpanContact }