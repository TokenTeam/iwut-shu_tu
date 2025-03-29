module.exports = {
    DBHOST: process.env.DBHOST || '127.0.0.1', // 默认值为 '127.0.0.1'
    DBPORT: process.env.DBPORT || 27017,      // 默认值为 27017
    DBNAME: process.env.DBNAME || 'shutupost' // 默认值为 'shutupost'
};