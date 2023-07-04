module.exports = {
    data: {"name":"Get Mentioned User", "messageVariable":"", "button":"First", "ExtraData":"5", 
"storeAs":""},
    UI: {"compatibleWith": ["Event", "Slash", "DM"], "text": "Get Message Mention","sepbarEmbVar":"", 
    
    "btextmember":"Message Variable", "inputd_direct*":"messageVariable", 
    "sepbarmenus":"sepbar",
    "btext00":"Mention Number",
    "ButtonBar": {"buttons":["First", "Second", "Third", "Custom*"]},
    "sepbar5131":"",
    "btextstoreas":"Store As",
    "inputstoreas!*":"storeAs",
    "btext":"<b>Note!</b> <br> If you're using \"Custom\", you need to insert the number, not ordinal numbers!",
    
    preview: "button", previewName: "Mention"},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        let msg;
            msg = client.getChannel(tempVars[uID][values.messageVariable].channel_id).messages.fetch(tempVars[uID][values.messageVariable].id)
        
        if (values.button == 'First') {
             mention = msg.mentions.users.first()
             tempVars[uID] = {
                ...tempVars[uID],
                [values.storeAs]: mention
            }
            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

        } else {
            let ment = msg.mentions.users.array;
            let mention; 
            switch (values.button) {
                case 'Second':
                    mention = ment[1]
                break
                case 'Third':
                    mention = ment[2]
                break
                case 'Custom':
                    mention = ment[parseFloat(varTools.transf(values.ExtraField, uID, tempVars))]
                break
            }
            tempVars[uID] = {
                ...tempVars[uID],
                [values.storeAs]: mention
            }
            fs.writeFileSync('./AppData/Toolkit/tempVars.json', JSON.stringify(tempVars), 'utf8')

        }
    }
}
