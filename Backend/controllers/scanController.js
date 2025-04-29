// Backend/controllers/scanController.js
const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');

const crawlWebsite = async (req, res) => {
  const { websiteUrl } = req.body;

  if (!websiteUrl) {
    return res.status(400).json({ error: 'Website URL is required' });
  }

  const visitedUrls = new Set();
  const discoveredLinks = new Set();
  const brokenLinks = [];
  const linkSources = new Map();

  const crawl = async (url, source = null) => {
    if (visitedUrls.has(url)) return;
    visitedUrls.add(url);

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      $('a[href]').each((_, element) => {
        const href = $(element).attr('href');
        const absoluteUrl = new URL(href, url).href;

        if (absoluteUrl.startsWith(websiteUrl)) {
          discoveredLinks.add(absoluteUrl);
          if (!linkSources.has(absoluteUrl)) {
            linkSources.set(absoluteUrl, []);
          }
          linkSources.get(absoluteUrl).push(url);
          crawl(absoluteUrl, url);
        }
      });
    } catch (error) {
      console.error(`Error crawling ${url}:`, error.message);
    }
  };

  const checkBrokenLinks = async () => {
    for (const link of discoveredLinks) {
      try {
        const response = await axios.head(link);
        if (response.status >= 400) {
          brokenLinks.push({
            url: link,
            statusCode: response.status,
            foundOn: linkSources.get(link),
          });
        }
      } catch (error) {
        const statusCode = error.response ? error.response.status : 'Unknown';
        brokenLinks.push({
          url: link,
          statusCode,
          foundOn: linkSources.get(link),
        });
      }
    }
  };

  try {
    await crawl(websiteUrl);
    await checkBrokenLinks();

    const orphanedPages = [...visitedUrls].filter(
      (url) => !discoveredLinks.has(url)
    );

    res.json({
      brokenLinks,
      orphanedPages,
      allScannedUrls: [...visitedUrls],
    });
  } catch (error) {
    console.error('Error during crawling:', error.message);
    res.status(500).json({ error: 'An error occurred during crawling' });
  }
};

module.exports = { crawlWebsite };