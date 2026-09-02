import { Box } from "@chakra-ui/react";
import ProjectShowcase from '../components/ProjectShowcase.jsx';
import "./css/Projects.css";
import { boxStyles } from './css/Exterior_box.js';
import { courses } from '../data/courses.js';

const Courses = () => {
  return (
    <Box maxWidth="xxl" mx="auto" display='inLine' alignItems='center' marginBottom='10% !important' sx={boxStyles}>
      <h1 className="sr-only">Courses</h1>

      <h2 id="courses" className="project-title">
        Free Courses
      </h2>
      <hr className="header-separator" />
      <ProjectShowcase projects={courses} />
    </Box>
  );
};

export default Courses;
