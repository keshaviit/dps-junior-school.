// Converts any Google Drive sharing/open link to a direct browser-renderable image URL
export const toDirectImageUrl = (url, useThumbnail = false) => {
  if (!url) return "";
  const id = url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] || url.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1];
  if (id) {
    return useThumbnail
      ? `https://drive.google.com/thumbnail?id=${id}&sz=w1200`
      : `https://lh3.googleusercontent.com/d/${id}`;
  }
  return url;
};

export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export async function sendFormEmail(subject, data) {
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
    return res.ok;
  } catch (err) {
    console.error("Form email dispatch error:", err);
    return false;
  }
}

export const schoolData = {
  name: "DPS JUNIOR PUBLIC SCHOOL",
  shortName: "DPS Junior",
  logoText: "DPS JUNIOR",
  tagline: "An Adventure in Learning • Inspiring Young Hearts & Curious Minds",
  established: 2004,
  affiliation: "Affiliated to Central Board of Secondary Education (CBSE), New Delhi",
  affiliationNo: "CBSE/AFF/2130894",
  gradeSpan: "Playgroup to Class VIII (Play to 8 • Ages 2 to 14 Years)",
  awardBadge: "Awarded 'Best Progressive Prep School in Foundational & Middle Pedagogy 2026'",
  heroVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-children-reading-and-learning-together-41315-large.mp4",
  campusSize: "Green Parkland Campus, Science & Tinkering Labs, Natural Woodlands",

  principal: {
    name: "Dr. Arvind S. Sharma",
    qualification: "M.Sc., M.Ed., Ph.D. in Early Childhood & Elementary Education",
    title: "Head of School & Director of Pedagogy",
    message: "At DPS JUNIOR PUBLIC SCHOOL, our journey extends from the first giggles of Playgroup through the confident, inquisitive leadership of Class 8. Aligned with Indian educational standards and CBSE experiential guidelines, we ensure childhood is never rushed. In our sunlit classrooms and discovery grounds, children learn to question courageously, think critically, and grow with deep moral roots."
  },

  contact: {
    address: "DPS Junior Campus, Woodlands Park, Sector 24, Urban Estate, Gurugram, Haryana - 122002",
    phone: "+91 98765 43210",
    altPhone: "+91 124 2345678",
    email: "admissions@dpsjunior.edu.in",
    admissionsEmail: "admissions@dpsjunior.edu.in",
    officeEmail: "info@dpsjunior.edu.in",
    officeHours: "Monday to Saturday: 8:00 AM – 3:30 PM (Second Saturdays Off)",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112217.9255234509!2d77.01859364999999!3d28.4594965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },

  // Ready Image Slots (will be populated with images shared by the user)
  images: {
    hero: "https://images.unsplash.com/photo-1761208663763-c4d30657c910?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600",
    headmaster: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    campus: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    playgroup: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
    middleSchool: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
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
      description: "Covering Playgroup, Nursery, LKG, and UKG. Guided by NEP foundational principles, children explore through tactile mud kitchens, story circles, music, sensory discovery, and joyful peer socialization.",
      highlights: ["Playgroup, Nursery, LKG & UKG", "Gentle mentor ratio (1:6 in Nursery)", "Phonics, early numeracy & rhythm", "Daily outdoor nature & garden play"],
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "preparatory",
      badge: "Ages 6 – 10 Years (Classes I – V)",
      title: "Preparatory & Primary Wing",
      subtitle: "Conceptual Clarity & Inquiring Minds",
      description: "Classes 1 through 5 build solid foundations in English literacy, Hindi, Mathematics, Environmental Studies (EVS), computer coding basics, visual arts, and athletic physical education.",
      highlights: ["Classes 1, 2, 3, 4 and 5", "Hands-on STEM and Math Labs", "Bilingual proficiency & creative expression", "Public speaking & environmental projects"],
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "middle",
      badge: "Ages 11 – 14 Years (Classes VI – VIII)",
      title: "Middle School Wing",
      subtitle: "Critical Thinking, Discovery & Leadership",
      description: "Classes 6 through 8 prepare young scholars for senior board excellence with specialized labs for Physics, Chemistry, Biology, Advanced Mathematics, Social Sciences, Third Language (Sanskrit/French), robotics, and fixture sports.",
      highlights: ["Classes 6, 7 and 8 (Junior High)", "CBSE Integrated Curriculum & Lab Practicals", "Robotics, AI & Coding Workbench", "Inter-school debates, theatre & competitive sports"],
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
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
      quote: "DPS Junior strikes the perfect balance of strong CBSE academic rigor and joyful, unhurried childhood. Our son is himself here, confident and curious.",
      author: "David & Meera Richardson",
      role: "Parents of Liam (Class V)"
    },
    {
      quote: "The teachers notice the small things — a child who loves botany, a budding mathematician, a shy reader. They unlock their gifts with such patience and joy.",
      author: "Dr. Sunita Batra",
      role: "Alumni Parent & Paediatrician"
    }
  ],

  // Gallery Photos — categorized for Indian Playgroup to Class VIII CBSE standards
  gallery: [
    {
      id: 1,
      title: "Playgroup Sensory Play",
      caption: "Pre-primary toddlers developing tactile and motor skills with blocks and clay.",
      category: "Playgroup & Kindergarten",
      url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Janmashtami & Festive Celebrations",
      caption: "Little scholars dressed as Krishna and Radha celebrating Indian cultural festivals.",
      category: "Festivals & Celebrations",
      url: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Annual Sports Day & Races",
      caption: "Track and field races, spoon race, and tug-of-war on Annual Sports Day.",
      category: "Sports & Yoga",
      url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Smart Classroom Learning",
      caption: "Interactive digital boards and collaborative group study in Class 4.",
      category: "Classrooms & Labs",
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Annual Day Dance & Drama",
      caption: "Students performing classical and folk dances on the grand Annual Day stage.",
      category: "Art & Stage Events",
      url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Kindergarten Activity Corner",
      caption: "Story circles, phonics games, and creative coloring in UKG.",
      category: "Playgroup & Kindergarten",
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      title: "Science & Robotics Tinkering Lab",
      caption: "Hands-on experiential experiments and robotics models by Class 7 students.",
      category: "Classrooms & Labs",
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      title: "Green Outdoor Playground",
      caption: "Safe outdoor slides, swings, and morning PT assembly ground.",
      category: "Campus & Play Area",
      url: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80"
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
