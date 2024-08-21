const Integrations = {

    setDR: async (rows, integration) => {

        const listDR = {}

        await Promise.all(rows.map(async (row, index) => {

            const [value, niche, da, dr, traffic, url] = row

            listDR[url] = await integration.getDr(url)
        }))

        return listDR
    },

    setTraffic: async (rows, integration) => {

        const listTraffic = {}

        await Promise.all(rows.map(async (row, index) => {

            const [value, niche, da, dr, traffic, url] = row

            listTraffic[url] = await integration.getTraffic(url)
        }))

        return listTraffic
    },
}

module.exports = Integrations