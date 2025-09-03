// Modal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { TimelineModal } from "./timeline-modal";
import GitHubContributions from "./GitHubContributions";
import { SideQuestsModal } from "./side-quests-modal";
import { GrowthJams } from "./growth-jams";

interface AboutContent {
  mainContent: string;
  socialLinks: {
    twitter: string;
    telegram: string;
    linkedin: string;
  }
}

interface GrowthJams {
  id: string;
  title: string;
  description: string;
  image: string | null;
  ctaText: string;
  ctaLink: string;
}


interface LinkText {
  text: string;
  url?: string;
}
interface WritingContent {
  professional: Array<{
    year: number;
    blogs: Array<{
      title: string;
      url: string;
      label: string;
    }>;
  }>;
  personal: Array<{
    title: string;
    url: string;
    label: string;
  }>;
}



interface Achievement {
  text: string;
  links?: { text: string; url: string }[];
}

interface Experience {
  company: string
  companyUrl?: string;
  role: string
  duration: string
  location: string
  achievements: Achievement[]
  tech?: string
}
interface ContactInfo {
  value: string;
  url: string;
}
interface Contact {
  [key: string]: ContactInfo;
}

interface SideQuest {
  id: string;
  title: string;
  description: string;
  image: string | null;
  ctaText: string;
  ctaLink: string;
}


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | Experience[] | Contact | WritingContent | AboutContent| SideQuest[] | GrowthJams[];
  type?: 'experience' | 'contact' | 'writing' | 'about' | 'default'|'github'|'sideQuests'|'growthJams';
}
function RenderAchievement({ achievement }: { achievement: Achievement }) {
  if (!achievement.links) {
    return <span>{achievement.text}</span>;
  }

  let text = achievement.text;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  achievement.links.forEach((link, i) => {
    const startIndex = text.indexOf(link.text);
    if (startIndex === -1) return;

    elements.push(text.substring(lastIndex, startIndex));
    elements.push(
      <a
        key={i}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {link.text}
      </a>
    );
    lastIndex = startIndex + link.text.length;
  });
  elements.push(text.substring(lastIndex));

  return <>{elements}</>;
}
const LabelBadge = ({ type }: { type: string }) => {
  const colors = {
    'Tutorial': 'bg-blue-100 text-blue-800',
    'Case Study & Research': 'bg-purple-100 text-purple-800',
    'Explainer': 'bg-green-100 text-green-800'
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[type as keyof typeof colors]}`}>
      {type}
    </span>
  );
};
export function Modal({ isOpen, onClose, title, content, type = 'default' }: ModalProps) {


  if (type === 'about') {
    const aboutContent = content as AboutContent;
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-center mb-4">
            <DialogTitle className="text-4xl font-bold text-gray-900 text-center">{title}</DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-center">
            <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-gray-200"> {/* Slightly smaller image */}
              <img
                src="/profile_pic.jpeg"
                alt="Sidharth Kumthekar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Salutation after image */}
          <div className="text-xl font-bold text-gray-800 text-center"> {/* Centered and smaller text */}
            Hey, I'm Sidharth!
          </div>

          {/* Main Content */}
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              A 22 year old CS Undergrad who loves to build products and sky rocket brands!
              Got introduced to crypto during covid - got my first industry breakthrough in my sophomore year (2k22) - and now there's nooooo turning back.
            </p>

            <p className="leading-relaxed">
              Till date I've been lucky to wear multiple hats, ranging from development and research analysis to PM, BD, and Growth. And honestly? I love em all.
              Soaking in everything with an open mind with one goal in mind: becoming the best crypto polymath 🧙
            </p>

            <p className="leading-relaxed">
              Right now, I'm Locked into Growth and Product roles.
            </p>

            <p className="leading-relaxed">
              Though crypto takes up 7/4th of my day - whether it's work, research, or trenching. When it's time to touch grass, you'll find me:
            </p>

            <div className="pl-6 space-y-2">
              <p>⚽ Playing football (<em>Man City for life!</em>)</p>
              <p>📺 Binge-watching <em>Suits</em></p>
              <p>🚗 Going on long drives with my pals</p>
              <p>🍞 Studying economics <em>(new hoob..its really cool!)</em></p>
            </div>

            <p className="leading-relaxed">
              My near-term goal? To contribute my best towards cross chain infra, consumer crypto apps and travel the world living the true digital nomad life.
            </p>

             {/* Timeline journey button */}
             <div className="flex justify-center mt-6">
              <TimelineModal
                title="My Retardness Timeline"
                xAxisLabel="Timeline"
                yAxisLabel="Retardness"
                yAxisValues={["Beginning", "Growing", "Established", "Advanced"]}
                milestones={[
                  { id: "1", x: 10, y: 15,  image: '/schoolbiz.jpg', caption: "School time Bizznesss", xLabel: "2014" },
                  { id: "2", x: 25, y: 35, image: '/act.jpg', caption: "Sid + Humor + Acting = Housefull Show", xLabel: "2017"},
                  { id: "3", x: 40, y: 55, image: '/standup.mp4', caption: "First Highschool standup", xLabel: "2019" },
                  { id: "4", x: 60, y: 75, image: '/demo.jpeg', caption: "Genesis demo - Solana HH'23", xLabel: "2023" },
                  { id: "5", x: 75, y: 85, image: '/football.jpeg', caption: "Always in the game", xLabel: "2023" },
                  { id: "6", x: 90, y: 95, image: '/award.jpeg', caption: "Won best Int'l achievements award", xLabel: "2024" },
                  { id: "7", x: 95, y: 80, image: '/tshirtpilot.jpeg', caption: "Clothing brand for nerds", xLabel: "2024" }
                ]}
                buttonText="My Retardness Timeline"
                buttonVariant="custom"
                buttonClassName="relative group overflow-hidden px-8 py-3 rounded-full bg-[#121220] text-white font-medium shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-purple-500/30"
              />
            </div>
            </div>
  
            
          
               
  
            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-center items-center space-x-8">
                {/* Solscan */}
                 {/* Solscan */}
                 {/* <a
                  href={aboutContent.socialLinks.solscan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <img 
                    src="/solscan.png" 
                    alt="Solscan" 
                    className="w-8 h-8 object-contain"
                  />
                </a> */}
  
                {/* Twitter/X */}
                <a
                  href={aboutContent.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
  
                {/* Telegram */}
                <a
                  href={aboutContent.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
  
                {/* LinkedIn */}
                <a
                  href={aboutContent.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          
        </DialogContent>
      </Dialog>
    );
  }
  if (type === 'growthJams') {
    const portfolioItems = content as GrowthJams[];
    return (
      <GrowthJams
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        portfolioItems={portfolioItems}
      />
    );
  }
  // Experience type modal
  if (type === 'github') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900 mb-6">{title}</DialogTitle>
          </DialogHeader>
          <GitHubContributions />
        </DialogContent>
      </Dialog>
    );
  }
  if (type === 'writing') {
    const writingContent = content as WritingContent;
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] bg-white/95 backdrop-blur-sm max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900 mb-6">{title}</DialogTitle>
          </DialogHeader>
          
          {/* Professional Writing Section */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Professional</h2>
              {writingContent.professional.map((yearGroup) => (
                <div key={yearGroup.year} className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">{yearGroup.year}</h3>
                  <div className="space-y-4">
                    {yearGroup.blogs.map((blog, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start gap-4">
                          <a 
                            href={blog.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-medium text-blue-600 hover:text-blue-800"
                          >
                            {blog.title}
                          </a>
                          <LabelBadge type={blog.label} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Personal Writing Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text">Personal</h2>
              <div className="space-y-4">
                {writingContent.personal.map((blog, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <a 
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-medium text-blue-600 hover:text-blue-800"
                      >
                        {blog.title}
                      </a>
                      <LabelBadge type={blog.label} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  if (type === 'experience') {
    const experiences = content as Experience[];
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] bg-white/95 backdrop-blur-sm max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900 mb-6">{title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {exp.companyUrl ? (
                      <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold text-gray-700 italic">{exp.role}</h4>
                  <span className="text-sm text-gray-600">{exp.location}</span>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-700">
                      <RenderAchievement achievement={achievement} />
                    </li>
                  ))}
                </ul>
                {exp.tech && (
                  <div className="mt-4">
                    <p className="font-semibold text-gray-800">Tech Stack:</p>
                    <p className="text-gray-700">{exp.tech}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  // Projects type modal
  if (type === 'sideQuests') {
    const projects = content as SideQuest[];
    return (
      <SideQuestsModal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        sideQuests={projects}
      />
    );
  }

  // Contact type modal
  if (type === 'contact') {
    const contactInfo = content as Contact;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 mb-4">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {Object.entries(contactInfo).map(([platform, info]) => (
            <div key={platform} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              {/* Platform Icon */}
              <div className="w-8">
                {platform === 'Email' && (
                  <svg className="w-6 h-6 text-gray-600" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                )}
                {platform === 'X' && (
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                )}
                {platform === 'LinkedIn' && (
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                )}
                {platform === 'Telegram' && (
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                )}
              </div>
              
              {/* Platform Link */}
              <a 
                href={info.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span className="font-medium">{platform}</span>
                <span className="text-gray-500">{info.value}</span>
              </a>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
  }

  // Default modal
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">{title}</DialogTitle>
          <DialogDescription className="mt-4 text-lg leading-relaxed text-gray-700">
            {content as string}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}