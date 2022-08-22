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
            url: "https://discord.com/api/v10/applications",
            method: "POST",
            headers: {
                Authorization: this.token
            },
            "content-type": "application/json",
            data: {
                name: this.name
            },
        })
        const data = req.data;
        axios({
            url: `https://discord.com/api/v9/applications/${data.id}/bot`,
            method: "POST",
            headers: {
                Authorization: this.token
            },
            "content-type": "applicaction/json",
        }).then(res => {
            axios({
                url: `https://discord.com/api/v9/applications/${data.id}/bot`,
                method: 'POST',
                headers: {
                    Authorization: this.token
                },
                "content-type": "applicaction/json",
            }).then(() => {
                axios.post(`https://discord.com/api/v9/applications/${data.id}/bot/reset`, {}, {headers: {Authorization: this.token}}).then(res => {
                    console.log(res.data)
                })
            })
            // console.log(res)
        });

        
    }
}

module.exports = {createBot}