// routes/shortlink.js
const ShortLink = require("../models/shortLinkSchema");
const ClickAnalytics = require("../models/clickAnalyticsSchema");
const crypto = require("node:crypto");
const useragent = require("useragent");
const requestIp = require("request-ip");
const { nanoid } = require("nanoid");
const clickAnalyticsSchema = require("../models/clickAnalyticsSchema");

// Create short link
exports.createShortLink = async (req, res) => {
  const { originalUrl, customAlias, expirationDate } = req.body;
  const userId = req.user.id;

  try {
    let shortCode=null;
    if (customAlias) {
      const isUserAliasExist = await ShortLink.findOne({
        shortCode: customAlias,
      });
      if (isUserAliasExist) {
        return res.status(400).json({
          success: false,
          message: "Custom alias already in use",
        });
      }
      shortCode=customAlias;
    } else {
      shortCode=nanoid(8)
    }
    // Check uniqueness of shortCode
    const existing = await ShortLink.findOne({ shortCode });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Custom alias already in use",
      });
    }

    const shortLink = new ShortLink({
      originalUrl,
      shortCode,
      customAlias,
      expirationDate,
      userId,
    });

    await shortLink.save();
    res.status(201).json({
      success: true,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
    });
  } catch (err) {
    console.log("ERROR : ", err)
    res.status(500).json({
      success: false,
      message: "Error creating short link",
    });
  }
};

// Redirect short link
exports.redirectLink = async (req, res) => {
  const { id: code } = req.params;

  try {
    const link = await ShortLink.findOne({ shortCode: code });
    if (!link) {
      return res.status(404).json({
        success: false,
        message: "Short link not found",
      });
    }

    // Check expiration
    if (link.expirationDate && new Date(link.expirationDate) < new Date()) {
      return res.status(410).json({
        success: false,
        message: "Link expired",
      });
    }

    link.totalClicks++;
    await link.save();

    const agent = useragent.parse(req.headers["user-agent"]);
    const deviceType = `${agent.os.family} ${agent.os.major}`;
    const browser = `${agent.family} ${agent.major}`;
    const ip = requestIp.getClientIp(req);

    ClickAnalytics.create({
      linkId: link._id,
      userId: link.userId,
      deviceType,
      browser,
      ip,
    });

    res.status(301).redirect(link.originalUrl);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Error in redirecting link",
    });
  }
};


exports.getAllUserLinks = async (req, res) => {
  const userId = req.user.id;
  try {
    const links = await ShortLink.find({ userId });
    if (!links || links.length === 0) {
      return res.status(401).json({
        success: false,
        message: "No links found for this user",
      });
    }

    res.status(200).json({
      success: true,
      links,
    });
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching user links",
    });
  }
};

exports.getAnalytics=async (req, res) => {
    const userId = req.user.id;
  
    try {
      const clicks = await clickAnalyticsSchema.find({userId:userId}).populate('linkId');
      res.json({ success: true, clicks});
    } catch (err) {
      console.error("Error fetching analytics data:", err);
      res.status(500).json({ success: false, message: "Error fetching analytics data" });
    }
  }