module.exports = {
  name: "Member Leave Guild",
  nameSchemes: ["Store Guild As", "Store Member As"],
  inputSchemes: 2,
  run(UI, client, fs, actionRunner, atWhat) {
    client.on("guildMemberRemove", (member) => {
      actionRunner(
        atWhat,
        member,
        client,
        {
          [UI[0]]: member.guild,
          [UI[1]]: member,
        },
        true,
      );
    });
  },
};
