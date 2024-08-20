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
    const range = 'Página1!A2:E3'

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    })

    const rows = response.data.values.filter((row) => row[0] && row[0].length > 0)

    if(rows.length === 0) return

    const Integrations = require('./Service/Integrations')

    const ahrefs = require('./Service/Ahrefs')

    const [ domainRating, domainAuthority ] = await Promise.all([
        await Integrations.setDR(rows, ahrefs),
        await Integrations.setDA(rows, ahrefs)
    ])

    const request = {
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        resource: {
            values: response.data.values.map((row) => {

                if(row[0] && row[0].length > 0) {

                    row[2] = domainAuthority[row[4]]
                    row[3] = domainRating[row[4]]
                }

                return row
            }),
        },
    };

    return await sheets.spreadsheets.values.update(request)
}

readSheet().catch(console.error)