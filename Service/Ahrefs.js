let axios = require('axios')

axios = axios.create({

    baseURL: 'https://apiv2.ahrefs.com'
})

module.exports = {

    getDr: async (url) => {

        const params = {

            from: 'domain_rating',
            target: url,
            mode: 'domain',
            output: 'json',
            token: process.env.AHREFS_TOKEN
        }

        const response = await axios.get('/', { params })

        if(response.status !== 200) return 'Invalid'

        const { domain } = response.data

        return domain.domain_rating
    },

    getTraffic: async (url) => {

        const params = {

            from: 'positions_metrics',
            target: url,
            mode: 'subdomains',
            output: 'json',
            token: process.env.AHREFS_TOKEN
        }

        const response = await axios.get('/', { params })

        if(response.status !== 200) return 'Invalid'

        const { metrics } = response.data

        metrics.traffic = Math.trunc(metrics.traffic)

        return metrics.traffic
    },
}