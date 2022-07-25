// const { command } = require("yargs");
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
            describe: "Nama",
            type: "string",
        },
        email: {
            demandOption: false,
            alias: "e",
            describe: "Email",
            type: "string",
        },
        phone: {
            demandOption: true,
            alias: "p",
            describe: "Nomor HP",
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
})

yargs.parse()