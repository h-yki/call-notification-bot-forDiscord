const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
const { token } = require('./config.json');

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const { generalChannelID } = require('./config.json');
    //1157674396174008394 テスト
    //1114712975643779085 きも鯖

    if (!oldState.channel && newState.channel) {
        const embed = new EmbedBuilder()
        .setTitle('通話が開始されました！')
        .setDescription(`${newState.member.user.username}さんが、<#${newState.channel.id}>で通話が開始されました！皆さん集まりましょう！`)
        .setColor('#00ff00');
        client.channels.cache.get(generalChannelID).send({ embeds: [embed] });
        console.log(`Used by ${newState.member.user.username}`);
    }

    if (oldState.channel && !newState.channel) {
      if(oldState.channel.members.size === 0 ){
        const embed = new EmbedBuilder()
          .setTitle('通話が終了しました。')
          .setDescription(`<#${oldState.channel.id}>で通話が終了しました。お疲れ様でした。`)
          .setColor('#ff0000');
          client.channels.cache.get(generalChannelID).send({ embeds: [embed] });
      }
    }
  });
  

client.login(token);