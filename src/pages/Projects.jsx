import { Box } from "@chakra-ui/react";
import ProjectShowcase from '../components/ProjectShowcase.jsx';
import "./css/Projects.css";
import { boxStyles } from './css/Exterior_box.js';
import { paid_projects, school_projects, fun_projects } from '../data/projects.js';

const Projects = () => {
  return (
    <Box maxWidth="xxl" mx="auto" display='inLine' alignItems='center' marginBottom='10% !important' sx={boxStyles}>
      {/* One h1 names the page; the three groups below are sections under it.
          It is visually hidden because the design opens straight into the
          first group - three competing h1s left the page with no subject. */}
      <h1 className="sr-only">Projects</h1>

      <h2 id="projects" className="project-title">
        Freelance Work
      </h2>
      <hr className="header-separator" />
      <ProjectShowcase projects={paid_projects} />

      <h2 className="project-title">
        Personal Projects
      </h2>
      <hr className="header-separator" />
      <ProjectShowcase projects={school_projects} />

      <h2 className="project-title">
        For Fun
      </h2>
      <hr className="header-separator" />
      <ProjectShowcase projects={fun_projects} />
    </Box>
  );
};

export default Projects;
