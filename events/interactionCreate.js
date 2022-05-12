const client = require("../index");
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ee = require('../config.json');
const Fetch = require("node-fetch");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: true });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
  
  // meme button function
   if (interaction.isButton()){
     const Reds = ["memes"];
   switch (interaction.customId) {
     case 'nextMeme': {
       const Rads = Reds[Math.floor(Math.random() * Reds.length)];
       const res = await Fetch(`https://www.reddit.com/r/${Rads}/random/.json`);
       const json = await res.json();
       if (!json[0]) return interaction.followUp(`Testing`);
       const data = json[0].data.children[0].data;

        const meme_but = new MessageEmbed()
         .setColor(ee.color)
         .setURL(`https://reddit.com${data.permalink}`)
         .setTitle(data.title)
         .setDescription(`Author : ${data.author}`)
         .setImage(data.url)
         .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
         .setTimestamp();

       const meme_butt = new MessageButton();
       meme_butt.setLabel('Next Meme');
       meme_butt.setCustomId('nextMeme');
       meme_butt.setStyle('SUCCESS');

       const row = new MessageActionRow().addComponents(meme_butt);

       interaction.reply({ embeds: [meme_but], components: [row] });
     }
   }
   }
});
