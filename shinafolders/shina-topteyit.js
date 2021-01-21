const { MessageEmbed } = require('discord.js');
const sh = require('quick.db');
const ayar = require('../shinas.json');
exports.run = async(client, message, args) => {
if(!["800618518684499975", "800618518709796904"].some(s => message.member.roles.cache.get(s)) && ! message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Bu komudu kullanmak için gerekli yetkilere sahip değilsin.')).then(x => x.delete({timeout: 10000}));

let shina = message.guild.member(message.mentions.firts() || message.guild.members.cache.get(args[0]));
let top = sh.fetch(`shina.${shina.id}.toplam`)
let toplist = message.guild.members.cache.filter(shina => sh.get(`shina.${shina.id}.toplam`)).array().sort((shina1, shina2) => Number(sh.get(`shina.${shina2.id}.toplam`))-Number(sh.get(`shina.${shina1.id}.toplam`))).slice(0, 15).map((shina, index) => (index+1)+ " • <@" + shina + "> ("+ sh.get(`shina.${shina.id}.toplam`)+ ")").join("\n")
const shinaembed = new MessageEmbed()
.setFooter(ayar.durum)
.setTimestamp()
.setColor('RANDOM')
.setDescription(toplist)
message.channel.send(shinaembed)
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['topteyit'],
permlevel: 0
};

exports.help = {
name: "topteyit",
description: "shinatopteyit",
usage: ".topteyit"
}
