const { MessageEmbed } = require('discord.js');
const sh = require('quick.db');
const ayar = require('../shinas.json');
exports.run = async(client, message, args) => {

if(!["800618518684499975", "800618518709796904"].some(s => message.member.roles.cache.get(s)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsin.')).then(x => x.delete({timeout: 10000}));

let üye = message.guild.member(message.mentions.first() || message.guild.members.cache.get(args[0]));
let isim = message.mentions.members.first() || message.guild.members.get(args[0]);
var sayi = 1
let data = sh.fetch(`isim.${message.guild.id}`)
if(!data) return message.channel.send(new MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Bu kullanıcı daha önce kayıt olmamış.')).then(x => x.delete({timeout: 10000}));
let name = data.filter(x => x.userID === isim.id).map(x => `\`• ${x.name} | ${x.age}\` (<@&${x.role}>)`.join("\n"))
if(name === null) name = "Kullanıcının isim kaydı bulunmamıştır."
if(name === undefined) name = "Kulanıcının isim kaydı bulunmamıştır."

const shinaembed = new MessageEmbed()
.setFooter(ayar.durum)
.setTimestamp()
.setColor('RANDOM')
.setDescription(`Kullanıcının ${sayı-1} adet isim kaydı bulundu;
${name}`)
message.channel.send(shinaembed)
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['isimler'],
permlevel: 0
};

exports.help = {
name: "isimler",
description: "shinaisimler",
usage: ".isimler @etiket/ID"
}
