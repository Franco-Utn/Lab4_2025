const express = require("express")
const path = require("path");

const startServer = (envs) => {

    const app = express();

    app.use( express.static(`${envs.publicPath}/dist`)); // Corrected// Notice the trailing space

    app.get("/", (req, res) => {
        const url = path.join(__dirname, "../../../public/dist/index.html");
        console.log(url)
        res.sendFile(url);
    });

    app.listen(envs.port, () => {
        console.log(`Server is running on port ${envs.port}`);
    });

    console.log(envs)
};

module .exports = {
    startServer
};
