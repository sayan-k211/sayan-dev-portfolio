require('dotenv').config();
const mongoose = require('mongoose');

const Profile = require('./models/Profile');
const Project = require('./models/Project');
const Skills  = require('./models/Skills');
const Media   = require('./models/Media');

/**
 * Seeds MongoDB with the site content.
 *
 * The deployed site does NOT read from this database. It is built as static
 * assets and serves the same content from client/public/data/*.json, which is
 * generated from what is seeded here. If you change content, change both, or
 * re-export the API responses into client/public/data/.
 */

const PROFILE = {
        "name": "Sayan Khadka",
        "tagline": "Showcasing Tech & Creativity",
        "bio": "I graduated from Toi Ohomai in 2026 with a Bachelor of Applied Information Technology and I am based in Tauranga, New Zealand. I build web and mobile applications, most recently a voice activated Android app for a conservation research team who now use it in the field. I also run a YouTube channel where I edit and tell stories in video.",
        "contact": {
          "email": "sayankhadka211@gmail.com"
        },
        "social": {
          "linkedin": "https://www.linkedin.com/in/sayan-k211/",
          "github": "https://github.com/sayan-k211",
          "youtube": "https://www.youtube.com/@sayan_k211",
          "instagram": "https://www.instagram.com/sayan_k211/",
          "facebook": "https://www.facebook.com/Sayank211"
        },
        "profileImage": "/assets/pp.jpg",
        "resumeFile": "/resume/Sayan_Khadka_Resume.pdf"
      };

const PROJECTS = [
        {
          "title": "Roadkill Counter",
          "technologies": [
            "React Native",
            "Kotlin",
            "Firebase",
            "Sherpa-ONNX"
          ],
          "description": "A hands free Android app built for two conservation researchers at Toi Ohomai. Drivers report possum roadkill by voice without touching the screen, and the app saves the location, time and a spoken freshness answer to Firestore. Delivered end to end and installed on the client's own device.",
          "imageUrl": "/projects/project_roadkill.png",
          "link": "#",
          "github": "",
          "featured": true
        },
        {
          "title": "SwasthyaFuel",
          "technologies": [
            "React Native",
            "Firebase",
            "Expo"
          ],
          "description": "A meal preparation app for international students that suggests locally available substitutes for cultural ingredients they cannot find abroad, with macro tracking alongside. Firebase authentication and Firestore, published to Google Play as an internal test release.",
          "imageUrl": "/projects/project_swasthyafuel.png",
          "link": "#",
          "github": "https://github.com/sayan-k211/swasthyafuel",
          "featured": true
        },
        {
          "title": "Supabase CRUD App",
          "technologies": [
            "React.js",
            "Supabase",
            "PostgreSQL",
            "Tailwind CSS"
          ],
          "description": "A CRUD application with a React frontend and a Supabase backend running on PostgreSQL. Covers authentication, data persistence and a responsive interface.",
          "imageUrl": "/projects/project_supabase.jpg",
          "link": "#",
          "github": "https://github.com/sayan-k211/supabase_crud_final",
          "featured": true
        }
      ];

