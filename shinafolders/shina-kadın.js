const { Discord, MessageEmbed } = require('discord.js');
const sh = require('quick.db');
const ayar = require('../shinas.json');
exports.run = async (client, message, args) => {

if(!["800618518684499975", "800618518709796904"].some(s => message.member.roles.cache.get(s)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Bu komudu kullanmak için gerekli izinlere sahip değilsin.')).then(x => x.delete({timeout: 10000}));

let kadın = message.guild.roles.cache.find(s => s.id === "800629724383674400")
let kadın2 = message.guild.roles.cache.find(s => s.id === "800618518600613916")
let kayıtsız = message.guild.roles.cache.find(s => s.id === "800618518579904551")
let savelog = message.guild.channels.cache.find(s => s.id === "800631313375166484")
let tagrol = message.guild.roles.cache.find(s => s.id === "800618518659465216")
let tag = "✯"
let number = await sh.fetch('case')

let shina = message.guild.member(message.mentions.first() || message.guild.members.cache.get(args[0]));
let s = message.guild.member(shina);
if(s.id === message.guild.OwnerID) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Sunucu sahibini kayıt edemezsin.')).then(s => s.delete({ timeout: 10000 }));
if(s.id === message.author.id) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Kendini kayıt edemezsin.')).then(s => s.delete({ timeout: 10000 }));
if(s.id === client.user.id) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Botları kayıt edemezsin, onlara zaten bot rolü veriliyor!')).then(s => s.delete({ timeout: 10000 }));
if(s.roles.highest.position >= message.member.roles.highes.position) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Bu kullanıcının rolleri senden üstün veya aynı. Bu kişiyi kayıt edemezsin!')).then(s => s.delete({ timeout: 10000 }));
if(s.user.username.includes(tag)) {
s.roles.add(tagrol)
} else {
s.roles.remove(tagrol)
s.roles.remove(kadın)
s.roles.remove(kadın2)
s.roles.add(kayıtsız)
return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Sunucumuz şuanda taglı alımdadır. Tagımızı alarak kayıt olabilirsiniz. (\`.tag\` yazarak taga bakabilirsiniz.) '))
}

let isim = args[1]
if(!isim) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Bir isim belirtin.')).then(s => s.delete({ timeout: 10000 }));
if(isim.length > 15) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('İsminiz en fazla 15 harften oluşabilir')).then(s => s.delete({ timeout: 10000 }));
let yas = Number(args[2])
if(!isim) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Bir yaş belirtin.')).then(s => s.delete({ timeout: 10000 }));
if(isim.length > 40) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setFooter(ayar.durum).setDescription('Yaşınız en fazla 40 olabilir.')).then(s => s.delete({ timeout: 10000 }));

s.roles.add(kadın)
s.roles.add(kadın2)
s.roles.remove(kayıtsız)
s.setNickname(`${tag} ${isim} | ${yas}`)


sh.add(`shina.${message.author.id}.kadın`, 1)
sh.add(`shina.${message.author.id}.toplam`, 1)
sh.add('case', 1)
let f = sh.fetch(`shina.${message.author.id}.toplam`)
let ef = sh.fetch(`shina.${message.author.id}.erkek`)
let ek = sh.fetch(`shina.${message.author.id}.kadın`)
sh.push(`shinaisimler.${message.author.id}`, {
userID: s.id,
name: isim,
age: yas,
role: kadın.id
})

const shinaembed = new MessageEmbed()
.setFooter('Kullanıcının isim kaydına bakmanız önerilir. \`(.isimler @üye)\`')
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setColor('PURPLE')
.setDescription(`
${s} kullanıcı sunucumuzda ${kadın} olarak kayıt edildi`)
message.channel.send(shinaembed)

const shinaembed2 = new MessageEmbed()
.setFooter(`Yetkilinin kayıt bilgileri\n Erkek ${ef}\n Kadın ${ek}\n Toplam ${f}`)
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setColor('RANDOM')
.setDescription(`
Kullanıcı sunucumuzda ${kadın} olarak kayıt edildi
Kayıt edilen kullanıcı : ${s} (\`${s.id}\`)
Kayıt eden yetkili : ${message.author} (\`${message.author.id}\`)
Verilen rol : ${erkek}
Alınan rol : ${kayıtsız}
Kayıt Sırası : #${number}`)
savelog.send(shinaembed2)
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['k'],
permlevel: 0
};

exports.help = {
name: "shinakadın",
description: "shinakadın komudu",
usage: ".k etiket/ID İsim Yaş"
}
