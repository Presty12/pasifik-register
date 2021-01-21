const reqEvent = (event) => require(`../shinaevents/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('shina-ready')(client));
  client.on('message', reqEvent('shina-message'));
};