const SKILLS = {
        "technical": [
          {
            "name": "TypeScript",
            "level": "Confident",
            "category": "Languages"
          },
          {
            "name": "JavaScript",
            "level": "Confident",
            "category": "Languages"
          },
          {
            "name": "HTML, CSS and SCSS",
            "level": "Confident",
            "category": "Languages"
          },
          {
            "name": "C#",
            "level": "Working knowledge",
            "category": "Languages"
          },
          {
            "name": "Kotlin",
            "level": "Working knowledge",
            "category": "Languages"
          },
          {
            "name": "Python",
            "level": "Working knowledge",
            "category": "Languages"
          },
          {
            "name": "PHP",
            "level": "Working knowledge",
            "category": "Languages"
          },
          {
            "name": "SQL and T-SQL",
            "level": "Working knowledge",
            "category": "Languages"
          },
          {
            "name": "Angular",
            "level": "Confident",
            "category": "Frontend"
          },
          {
            "name": "React",
            "level": "Confident",
            "category": "Frontend"
          },
          {
            "name": "React Native and Expo",
            "level": "Confident",
            "category": "Frontend"
          },
          {
            "name": "Node.js and Express",
            "level": "Confident",
            "category": "Backend and data"
          },
          {
            "name": "REST API design",
            "level": "Confident",
            "category": "Backend and data"
          },
          {
            "name": "MongoDB and Mongoose",
            "level": "Confident",
            "category": "Backend and data"
          },
          {
            "name": "Firebase",
            "level": "Confident",
            "category": "Backend and data"
          },
          {
            "name": "Microsoft SQL Server",
            "level": "Working knowledge",
            "category": "Backend and data"
          },
          {
            "name": "MySQL",
            "level": "Working knowledge",
            "category": "Backend and data"
          },
          {
            "name": "Supabase and PostgreSQL",
            "level": "Working knowledge",
            "category": "Backend and data"
          },
          {
            "name": "Git and GitHub",
            "level": "Confident",
            "category": "Tools and practice"
          },
          {
            "name": "Debugging and root cause analysis",
            "level": "Confident",
            "category": "Tools and practice"
          },
          {
            "name": "Android Studio and Gradle",
            "level": "Working knowledge",
            "category": "Tools and practice"
          },
          {
            "name": "Azure",
            "level": "Learning",
            "category": "Tools and practice"
          }
        ],
        "creative": [
          {
            "name": "CapCut",
            "level": "Confident",
            "category": "Video"
          },
          {
            "name": "Adobe Premiere Pro",
            "level": "Confident",
            "category": "Video"
          },
          {
            "name": "Colour grading",
            "level": "Confident",
            "category": "Video"
          },
          {
            "name": "Storytelling",
            "level": "Confident",
            "category": "Content"
          },
          {
            "name": "Canva",
            "level": "Confident",
            "category": "Design"
          },
          {
            "name": "Adobe Photoshop",
            "level": "Working knowledge",
            "category": "Design"
          }
        ],
        "certifications": [
          {
            "name": "Bachelor of Applied Information Technology",
            "issuer": "Toi Ohomai Institute of Technology",
            "status": "Completed 2026"
          },
          {
            "name": "Microsoft Azure Fundamentals (AZ-900)",
            "issuer": "Microsoft",
            "status": "In progress"
          },
          {
            "name": "Front End Developer Internship",
            "issuer": "Leading Edge Software, Nepal",
            "status": "Completed 2022"
          },
          {
            "name": "High School Diploma, Science and Computing",
            "issuer": "Kanchanjunga English Higher Secondary School, Nepal",
            "status": "Completed 2021"
          }
        ]
      };

const MEDIA = {
        "platform": "YouTube",
        "channelName": "Sayan Khadka",
        "channelUrl": "https://www.youtube.com/@sayan_k211",
        "statistics": {
          "subscribers": 1758,
          "totalViews": 268508
        },
        "featuredVideos": [
          {
            "videoId": "0-KNjOJfFkI",
            "title": "Dashain Celebration in Nepal",
            "thumbnailUrl": "/thumbnails/dashain_thumbnail.png",
            "featured": true
          },
          {
            "videoId": "tfQjFb85cHQ",
            "title": "Exploring Hobbiton - The Shire Experience",
            "thumbnailUrl": "/thumbnails/hobbiton_thumbnail.png",
            "featured": true
          }
        ]
      };

async function seed() {
  const { MONGO_URI } = process.env;

  try {
    if (!MONGO_URI) throw new Error('Missing MONGO_URI in .env');

    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    await Promise.all([
      Profile.deleteMany({}),
      Project.deleteMany({}),
      Skills.deleteMany({}),
      Media.deleteMany({})
    ]);
    console.log('Cleared existing data');

    await Profile.create(PROFILE);
    await Project.insertMany(PROJECTS);
    await Skills.create(SKILLS);
    await Media.create(MEDIA);

    console.log('Seeded:');
    console.log('  profiles  ', await Profile.countDocuments());
    console.log('  projects  ', await Project.countDocuments());
    console.log('  skills    ', await Skills.countDocuments());
    console.log('  media     ', await Media.countDocuments());
  } catch (err) {
    console.error('Seeding error:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
