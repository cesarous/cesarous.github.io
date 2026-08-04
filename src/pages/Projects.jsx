import { Box } from "@chakra-ui/react";
import ProjectShowcase from '../components/ProjectShowcase.jsx';
import "./css/Projects.css";
import { boxStyles } from './css/Exterior_box.js';
import { paid_projects, school_projects, fun_projects } from '../data/projects.js';

const Projects = () => {
  return (
    <Box maxWidth="xxl" mx="auto" display='inLine' alignItems='center' marginBottom='10% !important' sx={boxStyles}>
      <h1 id="projects" className="project-title">
        Freelance Work
      </h1>
      <hr className="header-separator" />
      <ProjectShowcase projects={paid_projects} />

      <h1 className="project-title">
        Personal Projects
      </h1>
      <hr className="header-separator" />
      <ProjectShowcase projects={school_projects} />

      <h1 className="project-title">
        For Fun
      </h1>
      <hr className="header-separator" />
      <ProjectShowcase projects={fun_projects} />
    </Box>
  );
};

export default Projects;
