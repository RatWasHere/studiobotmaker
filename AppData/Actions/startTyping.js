module.exports = {
    data: {"name":"Start Typing", "channelFrom":"Message Channel", "channel":""},
     
    UI: {"compatibleWith":["Text", "Slash"], 
    "text":"Start Typing", 
    
    "sepbar3":"", 

     "btext00guild":"Start Typing In",
      "menuBar":{"choices":["Message Channel", "Variable*"], 
      storeAs:"channelFrom", extraField:"channel"},

      "sepbar134324121232":"",  

      "variableSettings":{
        "channel": {
            "Variable*": "direct", 
            "Message Channel": "novars"
        }
    },

      "preview":"channelFrom", 
      "previewName":"In"},

   async run(values, message, uID, fs, client) { 
        let varTools = require(`../Toolkit/variableTools.js`)
        var tempVars = JSON.parse(fs.readFileSync('./AppData/Toolkit/tempVars.json', 'utf8'))
        var storedData = JSON.parse(fs.readFileSync('./AppData/Toolkit/storedData.json', 'utf8'))
 
        if (values.channelFrom == 'Message Channel') {
            message.channel.sendTyping()
        } else { 
            let channelId = tempVars[uID][varTools.transf(values.channel, uID, tempVars)].id
            client.getChannel(channelId).sendTyping()
        }
    }
}