import { Box } from "@chakra-ui/react";
import { boxStyles } from './css/Exterior_box.js';
import './css/Experience.css';

const roles = [
  {
    role: "Chief Executive Officer",
    org: "NextArena",
    location: "Chicago, IL",
    dates: "July 2026 - Present",
    logo: "/logos/nextarena.svg",
    description: "Leading a team of four engineers building a production-ready esports platform, including an automated outreach system for content-creator partnerships.",
  },
  {
    role: "Full Stack Developer, Technical Lead",
    org: "NextArena",
    location: "Chicago, IL",
    dates: "January 2023 - July 2026",
    logo: "/logos/nextarena.svg",
    description: "Built the company website, frontend/backend REST APIs, and database architecture, including a payment system supporting crypto and fiat with row-level locking, a state machine for valid transitions, and an append-only audit ledger.",
  },
  {
    role: "Space Systems Analysis and Test Intern, Group 95",
    org: "MIT Lincoln Laboratory",
    location: "Westford, MA",
    dates: "May 2023 - September 2023",
    logo: "/logos/mit-lincoln-lab.png",
    description: "Built a distributed PXE boot server to automate Red Hat Enterprise Linux 8 deployments, cutting backend deploy times by 95% or more.",
  },
  {
    role: "Software Engineering Intern, Cohort Lead",
    org: "Intel Corporation",
    location: "Folsom, CA",
    dates: "May 2022 - August 2022",
    logo: "/logos/intel.svg",
    description: "Built a plugin integrating Intel's new security engine into firmware images and standardized image-generation tooling for compatibility with external firmware.",
  },
  {
    role: "Software Engineering Intern, Cohort Lead",
    org: "Intel Corporation",
    location: "Chicago, IL",
    dates: "May 2021 - August 2021",
    logo: "/logos/intel.svg",
    description: "Standardized stress testing for 14th-generation CPU validation and modernized legacy Python tooling, earning four Intel recognitions.",
  },
];

// Ordered by date, most recent/ongoing first.
const researchAndFreelance = [
  {
    role: "Freelance Application Developer",
    org: "Self-Employed",
    location: "Chicago, IL",
    dates: "2019 - Present",
    logo: "/favicon.ico",
    description: "Built a website for Israel Carpet Cleaning Co., a C-CDA medical file viewer used by legal personnel to parse and read patient records, and an application to streamline cardiovascular emergency response data collection for the University of Michigan Medical School.",
  },
  {
    role: "Research Assistant, Cardiovascular Technology",
    org: "University of Michigan",
    location: "Ann Arbor, MI",
    dates: "October 2019 - May 2020",
    logo: "/logos/umich.png",
    description: "Interviewed healthcare professionals and built an application that cut emergency cardiovascular response documentation time from 7 minutes to 5.5.",
  },
  {
    role: "Freelance Data Analyst",
    org: "University of Illinois Chicago",
    location: "Chicago, IL",
    dates: "December 2017 - May 2022",
    logo: "/logos/uic.svg",
    description: "Extracted and structured unstructured data for the Illinois Deaths in Custody Project, used by tens of thousands of visitors.",
  },
];

const strengths = [
  "Excellent communication skills - several speaking awards won",
  "Fluent in Spanish",
];

const TimelineEntry = ({ item }) => (
  <li className="timeline-entry">
    <div className="timeline-logo">
      <img src={item.logo} alt={`${item.org} logo`} loading="lazy" />
    </div>
    <div>
      <div className="timeline-heading">
        <h3 className="timeline-role">{item.role}</h3>
        <span className="timeline-dates">{item.dates}</span>
      </div>
      <p className="timeline-org">{item.org} - {item.location}</p>
      <p className="timeline-description">{item.description}</p>
    </div>
  </li>
);

const Experience = () => {
  return (
    <Box maxWidth="xxl" mx="auto" display='inLine' alignItems='left' sx={boxStyles}>
      <h1 id="experience" className="project-title">
        Experience
      </h1>
      <hr className="header-separator" />

      <section className="experience-section">
        <h2 className="project-body-header experience-group-heading">Experience</h2>
        <ol className="timeline">
          {roles.map((item) => (
            <TimelineEntry key={`${item.role}-${item.org}-${item.dates}`} item={item} />
          ))}
        </ol>

        <h2 className="project-body-header experience-group-heading">Research &amp; freelance</h2>
        <ol className="timeline">
          {researchAndFreelance.map((item) => (
            <TimelineEntry key={`${item.role}-${item.org}-${item.dates}`} item={item} />
          ))}
        </ol>

        <h2 className="project-body-header experience-group-heading">Additional strengths</h2>
        <ul className="about-list">
          {strengths.map((text, index) => (
            <li key={index} className="project-body-header about-list-item">
              {text}
            </li>
          ))}
        </ul>
      </section>
    </Box>
  );
};

export default Experience;
