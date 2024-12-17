module.exports = (req, res) => {
  // Parse the request query or body
  const { type, config } = req.query;

  if (!type || !config) {
    return res.status(400).send('Missing parameters!');
  }

  let link = '';

  switch (type) {
    case 'vmess':
      link = `vmess://${Buffer.from(config).toString('base64')}`;
      break;
    case 'shadowsocks':
      link = `ss://${Buffer.from(config).toString('base64')}`;
      break;
    case 'trojan':
      link = `trojan://${config}`;
      break;
    default:
      return res.status(400).send('Unsupported type!');
  }

  res.status(200).send(link);
};