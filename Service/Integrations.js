const Integrations = {

    setDR: async (rows, integration) => {

        const listDR = {}

        await Promise.all(rows.map(async (row, index) => {

            const [ value, niche, da, dr, url ] = row

            listDR[url] = await integration.getDr(url)
        }))

        return listDR
    },

    setDA: async (rows, integration) => {

        const listDA = {}

        await Promise.all(rows.map(async (row, index) => {

            const [ value, niche, da, dr, url ] = row

            listDA[url] = await integration.getDa(da)
        }))

        return listDA
    }
}

module.exports = Integrations