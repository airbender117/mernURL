const generateShortId = require('ssid');
const URL = require('../models/url')

async function handleURLGenerator(req, res) {
    const body = req.body
    if (!body.url) return res.status(400).json({ error: 'url is required' })
    const shortId = generateShortId();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.json({ shortId: shortId,redirectURL:body.url,visitHistory:body.visitHistory, data: "Use it in the homepage" })
    
    


}
async function handleRedirect(req, res) {
    try {
        const { shortId } = req.params;
        
        const entry = await URL.findOneAndUpdate(
            {
                shortId,
                
            },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }
        );


        if (!entry || !entry.redirectURL) {
            console.error('Entry or redirectURL not found');
            return res.status(404).send('Not found');
        }
        return res.redirect(entry.redirectURL)


    }
    catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}
async function handleGetAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ message: "Short URL not found" });
        }

        const data = result.visitHistory.map(v=> v.toObject()) || [];

        const converted = data.map(obj => {
            const readableTime = new Date(obj.timestamp).toLocaleString();
            return {
                ...obj,
                readableTime
            };
        });

        return res.json({
            totalClicks: data.length,
            analytics: converted
        });

    } catch (error) {
        console.error("Error in handleGetAnalytics:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}










module.exports = {
    handleURLGenerator,
    handleRedirect,
    handleGetAnalytics,

}