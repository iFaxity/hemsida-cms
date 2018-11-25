const request = require('./request');

function getValues(fields) {
  return fields.reduce((acc, field) => {
    const { name, value } = field;
    acc[name] = Array.isArray(value) ? getValues(value) : value;
    return acc;
  }, {});
}

module.exports = async ctx => {
  if (ctx.url != '/robots.txt' && !ctx.url.startsWith('/dist')) {
    // TODO: deny index somehow
    const slug = ctx.url === '/' ? 'index' : ctx.url.substr(1);
    const { data: page } = await request(`http://localhost:3000/api/page/${slug}`);

    if (page) {
      const data = getValues(page.fields);
      data.title = page.title;
      data.description = page.description;
      return await ctx.render(`page/${slug}`, data);
    }
  }

  // Always send 404 if not found
  ctx.status = 404;
  await ctx.render('error', { message: '404 Not Found', status: 404 });
};
