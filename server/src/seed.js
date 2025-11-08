require('dotenv').config();
const mongoose = require('mongoose');

const Profile = require('./models/Profile');
const Project = require('./models/Project');
const Skills = require('./models/Skills');
const Media = require('./models/Media');

const { MONGO_URI } = process.env;

async function seed() {
  try {
    if (!MONGO_URI) throw new Error('Missing MONGO_URI in .env');

    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Clear all collections
    await Promise.all([
      Profile.deleteMany({}),
      Project.deleteMany({}),
      Skills.deleteMany({}),
      Media.deleteMany({})
    ]);
    console.log('🧹 Cleared existing data');

    // Profile
    await Profile.create({
      name: 'Sayan Khadka',
      tagline: 'Showcasing Tech & Creativity',
      bio: 'Bachelor of Information Technology student and travel vlogger from Nepal, currently based in Tauranga, New Zealand. I bridge the gap between technology and creative content, building modern web applications while sharing my journey through video storytelling.',
      contact: { email: 'sayankhadka211@gmail.com' },
      social: {
        linkedin: 'https://www.linkedin.com/in/sayan-k211/',
        github: 'https://github.com/sayan-k211',
        youtube: 'https://www.youtube.com/@sayan_k211',
        instagram: 'https://www.instagram.com/sayan_k211/',
        facebook: 'https://www.facebook.com/Sayank211'
      },
      profileImage: '/assets/pp.jpg',
      resumeFile: '/resume/Sayan_Khadka_Resume.pdf'
    });
    console.log('✅ Profile created');

    // Projects
    await Project.insertMany([
      {
        title: 'SwasthyaFuel',
        technologies: ['React Native', 'Firebase', 'Node.js', 'Google Maps API'],
        description:
          'A culturally adaptive meal prep app for international students featuring local ingredient substitutions, macro tracking, and Firebase authentication. My flagship project combining design, culture, and fitness technology.',
        imageUrl: '/projects/project_swasthyafuel.png',
        github: 'https://github.com/sayan-k211/International-students',
        link: '#',
        featured: true
      },
      {
        title: 'Supabase CRUD App',
        technologies: ['React.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
        description:
          'A simple yet scalable CRUD application built using Supabase backend and React frontend. Demonstrates authentication, data persistence, and responsive UI with modern styling.',
        imageUrl: '/projects/project_supabase.jpg',
        github: 'https://github.com/sayan-k211/supabase_crud_final',
        link: '#',
        featured: true
      },
      {
        title: 'SCP Foundation React App',
        technologies: ['React.js', 'JavaScript', 'REST API', 'CSS3'],
        description:
          'A front-end React application inspired by the SCP Foundation universe. Features live API fetching, category filtering, and a dark UI styled as a classified document database.',
        imageUrl: '/projects/project_scp.jpg',
        github: 'https://github.com/sayan-k211/React-App',
        link: '#',
        featured: true
      }
    ]);
    console.log('✅ Projects created');

    // Skills
    await Skills.create({
      technical: [
        { name: 'JavaScript', level: 85, category: 'Programming Language' },
        { name: 'TypeScript', level: 80, category: 'Programming Language' },
        { name: 'Python', level: 75, category: 'Programming Language' },
        { name: 'Java', level: 70, category: 'Programming Language' },
        { name: 'C#', level: 65, category: 'Programming Language' },
        { name: 'Angular', level: 80, category: 'Frontend Framework' },
        { name: 'React', level: 85, category: 'Frontend Framework' },
        { name: 'Node.js', level: 80, category: 'Backend Framework' },
        { name: 'Express.js', level: 80, category: 'Backend Framework' },
        { name: 'MongoDB', level: 75, category: 'Database' },
        { name: 'MySQL', level: 70, category: 'Database' },
        { name: 'Git & GitHub', level: 85, category: 'Tools' },
        { name: 'REST APIs', level: 80, category: 'Backend' }
      ],
      creative: [
        { name: 'Adobe Premiere Pro', level: 90, category: 'Video Editing' },
        { name: 'CapCut', level: 95, category: 'Video Editing' },
        { name: 'Adobe Photoshop', level: 75, category: 'Design' },
        { name: 'Canva', level: 85, category: 'Design' },
        { name: 'Color Grading', level: 85, category: 'Post-Production' },
        { name: 'Storytelling', level: 90, category: 'Content Creation' }
      ],
      certifications: [
        {
          name: 'Bachelor of Information Technology',
          issuer: 'Toi Ohomai Institute of Technology',
          status: 'In Progress'
        }
      ]
    });
    console.log('✅ Skills created');

    // Media (YouTube)
    await Media.create({
      platform: 'YouTube',
      channelName: 'Sayan Khadka',
      channelUrl: 'https://www.youtube.com/@sayan_k211',
      statistics: { subscribers: 1662, totalViews: 200265 },
      featuredVideos: [
        {
          videoId: '0-KNjOJfFkI',
          title: 'Dashain Celebration in Nepal',
          thumbnailUrl: '/thumbnails/dashain_thumbnail.png',
          featured: true
        },
        {
          videoId: 'tfQjFb85cHQ',
          title: 'Exploring Hobbiton – The Shire Experience',
          thumbnailUrl: '/thumbnails/hobbiton_thumbnail.png',
          featured: true
        }
      ]
    });
    console.log('✅ Media created');

    // Summary
    const [pCount, projCount, sCount, mCount] = await Promise.all([
      Profile.countDocuments(),
      Project.countDocuments(),
      Skills.countDocuments(),
      Media.countDocuments()
    ]);

    console.log('\n📊 Database Summary:');
    console.log(`   Profiles: ${pCount}`);
    console.log(`   Projects: ${projCount}`);
    console.log(`   Skills: ${sCount}`);
    console.log(`   Media: ${mCount}`);
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seed();
