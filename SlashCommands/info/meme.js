const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require('../../config.json');
const Fetch = require("node-fetch");
const Reds = ["memes"];

module.exports = {
    name: "meme",
    description: "Send A Meme!",
    usage: "Meme",
    run: async (client, interaction, args) => {
      const Rads = Reds[Math.floor(Math.random() * Reds.length)];

      const res = await Fetch(`https://www.reddit.com/r/${Rads}/random/.json`);

      const json = await res.json();
      if (!json[0]) return interaction.followUp(`Testing`);

      const data = json[0].data.children[0].data;

      const meme_embed = new MessageEmbed()
        .setColor(ee.color)
        .setURL(`https://reddit.com${data.permalink}`)
        .setTitle(data.title)
        .setDescription(`Author : ${data.author}`)
        .setImage(data.url)
        .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
        .setTimestamp();

      const meme_button = new MessageButton();

      meme_button.setLabel('Next Meme');
      meme_button.setCustomId('nextMeme');
      meme_button.setStyle('SUCCESS');

      const row = new MessageActionRow().addComponents(meme_button);
      
      interaction.followUp({ embeds: [meme_embed], components: [row] });
    }
}
