class createBot {
    constructor({ token, name }) {
        this.token = token;
        this.name = name;
    }
    async create() {
        if(!this.token) return console.error(new Error("Token is missing"));
        if(!this.name) return console.error(new Error("Name is missing"));

        const axios = require("axios")
        const req = await axios({
            url: "https://discord.com/api/v9/applications",
            method: "POST",
            headers: {
                Authorization: this.token
            },
            "content-type": "application/json",
            data: {
                name: this.name
            },
        })
        const data = req.data
        axios({
            url: `https://discord.com/api/v9/applications/${data.id}/bot`,
            method: "POST",
            headers: {
                Authorization: this.token
            },
            "content-type": "applicaction/json",
        }).then(res => {
            console.log(res.headers)
        })
        console.log("Done, Fetching The token automatically is still in progress please with for new updates.")
    }
}

module.exports = {createBot}