#!/usr/bin/env node
const {execSync} = require('child_process');
const {createInterface} = require("readline");
const fs = require("fs");
const table = require("cli-table");

let info = new table({head: ["Name", "Description"], style: {head: ['green']}, chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''}});
info.push(['auto', 'Makes a folder with the AutoReactionc code'], ['bc', 'Makes a folder with broadcast code'], ['botbc', 'Makes a folder with bot broadcast code'], ['lvl', 'Makes a folder with the auto leveling code'], ['music', 'Makes a folder with the music code']);
console.log(info.toString())

const choose = createInterface({input: process.stdin, output: process.stdout});
choose.question('Please enter a package name : ', answer => {
    switch(answer) {
        case "auto":
            runningAll('AutoReaction');
            break;
        case "bc":
            runningAll('bc')
            break;
        case 'botbc':
            runningAll('botbc')
            break;
        case 'lvl':
            runningAll('leveling');
            break;
        case 'music':
            runningAll('music');
    }
})

const willBeRunned = someCommand => {

        try {
            execSync(someCommand);
            
        } catch(e) {
            console.log(e);
            return false;
        }
        return true;

}

function runningAll(name) {
    const willBeName = process.argv[2];
    let ar = ['AutoReaction', 'bc', 'botbc', 'leveling', 'music'];
    console.log(ar.indexOf(name))
    const removed = ar.splice(ar.indexOf(name), 1)
    console.log(`Unused packages: ${ar}`);
    console.log(`Used Packages : ${removed}`)

    const gitCloned = `git clone https://github.com/ioSphinx/Sphinx-bc-easy.git ${willBeName}`;


    console.log('Starting...');
    const allDone = willBeRunned(gitCloned)
    if(!allDone) process.exit(1);

    console.log(`Installing ${willBeName}`);

    ar.forEach(element => {
        console.log(process.cwd())
        fs.readdirSync(`./${willBeName}/${element}`).forEach(file => {
            fs.unlinkSync(`./${willBeName}/${element}/${file}`);
        })
        fs.rmdirSync(`./${willBeName}/${element}`);
        
    })
    console.log("All done you can use 'npm run start' to start everything up");
}



