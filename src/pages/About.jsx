import { Box } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { aboutboxStyles } from './css/Exterior_box.js';
import './css/shared.css';
import './css/About.css';

const education = [
  "Bachelor's of Science in Engineering in Computer Science from the University of Michigan",
];

const interests = [
  {
    title: "Artificial Intelligence",
    body:
      "Artificial intelligence has been one of my primary academic interests throughout my education. Rather than viewing AI purely as a tool for automation, I'm interested in how intelligent systems can augment human decision making, improve accessibility, and create new forms of interaction.",
    tags: [
      "Machine learning",
      "Large language models",
      "AI-assisted software engineering",
      "Human-computer interaction",
      "AI safety and alignment",
      "Statistical learning methods",
    ],
  },
  {
    title: "Distributed Systems & Infrastructure",
    body: "I enjoy designing systems that operate reliably across multiple machines and services.",
    tags: [
      "Distributed systems",
      "Backend architecture",
      "High availability",
      "Cloud infrastructure",
      "Event-driven systems",
      "Networking",
      "Operating systems",
      "Linux administration",
      "Performance optimization",
    ],
  },
  {
    title: "Security Engineering",
    body:
      "Having worked with Intel's security technologies, I developed an appreciation for secure software design and the engineering practices required to build dependable systems.",
    tags: [
      "Secure software architecture",
      "Authentication and authorization",
      "Computer security",
      "Firmware",
      "Cryptography",
      "Infrastructure security",
    ],
  },
  {
    title: "Programming Languages",
    body:
      "I'm fascinated by programming languages - not just how to use them, but why they're designed the way they are.",
    tags: [
      "Functional programming",
      "Type systems",
      "Language design",
      "Compiler concepts",
      "Software architecture",
      "API design",
    ],
  },
  {
    title: "Philosophy of Technology",
    body:
      "My background includes coursework in philosophy alongside computer science, which has shaped how I think about technology, how advances in computing influence society, and how technical systems can be designed responsibly.",
    tags: [
      "Philosophy of mind",
      "Philosophy of artificial intelligence",
      "Ethics of emerging technology",
      "Critical reasoning",
      "Cognitive science",
      "Human agency and technology",
    ],
  },
  {
    title: "Data, Information, and Complex Systems",
    body: "Many of my personal projects explore how information can be represented, organized, and transformed.",
    tags: [
      "Information theory",
      "Visualization",
      "Complex systems",
      "Network effects",
      "Cybernetics",
      "Computational modeling",
      "Emergent behavior",
    ],
  },
  {
    title: "Design",
    body: "Good software isn't only technically sound - it should also be intuitive to use.",
    tags: [
      "User experience",
      "Human-centered design",
      "Visual communication",
      "Information architecture",
      "Data visualization",
    ],
  },
];

const outsideOfEngineering = [
  "Lifting weights",
  "Exploring museums and art exhibitions",
  "Listening to music from a wide range of genres",
  "Reading philosophy",
  "Building side projects",
  "Learning new technologies simply because they seem interesting",
];

const technologies = [
  "Python",
  "TypeScript",
  "React",
  "Django",
  "Linux",
  "PostgreSQL",
  "AWS",
  "Distributed systems",
  "REST APIs",
  "Database design",
  "Concurrency",
  "System architecture",
];

const About = () => {
  const navigate = useNavigate();

  return (
    <Box maxWidth="xxl" mx="auto" display='inLine' alignItems='left' sx={aboutboxStyles}>
      <h1 id="about" className="project-title">
        About Me
      </h1>
      <hr className="header-separator" />

      <section className="about-section">
        <h2 className="project-body-header about-subheading">Education</h2>
        <ul className="about-list">
          {education.map((text, index) => (
            <li key={index} className="project-body-header about-list-item">
              {text}
            </li>
          ))}
        </ul>

        <p className="project-body-header">
          For work history, see{' '}
          <span
            className="about-inline-link"
            role="link"
            tabIndex={0}
            onClick={() => navigate('/experience')}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate('/experience')}
          >
            Experience
          </span>.
        </p>

        <h2 className="project-body-header about-subheading">Below are common topics I ask ChatGPT. I retrieved this information by asking for a meta-analysis.</h2>
        <ol className="topic-index">
          {interests.map((interest, index) => (
            <li key={interest.title} className="topic-index-entry">
              <span className="topic-index-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="topic-index-title">{interest.title}</h3>
                <p className="topic-index-body project-body">{interest.body}</p>
                <p className="topic-index-tags">{interest.tags.join(', ')}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="project-body-header about-subheading">Outside of engineering</h2>
        <ul className="about-list">
          {outsideOfEngineering.map((text, index) => (
            <li key={index} className="project-body-header about-list-item">
              {text}
            </li>
          ))}
        </ul>

        <h2 className="project-body-header about-subheading">Technologies I enjoy working with</h2>
        <div className="tech-tag-row">
          {technologies.map((tech) => (
            <span key={tech} className="tag-chip">{tech}</span>
          ))}
        </div>
      </section>
    </Box>
  );
};

export default About;
