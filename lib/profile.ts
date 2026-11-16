/**
 * Profile copy for the home page, supplied by the site owner (2026-11-15).
 * Thai text is kept as written; edit here rather than in components.
 */

export const profile: string[] = [
  "ผมเป็น Video Editor ที่ให้ความสำคัญกับการเล่าเรื่อง การสื่อสาร และประสบการณ์ของผู้ชม มากกว่าการตัดต่อภาพให้สวยงามเพียงอย่างเดียว",
  "มีประสบการณ์ทำงานด้าน Video Editing และ Creative Production ครอบคลุม Documentary, Product Review, Commercial VTR, Luxury Cinematic, Podcast และ Social Media Content",
  "นอกจากการตัดต่อ ผมยังมีส่วนร่วมในการพัฒนา Creative Concept, Storyline, Visual Direction, Motion Graphics และ Sound Design ตั้งแต่การวางโครงสร้างเรื่องไปจนถึงการผลิตชิ้นงาน",
  "ผมเชื่อว่าวิดีโอที่ดีไม่ใช่แค่ภาพที่สวย แต่ต้องสามารถสื่อสารสิ่งที่ต้องการได้อย่างชัดเจน และทำให้ผู้ชมรู้สึกเชื่อมโยงกับเรื่องราวนั้น",
];

export type ServiceIcon = "film" | "lightbulb" | "shapes" | "audio" | "clapperboard" | "sparkles";

export const services: { icon: ServiceIcon; title: string; detail: string }[] = [
  {
    icon: "film",
    title: "Video Editing",
    detail: "Storytelling, Pacing, Visual Composition และ Narrative Editing",
  },
  {
    icon: "lightbulb",
    title: "Creative Development",
    detail: "Concept Development, Storyline และ Visual Direction",
  },
  {
    icon: "shapes",
    title: "Motion Graphics",
    detail: "Typography, Infographics, Product Animation และ Visual Effects",
  },
  {
    icon: "audio",
    title: "Sound Design",
    detail: "Sound Effects, Audio Layering และ Sound Atmosphere",
  },
  {
    icon: "clapperboard",
    title: "Commercial Production",
    detail: "Product Review, VTR, Documentary และ Cinematic Content",
  },
  {
    icon: "sparkles",
    title: "AI-assisted Workflow",
    detail:
      "ใช้ AI เป็นเครื่องมือช่วยพัฒนาและปรับปรุงกระบวนการผลิต โดยยังคงควบคุมทิศทางความคิดสร้างสรรค์ด้วยตัวเอง",
  },
];

export const process: { title: string; detail: string }[] = [
  {
    title: "Understanding the Brief",
    detail: "ทำความเข้าใจเป้าหมายของโปรเจกต์ กลุ่มผู้ชม และสารที่ต้องการสื่อสาร",
  },
  {
    title: "Creative Direction",
    detail: "พัฒนาแนวคิด วาง Storyline และกำหนดรูปแบบการเล่าเรื่องให้เหมาะสมกับวัตถุประสงค์",
  },
  {
    title: "Visual Storytelling",
    detail: "คัดเลือก Footage จัดลำดับภาพ ออกแบบจังหวะการเล่าเรื่อง และสร้าง Visual Experience",
  },
  {
    title: "Motion & Sound",
    detail: "ออกแบบ Motion Graphics, Typography และ Sound Design เพื่อเสริมประสิทธิภาพในการสื่อสาร",
  },
  {
    title: "Refinement & Delivery",
    detail: "ตรวจสอบรายละเอียด ปรับปรุงคุณภาพงาน และพัฒนาชิ้นงานผ่านกระบวนการ Feedback และ Quality Control",
  },
];

export const philosophy = {
  title: "Every Edit Has a Reason.",
  body: [
    "ทุกการเลือกภาพ ทุกจังหวะการตัดต่อ และทุกองค์ประกอบของ Motion ควรมีเหตุผลรองรับ",
    "ผมให้ความสำคัญกับการเข้าใจว่าเรากำลังเล่าอะไร ทำไมถึงเลือกเล่าแบบนั้น และผู้ชมควรได้รับประสบการณ์แบบใดจากวิดีโอชิ้นนั้น",
    "เพราะสำหรับผม การตัดต่อไม่ใช่เพียงกระบวนการประกอบภาพ แต่เป็นส่วนหนึ่งของการออกแบบการสื่อสาร",
  ],
};

export const experience: { title: string; detail: string }[] = [
  {
    title: "Documentary",
    detail:
      "งาน Documentary ความยาวประมาณ 8 นาที รับผิดชอบการค้นหาและคัดเลือก Footage วางโครงสร้างเรื่อง และจัดลำดับภาพ โดยมี Senior ช่วย Review และ Polish งานในขั้นตอนท้าย",
  },
  {
    title: "Product Review",
    detail:
      "พัฒนา Storyline, Editing, Motion Graphics, Sound Design และ Voice-over เพื่อสร้างประสบการณ์การรีวิวสินค้าที่เข้าใจง่ายและน่าสนใจ",
  },
  {
    title: "Luxury Cinematic",
    detail: "เน้น Visual Composition, Pacing, Sound Design และการสร้างบรรยากาศแบบ Cinematic",
  },
  {
    title: "Corporate VTR",
    detail:
      "งาน VTR และโปรเจกต์นำเสนองานองค์กร รวมถึงการคัดเลือก Footage และจัดโครงสร้างการเล่าเรื่อง",
  },
  {
    title: "Podcast & Social Content",
    detail:
      "ตัดต่อ Podcast และ Short-form Content โดยเน้น Hook, Pacing, Subtitle และการรักษาความน่าสนใจของเนื้อหา",
  },
];

export const strengths: { title: string; detail: string }[] = [
  { title: "Storytelling", detail: "คิดและวางโครงสร้างเรื่องได้ โดยคำนึงถึงสารที่ต้องการสื่อ" },
  { title: "Creative Ownership", detail: "มีส่วนร่วมในการกำหนดแนวทางสร้างสรรค์และรับผิดชอบการผลิต" },
  { title: "Motion Direction", detail: "ออกแบบแนวคิดและกำหนดการเคลื่อนไหวของกราฟิก" },
  { title: "Sound Design", detail: "สร้างบรรยากาศและจังหวะเพื่อเสริมการเล่าเรื่อง" },
  {
    title: "Problem Solving",
    detail: "เลือกใช้เครื่องมือและ AI เพื่อช่วยแก้โจทย์การผลิตและเพิ่มประสิทธิภาพ Workflow",
  },
];
