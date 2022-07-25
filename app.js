const contacts = require('./contacts')

const main = async () => {
    const nama = await contacts.tulisPertanyaan('Siapa nama anda : ')
    const umur = await contacts.tulisPertanyaan('Berapa umur anda : ')
    const email = await contacts.tulisPertanyaan('Berikan email anda : ')
    const noHp = await contacts.tulisPertanyaan('Berikan nomor handphone anda : ')

    contacts.simpanContact(nama, umur, email, noHp)

    const loop = await contacts.tulisPertanyaan('Apakah anda ingin mengisi data lagi ? (y/n)')

    if (loop === 'y' || loop === 'Y') {
        main()
    } else {
        console.log('Terimakasih, Sudah mengisi data')
        contacts.rl.close()
    }
}

main()