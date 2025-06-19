const generateShortId = require("ssid");
const URL = require("../models/url");
//const USER = require("../models/User")

async function handleURLGenerator(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = generateShortId();
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: body.visitHistory,
    data: "Use it in the homepage",
  });
}




const handlePostRedirect = async (req, res) => {
  try {
    const  {shortId}  = req.body;

    if (!shortId) {
      return res.status(400).json({ error: "shortId is required" });
    }

    const entry = await URL.findOne({ shortId });
    
    console.log("Redirect entry found:", entry);

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    return res.json({ redirect: entry.redirectURL });
  } catch (error) {
    console.error("Error in handlePostRedirect:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};




const handleGetAnalytics = async (req, res) => {
  try {
    const { shortId } = req.params;
    // return res.json({msg:shortId})
    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    const data = result.visitHistory.map((v) => v.toObject()) || [];

    const converted = data.map((obj) => {
      const readableTime = new Date(obj.timestamp).toLocaleString();
      return {
        ...obj,
        readableTime,
      };
    });

    return res.json({
      totalClicks: data.length,
      analytics: converted,
    });
  } catch (error) {
    console.error("Error in handleGetAnalytics:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// async function handleGetRedirect(req, res) {
//   try {
//     const { shortId } = req.params;

//     const record = await URL.findOne({ shortId });
//     if (!record) {
//       res.status(400).json({ message: "Short link not found" });
//     } else {
//       return res.json({ message: record.redirectURL });
//     }
//   } catch (error) {
//     console.error({ message: error });
//   }
// }

const handleGetRedirect = async (req, res) =>{
  try {
    const { shortId } = req.params;
    console.log("Received GET request for shortId:", req.params.shortId);

    const entry = await URL.findOne({shortId});

    if (!entry) {
      console.error("Entry not found");
      return res.status(404).send("Not found");
    }
// return res.json({
//   message: "Original URL found",
//   redirectURL: entry.redirectURL,
//   shortId: shortId
// });
return res.redirect(entry.redirectURL)

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  handleURLGenerator,
  handlePostRedirect,
  handleGetAnalytics,
  handleGetRedirect,
};
