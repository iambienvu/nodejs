const pool = require("./database");

function processWZClickStore(job) {
    // const { account_id, event_name, time, version } = job;

    // pool.query("INSERT INTO ww_clicks (account_id, event_name, time, version) VALUES ($1, $2, $3, $4)", [account_id, event_name, time, version], (error, results) => {
    //     if (error) throw error;
    //     res.status(200).json(results.rows);
    // })
}

module.exports = { processWZClickStore };