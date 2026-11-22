// Converts any Google Drive sharing/open link to a direct browser-renderable image URL
export const toDirectImageUrl = (url, useThumbnail = false) => {
  if (!url) return "";
  if (url.startsWith("/") || url.startsWith("./") || url.startsWith("data:")) return url;
  const id = url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] || url.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1];
  if (id) {
    return useThumbnail
      ? `https://drive.google.com/thumbnail?id=${id}&sz=w1200`
      : `https://lh3.googleusercontent.com/d/${id}`;
  }
  return url;
};

export const WEB3FORMS_KEY = 
  import.meta.env.VITE_WEB3FORMS_KEY || 
  import.meta.env.WEB3FORMS_KEY || 
  import.meta.env.WEB3_KEY ||
  import.meta.env.WEB3;

export const APPS_SCRIPT_URL = 
  import.meta.env.VITE_GOOGLE_DRIVE_GALLERY_URL || 
  import.meta.env.GOOGLE_DRIVE_GALLERY_URL ||
  import.meta.env.VITE_GALLERY_API_URL ||
  import.meta.env.GALLERY_API_URL;

export async function sendFormEmail(subject, data) {
  let success = false;

  // 1. Dispatch to Web3Forms
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: subject,
        from_name: "DPS Junior Public School Website",
        ...data
      })
    });
    const result = await res.json().catch(() => null);
    if (res.ok && result?.success) {
      success = true;
    }
  } catch (err) {
    console.warn("Web3Forms dispatch error:", err);
  }

  // 2. Dispatch to Google Apps Script (sends to both school emails via Gmail)
  if (APPS_SCRIPT_URL && APPS_SCRIPT_URL.includes("script.google.com")) {
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject,
          timestamp: new Date().toISOString(),
          ...data
        })
      });
      // no-cors mode returns opaque response, treat as delivered
      success = true;
    } catch (scriptErr) {
      console.warn("Apps Script dispatch note:", scriptErr);
    }
  }

  return success;
}

