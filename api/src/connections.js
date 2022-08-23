let pool = undefined
const pg = require("pg")

const dbServer = process.env.POSTGRES_DB
const dbPassword = process.env.POSTGRES_PASSWORD

const makePool = () => {
    if (pool === undefined) {
        pool = new pg.Pool({
            host: dbServer,
            database: 'postgres',
            user: 'postgres',
            password: dbPassword,
            port: 5432,
            max: 10,
            idleTimeoutMillis: 60000,
            connectionTimeoutMillis: 10000,
        })
    }

    return pool
}

module.exports = {
    makePool
} 
