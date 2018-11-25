const JWT = require('./index');

(async () => {
  try {
    const payload = {
      role: 'admin'
    };

    const token = await JWT.sign(payload, 'kek', {
      audience: 'lelz',
    });
    console.log(token);

    const verified = await JWT.verify(token, 'kek', {
      audience: ['le', /lel[sz]*/],
    });
    console.log(verified);
  } catch (ex) {
    console.error(ex);
  }
})();