export const schoolData = {
  name: "DPS JUNIOR PUBLIC SCHOOL",
  shortName: "DPS Junior",
  logoText: "DPS JUNIOR",
  tagline: "An Adventure in Learning • Inspiring Young Hearts & Curious Minds",
  established: 2004,
  gradeSpan: "Playgroup to Class VIII (Play to 8 • Ages 2 to 14 Years)",
  awardBadge: "Awarded 'Best Progressive Prep School in Foundational & Middle Pedagogy 2026'",
  heroVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-children-reading-and-learning-together-41315-large.mp4",
  campusSize: "Green Parkland Campus, Science & Tinkering Labs, Natural Woodlands",

  contact: {
    address: "Street No. 7, Meerut, Rd, Arya Nagar, Baghpat, Uttar Pradesh 250609",
    phone: "+91 9359159934",
    altPhone: "+91 9759636301",
    email: "sharma.nupur0911@gmail.com",
    altEmail: "shreyanshmanav999@gmail.com",
    emails: ["sharma.nupur0911@gmail.com", "shreyanshmanav999@gmail.com"],
    admissionsEmail: "sharma.nupur0911@gmail.com",
    officeEmail: "shreyanshmanav999@gmail.com",
    mapUrl: "https://www.google.com/maps/dir//D.P.S.+Junior+Public+School+Baghpat,+Street+No.+7,+Meerut,+Rd,+Arya+Nagar,+Baghpat,+Uttar+Pradesh+250609/@28.6182658,77.0449321,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390c530db8fa598b:0xd84ffdda7127eb2d!2m2!1d77.2262543!2d28.9447308?entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D",
    officeHours: "Monday to Friday: 8:00 AM – 3:30 PM | Saturday: 8:00 AM – 2:00 PM",
    mapEmbedUrl: "https://www.google.com/maps?q=28.9447308,77.2262543&output=embed"
  },

  // Ready Image Slots (Populated with verified real school photos)
  images: {
    hero: "/images/water_splash_day.jpg",
    campus: "/images/class8_batch.jpg",
    playgroup: "/images/students_uniform.jpg",
    middleSchool: "/images/school_excursion.jpg",
    principal: "/images/principal_nupur_sharma.jpg"
  },

  principal: {
    name: "Mrs. Nupur Sharma",
    qualification: "M.A., B.Ed. • 12+ Years Dedicated Leadership",
    title: "Principal, DPS Junior Public School Baghpat",
    image: "/images/principal_nupur_sharma.jpg",
    message: "At DPS JUNIOR PUBLIC SCHOOL, Baghpat, our journey extends from the first giggles of Playgroup through the confident, inquisitive leadership of Class 8. Aligned with Indian educational standards and CBSE experiential guidelines, we ensure childhood is never rushed. In our sunlit classrooms and discovery grounds, children learn to question courageously, think critically, and grow with deep moral roots."
  },

  stats: [
    { label: "Acres of Green Campus", value: 15, suffix: " Acres" },
    { label: "Classes Offered", value: 11, suffix: " Stages (Play–VIII)" },
    { label: "Student to Mentor Ratio", value: 10, suffix: ":1" },
    { label: "Co-Curricular Clubs & Sports", value: 24, suffix: "+" }
  ],

  // Indian School Educational Wings (Playgroup to Class VIII)
  ageStages: [
    {
      id: "foundational",
      badge: "Ages 2 – 5 Years (Playgroup to UKG)",
      title: "Foundational Pre-Primary Wing",
      subtitle: "Play, Phonics & Sensory Wonder",
      description: "Covering Playgroup, Nursery, LKG, and UKG. Guided by NEP foundational principles, children explore through tactile sensory discovery, story circles, music, and joyful peer socialization.",
      highlights: ["Playgroup, Nursery, LKG & UKG", "Gentle mentor ratio (1:6 in Nursery)", "Phonics, early numeracy & rhythm", "Daily outdoor play & activity zones"],
      image: "/images/students_uniform.jpg"
    },
    {
      id: "preparatory",
      badge: "Ages 6 – 10 Years (Classes I – V)",
      title: "Preparatory & Primary Wing",
      subtitle: "Conceptual Clarity & Inquiring Minds",
      description: "Classes 1 through 5 build solid foundations in English literacy, Hindi, Mathematics, Environmental Studies (EVS), computer coding basics, visual arts, and athletic physical education.",
      highlights: ["Classes 1, 2, 3, 4 and 5", "Hands-on STEM and Math Labs", "Bilingual proficiency & creative expression", "Public speaking & art exhibitions"],
      image: "/images/art_exhibition.jpg"
    },
    {
      id: "middle",
      badge: "Ages 11 – 14 Years (Classes VI – VIII)",
      title: "Middle School Wing",
      subtitle: "Critical Thinking, Discovery & Leadership",
      description: "Classes 6 through 8 prepare young scholars for senior board excellence with specialized labs for Science, Advanced Mathematics, Social Sciences, Computer/Coding, and competitive sports fixtures.",
      highlights: ["Classes 6, 7 and 8 (Junior High)", "Integrated Curriculum & Lab Practicals", "Excursions, Heritage Tours & Quizzes", "Inter-school debates & competitive sports"],
      image: "/images/class8_batch.jpg"
    }
  ],

  classesList: [
    { id: "playgroup", name: "Playgroup", wing: "Pre-Primary", age: "2–3 Years" },
    { id: "nursery", name: "Nursery", wing: "Pre-Primary", age: "3–4 Years" },
    { id: "lkg", name: "LKG (Lower KG)", wing: "Pre-Primary", age: "4–5 Years" },
    { id: "ukg", name: "UKG (Upper KG)", wing: "Pre-Primary", age: "5–6 Years" },
    { id: "class-1", name: "Class I (Grade 1)", wing: "Primary", age: "6–7 Years" },
    { id: "class-2", name: "Class II (Grade 2)", wing: "Primary", age: "7–8 Years" },
    { id: "class-3", name: "Class III (Grade 3)", wing: "Primary", age: "8–9 Years" },
    { id: "class-4", name: "Class IV (Grade 4)", wing: "Primary", age: "9–10 Years" },
    { id: "class-5", name: "Class V (Grade 5)", wing: "Primary", age: "10–11 Years" },
    { id: "class-6", name: "Class VI (Grade 6)", wing: "Middle", age: "11–12 Years" },
    { id: "class-7", name: "Class VII (Grade 7)", wing: "Middle", age: "12–13 Years" },
    { id: "class-8", name: "Class VIII (Grade 8)", wing: "Middle", age: "13–14 Years" }
  ],

  testimonials: [
    {
      quote: "Sending our children to DPS JUNIOR PUBLIC SCHOOL is the single best decision we have made. The sheer enthusiasm they have when stepping into the classroom each morning is incredible. From Nursery to Class 7, the mentors know every child's spark.",
      author: "Priya & Rajesh Singhania",
      role: "Parents of Ananya (Class VII) & Kabir (Nursery)"
    },
    {
      quote: "DPS Junior strikes the perfect balance of strong academics and joyful, unhurried childhood. Our son is himself here, confident and curious.",
      author: "David & Meera Richardson",
      role: "Parents of Liam (Class V)"
    },
    {
      quote: "The teachers notice the small things — a child who loves botany, a budding mathematician, a shy reader. They unlock their gifts with such patience and joy.",
      author: "Dr. Sunita Batra",
      role: "Alumni Parent & Paediatrician"
    }
  ],

  // Default Real School Gallery Photos — Populated with verified DPS Junior school photos
  gallery: [
    {
      id: 1,
      title: "Class VIII Batch 2025–26",
      caption: "Senior graduating Class 8 students with Principal Mrs. Nupur Sharma and faculty members.",
      category: "Campus & Facilities",
      url: "/images/class8_batch.jpg"
    },
    {
      id: 2,
      title: "Diwali Festivities & Rangoli",
      caption: "Principal Mam and students celebrating Diwali with handmade Ram Mandir rangoli and traditional attire.",
      category: "Festivals & Celebrations",
      url: "/images/diwali_celebration.jpg"
    },
    {
      id: 3,
      title: "Summer Water Splash Day",
      caption: "Joyful water splash and pool activities promoting friendship, refreshment, and physical agility.",
      category: "Sports & Yoga",
      url: "/images/water_splash_day.jpg"
    },
    {
      id: 4,
      title: "Children's Day Celebrations",
      caption: "Joyful Children's Day activities, star craft badges, and classroom celebration.",
      category: "Festivals & Celebrations",
      url: "/images/childrens_day.jpg"
    },
    {
      id: 5,
      title: "Student Art & Painting Exhibition",
      caption: "Young artists proudly showcasing their colorful canvas landscape paintings and creative artwork.",
      category: "Classrooms & Activities",
      url: "/images/art_exhibition.jpg"
    },
    {
      id: 6,
      title: "Historical Heritage Excursion",
      caption: "Educational excursion tour exploring historic monuments with Principal Mam and teachers.",
      category: "Campus & Facilities",
      url: "/images/school_excursion.jpg"
    },
    {
      id: 7,
      title: "Excellence & Merit Felicitation",
      caption: "Student awarded championship trophy and certificate of honor with Principal Mam and dignitaries.",
      category: "Annual Day & Stage",
      url: "/images/award_ceremony.jpg"
    },
    {
      id: 8,
      title: "Foundational & Primary Learners",
      caption: "Young students in smart DPS uniform enjoying their interactive classroom campus.",
      category: "Playgroup & Kindergarten",
      url: "/images/students_uniform.jpg"
    },
    {
      id: 9,
      title: "Morning Assembly & News Reading",
      caption: "Disciplined morning assembly fostering focus, newspaper reading habits, and shared community values.",
      category: "Campus & Facilities",
      url: "/images/assembly_morning.jpg"
    },
    {
      id: 10,
      title: "Academic Recognition & Certificates",
      caption: "Meritorious students felicitated with framed certificates of achievement on stage.",
      category: "Annual Day & Stage",
      url: "/images/graduation_felicitation.jpg"
    },
    {
      id: 11,
      title: "Drawing & Sketching Competition",
      caption: "All-school creative expression competition fostering imagination and fine motor skills.",
      category: "Classrooms & Activities",
      url: "/images/art_competition.jpg"
    },
    {
      id: 12,
      title: "Eco-Awareness 'Save Earth' Poster",
      caption: "Hands-on environmental poster making and creative thinking on nature conservation.",
      category: "Classrooms & Activities",
      url: "/images/creative_art.jpg"
    }
  ],

  // School Notices / Circulars — add or edit notices here
  notices: [
    {
      id: 1,
      title: "Winter Break Holiday Notice 2026-27",
      content: "School will remain closed from 25th December 2026 to 1st January 2027 for Winter Break. Classes resume on 2nd January 2027.",
      category: "Holiday",
      date: "2026-12-15",
      important: false
    },
    {
      id: 2,
      title: "Annual Sports Day — Parent Invitation",
      content: "Parents are cordially invited to the Annual Sports Day on 15th January 2027 at 9:00 AM on the school grounds. All parents and guardians are welcome.",
      category: "Event",
      date: "2027-01-05",
      important: true
    },
    {
      id: 3,
      title: "Admissions Open for Session 2027-28",
      content: "Admissions for the academic session 2027-28 are now open for all classes from Playgroup to Class VIII. Contact the admissions office for the registration form.",
      category: "Academic",
      date: "2026-11-01",
      important: true
    }
  ]
};
