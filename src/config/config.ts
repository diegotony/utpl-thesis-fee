export default {
    MONGO_HOST:process.env.MONGO_HOST || 'localhost',
    MONGO_PORT:process.env.MONGO_PORT || '27017',
    MONGO_DB:process.env.MONGO_DB || 'payment',
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    PORT: process.env.PORT || '3041',
    MODE : process.env.MODE || 'sandbox' ,
    CLIENT_ID: process.env.CLIENT_ID ||'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    CLIENT_SECRET: process.env.CLIENT_SECRET || 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'

};

