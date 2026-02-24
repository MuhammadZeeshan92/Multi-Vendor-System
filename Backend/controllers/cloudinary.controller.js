const crypto = require('crypto');

// GET /api/cloudinary-signature
// Returns signed params for direct client-side upload to Cloudinary
exports.getSignature = (req, res) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = 'products';
    // validate env
    const { CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } = process.env;
    if (!CLOUDINARY_API_SECRET || !CLOUDINARY_API_KEY || !CLOUDINARY_CLOUD_NAME) {
    //   console.error('Cloudinary env missing', { CLOUDINARY_API_KEY: !!CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME: !!CLOUDINARY_CLOUD_NAME });
      return res.status(500).json({ message: 'Cloudinary credentials not configured on server' });
    }

    const paramsToSign = { folder, timestamp };
    // Build stringToSign by sorting keys alphabetically (Cloudinary requirement)
    const stringToSign = Object.keys(paramsToSign)
      .sort()
      .map((k) => `${k}=${paramsToSign[k]}`)
      .join('&');

    const signature = crypto.createHash('sha1').update(stringToSign + CLOUDINARY_API_SECRET).digest('hex');

    // log timestamp + signature for debugging (do not log secrets)
    // console.debug('Cloudinary signature generated', { cloud: CLOUDINARY_CLOUD_NAME: CLOUDINARY_CLOUD_NAME, timestamp, signature });

    return res.json({
      timestamp,
      signature,
      cloudName: CLOUDINARY_CLOUD_NAME,
      apiKey: CLOUDINARY_API_KEY,
      folder,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
