const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skills  = require('../models/Skills');
const Media   = require('../models/Media');


const makeAbs = (req, urlPath) => {
  if (!urlPath) return '';
  if (urlPath.startsWith('http')) return urlPath;
  const host = req.get('x-forwarded-host') || req.get('host');
  const proto = req.get('x-forwarded-proto') || req.protocol || 'http';
  return `${proto}://${host}${urlPath.startsWith('/') ? '' : '/'}${urlPath}`;
};


exports.getProfile = async (req, res, next) => {
  try {
    const doc = await Profile.findOne({})
      .select('name tagline bio contact social profileImage resumeFile')
      .lean();

    const withAbs = doc
      ? {
          ...doc,
          profileImageAbsUrl: makeAbs(req, doc.profileImage),
          resumeFileAbsUrl: makeAbs(req, doc.resumeFile)
        }
      : {};

    res.json({ success: true, data: withAbs });
  } catch (err) {
    next(err);
  }
};


exports.getProjects = async (req, res, next) => {
  try {
    const items = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('title technologies description imageUrl link github featured')
      .lean();

    const base = `${req.protocol}://${req.get('host')}`;
    const withAbs = items.map(p => ({
      ...p,
      imageAbsUrl: p.imageUrl ? `${base}${p.imageUrl}` : null,
    }));

    res.json({ success: true, data: withAbs });
  } catch (err) {
    next(err);
  }
};



exports.getSkills = async (_req, res, next) => {
  try {
    const doc = await Skills.findOne({})
      .select('technical creative')
      .lean();
    res.json({ success: true, data: doc || { technical: [], creative: [] } });
  } catch (err) {
    next(err);
  }
};


exports.getMedia = async (_req, res, next) => {
  try {
    const doc = await Media.findOne({})
      .select('platform channelName statistics featuredVideos')
      .lean();
    res.json({ success: true, data: doc || {} });
  } catch (err) {
    next(err);
  }
};
