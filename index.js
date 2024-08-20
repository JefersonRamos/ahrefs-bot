const { google } = require('googleapis')
const path = require('path')
const Integrations = require("./Service/Integrations");
const ahrefs = require("./Service/Ahrefs");

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, 'key.json'),
    scopes: [process.env.scope]
})

async function readSheet() {

    const client = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: client })
    const spreadsheetId = process.env.SHEET_ID

    if(!process.env.npm_config_page || !process.env.npm_config_page) {
        return console.error("Parâmetro pagina não encontrado, por favor especificar a página da seguinte forma: \"npm run dev --column=A2:B2 --page=Página1\"")
    }

    if(!process.env.npm_config_column || !process.env.npm_config_column) {
        return console.error("Parâmetro column não encontrado, por favor especificar a coluna da seguinte forma: \"npm run dev --column=A2:B2 --page=Página1\"")
    }

    const range = `${process.env.npm_config_page}!${process.env.npm_config_column}`

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    })

    const rows = response.data.values.filter((row) => row[0] && row[0].length > 0)

    if(rows.length === 0) return

    const Integrations = require('./Service/Integrations')

    const ahrefs = require('./Service/Ahrefs')

    const [ domainRating ] = await Promise.all([
        await Integrations.setDR(rows, ahrefs),
    ])

    const request = {
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
            values: response.data.values.map((row) => {

                if(row[0] && row[0].length > 0) {

                    row[3] = domainRating[row[4]]
                }

                return row
            }),
        },
    };

    return await sheets.spreadsheets.values.update(request)
}

readSheet().catch(console.error)