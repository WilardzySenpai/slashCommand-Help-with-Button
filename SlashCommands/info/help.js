const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ee = require('../../config.json');

module.exports = {
    name: "help",
    description: "Show all the commands",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

      let music = [
        "\`play:\` Play a song from YouTube, SoundCloud, & Spotify",
        "\`pause:\` Pause the current playing music.",
        "\`resume:\` Resume the pause music.",
        "\`stop:\` Stop the music.",
        '\`loop:\` Loop the current music or the queqe.',
        '\`autoplay:\` Autoplay music for you.',
        '\`queue:\` Show the music queue.',
        '\`volume:\` Adjust the volume of the music.',
        '\`seek:\` Rewind the current song to the specified position.',
        '\`shuffle:\` Shuffle the music playlist or the queue.',
        '\`nowplaying:\` Show the Current music playing.',
        '\`save:\` Save the current playing music.',
        '\`lyrics:\` Display the lyrics of the current playing music.',
        '`\ffilter:\` Put a filter to a song.',
        '`\lyric:\` Find a song lyrics you type in.',
        '`\join:`\ H_M will join the channel with you <3.',
        '`\previous:\` Plays the previous song in the queue.',
        '`\skipto:\` Skip to a song in the queue.'
      ]
      let info = [
        '\`ping:\` Pings H_M.',
        '\`help:\` Shows all the H_M command lists.',
        '\`links:\` Information about H_M.',
        '`\avatar:\` Shows the avatar of a user.',
        '`\ffilterlist:\` Display all the H_M filters'
      ]
      let misc = [
        '`\avatar:\` Shows the avatar of a user.',
        '`\say:\` Say something and i will copy it',
        '`\rrps:\` Play Rock Paper Scissors!'
      ]
      
      let homeembed = new MessageEmbed()
      .setColor(ee.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor("はちき", "https://cdn.discordapp.com/avatars/939867069070065714/84f9ccff3b53508eb8ae8e4bd40f019d.jpg")
      .setTitle("A Little Info About H_M")
      .setDescription("> H_M is a simple music bot on discord that can support Spotify, SoundCloud and YouTube also H_M can play a direct music link, don't you know that? pretty cool isn't. We hope that H_M can bring happiness to your server's and play Music whenever you all in vc, Thank you!")
      .setFooter(`${client.user.username} is the best!`)

      let btnraw = new MessageActionRow().addComponents([
        new MessageButton().setCustomId("home").setStyle("SUCCESS").setLabel("Home"),
        new MessageButton().setCustomId("info").setStyle("PRIMARY").setLabel("Info"),
        new MessageButton().setCustomId("music").setStyle("PRIMARY").setLabel("Music"),
        new MessageButton().setCustomId("misc").setStyle("PRIMARY").setLabel("Misc")
      ]);
      let d_btnraw = new MessageActionRow().addComponents([
        new MessageButton().setCustomId("d_home").setStyle("SUCCESS").setLabel("Home").setDisabled(true),
        new MessageButton().setCustomId("d_info").setStyle("PRIMARY").setLabel("Info").setDisabled(true),
        new MessageButton().setCustomId("d_music").setStyle("PRIMARY").setLabel("Music").setDisabled(true),
        new MessageButton().setCustomId("d_misc").setStyle("PRIMARY").setLabel("Misc").setDisabled(true)
      ]);

      let infoembed = new MessageEmbed()
      .setColor(ee.color)
      .setTitle("Info Section")
      .setDescription(`**🌭 - Info**\n• ${info.join("\n • ")}`)

      let musicembed = new MessageEmbed()
      .setColor(ee.color)
      .setTitle("Music Section")
      .setDescription(`**🎵 - Music**\n• ${music.join("\n • ")}`)

      let miscembed = new MessageEmbed()
      .setColor(ee.color)
      .setTitle("Misc Section")
      .setDescription(`**🔎 - Misc**\n• ${misc.join("\n • ")}`)

      await interaction.followUp({ embeds: [homeembed], components: [btnraw] }).then(async (msg) => {
        let filter = i => i.user.id === interaction.user.id;
        let collector = await msg.createMessageComponentCollector({filter : filter, time : 10000 }); // time when the get disable
        collector.on('collect', async (btn) => {
          if(btn.isButton()) {
            if(btn.customId === "info") {
              await btn.deferUpdate().catch(e => {})
              msg.edit({embeds : [infoembed] })
            } else if(btn.customId === "music") {
              await btn.deferUpdate().catch(e => {})
              msg.edit({embeds : [musicembed] })
            } else if(btn.customId === "misc") {
              await btn.deferUpdate().catch(e => {})
              msg.edit({embeds : [miscembed] })
            } else if (btn.customId === "home") {
              await btn.deferUpdate().catch(e => {})
              msg.edit({embeds : [homeembed] })
            }
          }
        })
          collector.on('end', () => {
            msg.edit({embeds : [homeembed], components : [d_btnraw] })
          })
      })
    },
};
