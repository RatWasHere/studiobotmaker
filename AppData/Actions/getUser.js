module.exports = {
    data: {"messageContent": "", "button": "Command Guild", "name": "Get User", "ExtraData": "", "sendTo":"", "choice":"ID*", "memberValue":"", "storesAs":""},
    UI: {"compatibleWith": ["Text", "Slash"], "text": "Get User", "sepbar33235":"", "btextchoices": "Get User Via", "menuBar": {choices: ["ID*", "Command Author"], storeAs: "choice", extraField:"memberValue"}, "sepbarchoice":"", "btextStoreAs":"Store As", 
    "inputstoreas!*":"storesAs",
        "variableSettings": {
            "memberValue": {
                "Command Author": "novars",
                "id*": "indirect"
            }
        },
    
    preview: "choice", previewName: "From"},
    async run(values, message, uID, fs, client) {
        let tempVrz = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json'));
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let varTools = require(`../Toolkit/variableTools.js`)

        if (values.choice == "Command Author") {
            const member = client.users.get(message.author.id); 
            tempVars[uID][values.storesAs] = member
        }
        if (values.choice == "ID*") {
            const member = client.users.get(varTools.transf(values.memberValue, uID, tempVars)); 
            tempVars[uID][values.storesAs] = member
        }
        await fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

    }
}
