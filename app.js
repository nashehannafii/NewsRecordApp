const yargs = require("yargs");
const contacts = require("./contacts");

// yargs.command('add', 'Tambahkan data', (yargs) => {
//     yargs.options({
//         name: {
//             demandOption: true,
//             alias: "n",
//             describe: "Nama",
//             type: "string",
//         },
//         email: {
//             demandOption: false,
//             alias: "e",
//             describe: "Email",
//             type: "string",
//         },
//         phone: {
//             demandOption: true,
//             alias: "p",
//             describe: "Nomor HP",
//             type: "string",
//         },
//     },
        
//     );

// })

yargs.command({
    command: "add",
    describe: "Tambahkan data",
    builder: {
        name: {
            demandOption: true,
            alias: "n",
            describe: "nama",
            type: "string",
        },
        email: {
            demandOption: false,
            alias: "e",
            describe: "email",
            type: "string",
        },
        phone: {
            demandOption: true,
            alias: "p",
            describe: "nomor-hp",
            type: "string",
        },
    },
    handler(argv) {
        // const contact = {
        //     name: argv.name,
        //     email: argv.email,
        //     phone: argv.phone,
            
        // }
        // console.log(contact);
        // console.log(argv.name, argv.email, argv.phone);

        contacts.simpanContact(argv.name, argv.email, argv.phone);
    }
}).demandCommand();

yargs.command({
    command: "list",
    describe: "Lihat data",
    handler() {
        contacts.listContact();
    }
})

yargs.command({
    command: "detail",
    describe: "Lihat salah satu data berdasaerkan nama",
    builder: {
        name: {
            demandOption: true,
            alias: "n",
            describe: "nama",
            type: "string",
        }
    },
    handler(argv) {
        contacts.detailContact(argv.name);
    }
})

yargs.command({
    command: "hapus",
    describe: "Hapus salah satu data berdasarkan nama",
    builder: {
        name: {
            demandOption: true,
            alias: "n",
            describe: "nama",
            type: "string",
        }
    },
    handler(argv) {
        contacts.deleteContact(argv.name);
    }
})

yargs.parse()