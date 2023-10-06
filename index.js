const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
const token = 'MTE1NzY3MTA0MDk3ODI3NjM5Mw.GseOGu.MdoAKPPbFKBImWEgCetPWLxW1iZpOrayAEx7VY';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const generalChannelID = "1157674396174008394"; //テスト
    // const generalChannelID = "1114712975643779085"; //きも鯖

    if (!oldState.channel && newState.channel) {
        const embed = new EmbedBuilder()
        .setTitle('通話が開始されました！')
        .setDescription(`${newState.member.user.username}が、<#${newState.channel.id}>で通話を開始しました！皆さん集まりましょう！`)
        .setColor('#00ff00');
        client.channels.cache.get(generalChannelID).send({ embeds: [embed] });
    }

    if (oldState.channel && !newState.channel) {
      const embed = new EmbedBuilder()
        .setTitle('通話が終了しました。')
        .setDescription(`<#${oldState.channel.id}>の通話が終了しました。お疲れ様でした。`)
        .setColor('#ff0000');
        client.channels.cache.get(generalChannelID).send({ embeds: [embed] });
    }
  });
  

client.login(token);

