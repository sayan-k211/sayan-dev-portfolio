const path = require('path');
const fs = require('fs');

const DEFAULT_RESUME = path.join(__dirname, '..', 'public', 'resume', 'Sayan_Khadka_Resume.pdf');

exports.download = async (req, res) => {
  try {
    const filePath = process.env.RESUME_FILE_PATH || DEFAULT_RESUME;
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, error: 'Resume not found' });
    }

    const filename = path.basename(filePath).replace(/\s+/g, '_');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.sendFile(filePath);
  } catch (err) {
    console.error('resume download error:', err);
    res.status(500).json({ success: false, error: 'Failed to serve resume' });
  }
};
