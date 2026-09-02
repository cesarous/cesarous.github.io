import React from 'react';
import { Box, Image } from "@chakra-ui/react";
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import './css/Home.css';
import './css/shared.css';
import ProjectShowcase from '../components/ProjectShowcase.jsx';
import { featured_projects } from '../data/projects.js';
import { boxStyles } from './css/Exterior_box.js';

const core_stack = ["Python", "TypeScript", "React", "Django", "AWS", "Distributed systems"];

const Home = () => {
  const navigate = useNavigate();

  const handleResumeClick = () => {
    const pdfPath = '/Cesar_Rodriguez_Resume.pdf';
    window.open(pdfPath, '_blank');
  };

  return (
    <Box className='home_box' mx="auto" sx={boxStyles}>
      <Box marginBottom='5% !important' sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
        <Box className='hero-tree-row' style={{ flex: "1" }}>
          <Image className='image_class'
            id="start"
            boxSize='300px'
            src="/babel_COPY.JPG"
            alt="tree canopy"
            h="auto"
            objectFit="cover"
          />
        </Box>
        <Box
          className="hero-intro-row"
          width={{ base: "90%", md: "40%" }}
          maxWidth="xxl"
          mx="auto"
          display='flex'
          flexDirection={{ base: "column", md: "row" }}
          alignItems='center'
          justifyContent='center'
          style={{ flex: "1" }}
        >

          <Box maxWidth="lg" mx="auto" textAlign={{ base: "center", md: "left" }} order={{ base: 1, md: 0 }}>

            <h1 className='home-h1'>
              Cesar Rodriguez
            </h1>
            <p className='home-body'>
              software engineer
            </p>
            <div style={{display:"flex", gap:"0.5rem", flexDirection:"column"}}>
              <div style={{display:"flex", gap:"0.5rem"}}>
                <Button className="button-with-hover" onClick={handleResumeClick}> Resume </Button>
                <Button className="button-with-hover" onClick={() => navigate('/connect')}>
                  Contact Me
                </Button>
              </div>
              <Button className="button-with-hover" onClick={() => navigate('/ccda-viewer')}>
                C-CDA Viewer
              </Button>
              <Button className="button-with-hover" onClick={() => navigate('/python-concurrency-course')}>
                Python Concurrency Course
              </Button>
            </div>

          </Box>

          <Box
            maxWidth="md"
            width={{ base: "100%", md: "auto" }}
            display="flex"
            justifyContent="center"
            marginLeft={{ base: 0, md: "5%" }}
            marginBottom={{ base: "5%", md: 0 }}
            order={{ base: 0, md: 1 }}
          >
            <Image
              borderRadius='full'
              boxSize='100px'
              src="/Headshot.JPG"
              alt="Cesar Rodriguez"
              w="50%"
              h="auto"
              objectFit="cover"
            />
          </Box>

        </Box>
        <Box className='hero-tree-row'>
          <Image className='image_class_bot'
            boxSize='20%'
            src="/babel_bottom.JPG"
            alt="tree canopy"
            h="auto"
            marginBottom="0% !important"
            objectFit="cover"
          />
        </Box>
      </Box>

      <section className="home-section">
        <h2 className="project-title">About</h2>
        <hr className="header-separator" />
        <p className="project-body home-section-body">
          Computer Science Engineering grad from the University of Michigan. I like designing systems that
          hold up under real load, thinking about how intelligent software should augment human decisions
          rather than replace them, and building things that combine engineering with a bit of research and
          creativity on the side.
        </p>
        <div className="home-tag-row">
          {core_stack.map((tech) => (
            <span key={tech} className="tag-chip">{tech}</span>
          ))}
        </div>
        <div className="home-cta-row">
          <Button className="button-with-hover" onClick={() => navigate('/about')}>
            More about me
          </Button>
          <Button className="button-with-hover" onClick={() => navigate('/experience')}>
            Experience
          </Button>
        </div>
      </section>

      <section className="home-section">
        <h2 className="project-title">Featured Projects</h2>
        <hr className="header-separator" />
        <ProjectShowcase projects={featured_projects} />
        <div className="home-cta-row">
          <Button className="button-with-hover" onClick={() => navigate('/projects')}>
            See all projects
          </Button>
        </div>
      </section>

      <section className="home-section">
        <h2 className="project-title">Let's talk</h2>
        <hr className="header-separator" />
        <p className="project-body home-section-body">
          Open to hearing about new roles and interesting problems.
        </p>
        <div className="home-cta-row">
          <Button className="button-with-hover" onClick={() => navigate('/connect')}>
            Contact Me
          </Button>
        </div>
      </section>
    </Box>
  );
};

export default Home;
