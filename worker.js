const { Worker } = require("bullmq");
const { processWZClickStore } = require("./utils");

const workerOptions = {
    connection: {
        host: "localhost",
        port: 6379,
    },
};

const workerHandler = (job) => {
    console.log("Starting job:", job.name);
    processWZClickStore(job.data);
    console.log("Finished job:", job.name);
    return;
};

const worker = new Worker("wzClickJobQueue", workerHandler, workerOptions);