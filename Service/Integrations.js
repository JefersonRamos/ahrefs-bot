const Integrations = {

    setDR: async (rows, integration) => {

        const listDR = {}

        await Promise.all(rows.map(async (row, index) => {

            const [ value, niche, da, dr, url ] = row

            listDR[url] = await integration.getDr(url)
        }))

        return listDR
    }
}

module.exports = Integrations