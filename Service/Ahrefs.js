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

    getDa: async (url) => {

        const params = {

            from: 'domain_rating',
            target: url,
            mode: 'domain',
            output: 'json',
            token: process.env.AHREFS_TOKEN
        }

        return new Promise((resolve) => {

            setTimeout(() => resolve(100), 1000)
        })

        const response = await axios.get('/', { params })

        if(response.status !== 200) return 'Invalid'

        const { domain } = response.data

        return domain.domain_rating
    }
}