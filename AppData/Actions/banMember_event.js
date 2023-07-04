module.exports = {
    data: {"messageContent": "", "memberFrom": "Variable*", "name": "Ban Member", 
    "memberVariable": "",
    "guild":"Variable*", "guildField":"", "reason":""},
    UI: {"compatibleWith": ["DM", "Event"],

     "text": "Ban Member", "sepbar":"",

      "btext":"Get Member Via",
       "menuBar": {"choices": ["Command Author", "Variable*", "Member ID*"], storeAs: "memberFrom", extraField: "memberVariable"}, 

       "sepbar1":"sepbar",

        "btext1":"Get Guild From", "menuBar1":{"choices": ["Variable*", "Guild ID*"],
        storeAs: "guild", extraField: "guildField"}, 

        "sepbar2":"", "btext2":"Reason", 
        "input":"reason", 
        preview: "memberFrom", previewName: "Ban",
        "variableSettings": {
            "memberVariable": {
                "Variable*":"direct"
            },
            "guildField": {
                "Variable*": "direct"
            }
        }

},
    run(values, message, uID, fs, client) {
        let varTools = require(`../Toolkit/variableTools.js`);
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'));

        let guild;
        if (values.guild == 'Variable*') {
            guild = client.guilds.get(tempVars[uID][varTools.transf(values.guildField, uID, tempVars)].id)
        }
        if (values.guild == 'Guild ID*') {
            guild = client.guilds.get(varTools.transf(values.guildField, uID, tempVars))
        }

        let member;
        if (values.memberFrom == 'Command Author') {
            member = guild.getMember(message.author.id)
        } 
        if (values.memberFrom == 'Variable*') {
            member = guild.getMember(tempVars[uID][varTools.transf(values.memberVariable, uID, tempVars)].id)
        }
        if (values.memberFrom == 'Member ID*') {
            member = guild.getMember(varTools.transf(values.memberVariable, uID, tempVars))
        }

        if (values.reason == '') {
            member.ban()
        } else {
            member.ban({reason: varTools.transf(values.reason, uID, tempVars)})
        }
    }
}
