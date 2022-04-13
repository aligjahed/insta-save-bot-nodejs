const axios = require("axios").default;
const { parse } = require("node-html-parser");

const getPostLink = async (url) => {
  url = url + "embed";
  let res = "";

  res = await axios.get(url).catch((err) => console.log(err));

  const link = await getLink(res);

  return link;
};

const getLink = async (res) => {
  const root = parse(res.data);

  let outType = "";
  let link = "";

  if (res.data.search("video_url") != -1) {
    link = await getVideoLinkFromHtml(res.data);
    outType = "video";
  } else {
    link = root.querySelector("img.EmbeddedMediaImage").getAttribute("src");
    outType = "photo";
  }

  while (link.search("&amp;") != -1) {
    link = link.replace("&amp;", "&");
  }

  return { link, outType };
};

const getVideoLinkFromHtml = async (html) => {
  let crop =
    '{"' +
    html.substring(html.search("video_url"), html.search("video_url") + 1000);

  crop = crop.substring(0, crop.search(",")) + "}";

  return await JSON.parse(crop).video_url;
};

module.exports = { getPostLink };
