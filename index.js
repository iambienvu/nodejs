const express = require("express");
const bodyParser = require("body-parser");
const { Queue } = require("bullmq");
const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const redisOptions = { host: "localhost", port: 6379 };

const wzClickJobQueue = new Queue("wzClickJobQueue", {
    connection: redisOptions,
});

async function addJob(job) {
    await wzClickJobQueue.add(job.type, job);
}

const serverAdapter = new ExpressAdapter();
const bullBoard = createBullBoard({
    queues: [new BullMQAdapter(wzClickJobQueue)],
    serverAdapter: serverAdapter,
});
serverAdapter.setBasePath("/admin");

const app = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));
app.use("/admin", serverAdapter.getRouter());

app.post("/store", async function (req, res) {
    const { account_id, event_name, time, version } = req.body;

    await addJob({
        type: "processWZClickStore",
        req
    });

    res.send("Job added successfully!");
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(3000, function () {
    console.log("Server running on port 3000");
});