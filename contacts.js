const fs = require('fs')
const readline = require('readline')
const validator = require('validator')
// const chalk = require('chalk')
// const chalkTemplate = require('chalk-template')

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

const loadContacts = () => {
    const fileBuffer = fs.readFileSync(dataPath, 'utf-8')
    const datas = JSON.parse(fileBuffer)
    return datas
}

const simpanContact = (name, email, phone) => {
    const data = { name, email, phone }
    const datas = loadContacts()

    // cek duplikat
    const duplikat = datas.find((data) => data.name === name)
    if (duplikat) {
        console.log(`Nama ${data.name} sudah ada, gunakan nama lain`)
        rl.close()
        return false
    }

    if (email) {
        if (!validator.isEmail(email)) {
            console.log('Email tidak valid')
            rl.close()
            return false
        }
    }
    if (!validator.isMobilePhone(phone, 'id-ID')) {
        console.log('Nomor HP tidak valid')
        rl.close()
        return false
    }

    datas.push(data)

    fs.writeFileSync(dataPath, JSON.stringify(datas))

    console.log(`Terimakasih, Data kontak ${name} berhasil disimpan`)
    rl.close()
}

const listContact = () => {
    const data = loadContacts()
    console.log('Daftar Kontak:')
    data.forEach((contact, i) => {
        console.log(`${i + 1}.${contact.name} - ${contact.email} - ${contact.phone}`)
    })
    // const fileBuffer = fs.readFileSync(dataPath, 'utf-8')
    // const datas = JSON.parse(fileBuffer)
    // console.log(('Data yang tersimpan:'))
    // datas.forEach((data) => {
    //     console.log(`- ${data.name}`)
    // })
    rl.close()
}

const detailContact = (name) => {
    const data = loadContacts()
    const contact = data.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
    if (!contact) {
        console.log(`Kontak ${name} tidak ditemukan`)
        rl.close()
        return false
    }
    console.log('=================')
    console.log('| Detail Kontak |')
    console.log('=================')
    console.log(`Nama: ${contact.name}`)
    if (contact.email) {
        console.log(`Email: ${contact.email}`)
    }

    // console.log(`Email: ${contact.email}`)
    console.log(`Nomor HP: ${contact.phone}`)
    rl.close()
    
}

const deleteContact = (name) => {
    const data = loadContacts()
    const contact = data.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
    if (!contact) {
        console.log(`Kontak ${name} tidak ditemukan`)
        rl.close()
        return false
    }

    const index = data.indexOf(contact)
    data.splice(index, 1)
    fs.writeFileSync(dataPath, JSON.stringify(data))
    console.log(`Kontak ${name} berhasil dihapus`)
    rl.close()
}

module.exports = { simpanContact, listContact, detailContact, deleteContact }