const config = require('./config.json');
const core = require('./cores');

module.exports = async (app) => {
    config.forEach(item => {
        core(item.method, item.model, (router) => {
            app.use('/api', router);
        });
    });
}