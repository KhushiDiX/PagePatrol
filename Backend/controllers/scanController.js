// Backend/controllers/scanController.js
const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');
const ScanModel = require('../models/scanModel');


const crawlWebsite = async (req, res) => {
  const { websiteUrl, userId } = req.body;
  // Set the maximum number of URLs to scan
  const MAX_URLS_TO_SCAN = 50;

  if (!websiteUrl) {
    return res.status(400).json({ error: 'Website URL is required' });
  }

  // Create a new scan record
  const newScan = new ScanModel({
    user: userId,
    targetUrl: websiteUrl,
    status: 'Running',
    startedAt: new Date()
  });

  try {
    // Save initial scan record
    const savedScan = await newScan.save();
    const scanId = savedScan._id;

    // Start crawling process
    const visitedUrls = new Set();
    const discoveredLinks = new Set();
    const brokenLinks = [];
    const linkSources = new Map();

    const crawl = async (url, source = null) => {
      // Check if we've reached the maximum limit of URLs to scan
      if (visitedUrls.size >= MAX_URLS_TO_SCAN) return;
      if (visitedUrls.has(url)) return;
      visitedUrls.add(url);

      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        $('a[href]').each((_, element) => {
          const href = $(element).attr('href');
          try {
            const absoluteUrl = new URL(href, url).href;

            if (absoluteUrl.startsWith(websiteUrl)) {
              discoveredLinks.add(absoluteUrl);
              if (!linkSources.has(absoluteUrl)) {
                linkSources.set(absoluteUrl, []);
              }
              linkSources.get(absoluteUrl).push(url);
              // Only continue crawling if we haven't reached the limit
              if (visitedUrls.size < MAX_URLS_TO_SCAN) {
                crawl(absoluteUrl, url);
              }
            }
          } catch (err) {
            // Ignore invalid URLs
            console.error(`Invalid URL: ${href}`, err.message);
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

    await crawl(websiteUrl);
    await checkBrokenLinks();

    const orphanedPages = [...visitedUrls].filter(
      (url) => !discoveredLinks.has(url) && url !== websiteUrl // Exclude the root URL
    );

    // Update scan record with results
    await ScanModel.findByIdAndUpdate(scanId, {
      status: 'Completed',
      finishedAt: new Date(),
      brokenLinks: brokenLinks,
      orphanedPages: orphanedPages
    });

    // Send response back to client
    res.json({
      scanId,
      brokenLinks,
      orphanedPages,
      allScannedUrls: [...visitedUrls],
    });
  } catch (error) {
    console.error('Error during crawling:', error.message);

    // Update scan record to failed status
    if (newScan._id) {
      await ScanModel.findByIdAndUpdate(newScan._id, {
        status: 'Failed',
        finishedAt: new Date()
      });
    }

    res.status(500).json({ error: 'An error occurred during crawling' });
  }
};

module.exports = { crawlWebsite };