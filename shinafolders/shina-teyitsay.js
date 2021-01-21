const { MessageEmbed } = require('discord.js');
const sh = require('quick.db');
const ayar = require('../shinas.json');
exports.run = async(client, message, args) => {

if(!["800618518684499975", "800618518709796904"].some(s => message.member.roles.cache.get(s)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sen(new MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsin.')).then(x => x.delete({timeout: 10000}));


let üye = message.guild.member(message.mentions.first() || message.guild.members.cache.get(args[0]));
if(üye) {

let erkek = sh.fetch(`shina.${message.author.id}.erkek`)
let kadın = sh.fetch(`shina.${message.author.id}.kadın`)
let toplam = sh.fetch(`shina.${message.author.id}.toplam`)
if(erkek === null) erkek = "0"
if(kadın === null) kadın = "0"
if(toplam === null) toplam = "0"
if(erkek === undefined) erkek = "0"
if(kadın === undefined) kadın = "0"
if(toplam === undefined) toplam = "0"
const shinaembed = new MessageEmbed()
.setFooter(ayar.durum)
.setColor('RANDOM')
.setTimestamp()
.setDescription(`
Toplam \`${toplam}\` adet kaydınız var (\`${erkek}\` erkek , \`${kadın}\` kadın)`)
message.channel.send(shinaembed)
};

if(üye) {
let e = sh.fetch(`shina.${üye.id}.erkek`)
let k = sh.fetch(`shina.${üye.id}.kadın`)
let t = sh.fetch(`shina.${üye.id}.toplam`)
if(e === null) e = "0"
if(k === null) k = "0"
if(t === null) t = "0"
if(e === undefined) e = "0"
if(k === undefined) k = "0"
if(t === undefined) t = "0"
const shinaembed2 = new MessageEmbed()
.setFooter(ayar.durum)
.setTimestamp()
.setColor('RANDOM')
.setDescription(`
${üye} (\`${üye.id}\`) Toplam \`${t}\` adet kaydı var (\`${e}\` erkek , \`${k}\` kadın)`)
message.channel.send(shinaembed2)
};

};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['teyitsay'],
permlevel: 0
};

exports.help = {
name: "teyitsay",
description: "shinateyitsay",
usage: ".teyitsay / .teyitsay @etiket/ID"
}
