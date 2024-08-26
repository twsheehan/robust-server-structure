const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

function list(req, res) {
  res.json({ data: urls });
}

function urlExists(req, res, next) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((url) => url.id === urlId);
  if (foundUrl) {
    res.locals.url = foundUrl;
    return next();
  }
  next({
    status: 404,
    message: `Url id not found: ${req.params.urlId}`,
  });
}

function read(req, res) {
  const { url } = res.locals;

  // Record a new 'use' in uses-data.js
  const newUse = {
    id: uses.length + 1,
    urlId: url.id,
    time: Date.now(),
  };
  uses.push(newUse);
  console.info(JSON.stringify(newUse));

  // Get all uses for the current URL
  const urlUses = uses.filter((use) => use.urlId === url.id);
  console.info(urlUses);

  res.json({ data: url });
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}

function create(req, res) {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: urls.length + 1, // Increment id to be the next urls.length
    href,
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function update(req, res) {
  const url = res.locals.url;
  const { data: { href } = {} } = req.body;

  // Update the url.href
  url.href = href;
  res.json({ data: url });
}

module.exports = {
  create: [bodyDataHas("href"), create],
  list,
  read: [urlExists, read],
  update: [urlExists, bodyDataHas("href"), update],
  urlExists,
};
