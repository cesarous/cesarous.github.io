import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ProjectShowcase.css';

const isExternal = (link) => /^https?:\/\//.test(link || '');

const ProjectRow = ({ project, reversed }) => {
  const navigate = useNavigate();
  const external = isExternal(project.link);

  return (
    <article className={`project-row${reversed ? ' project-row--reversed' : ''}`}>
      <div className="project-row-media">
        {/* width/height are the file's real pixel dimensions, not display
            size. CSS still governs how big the image renders; giving the
            browser the aspect ratio up front stops the card from reflowing
            when a lazy-loaded image arrives. */}
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            width={project.width}
            height={project.height}
          />
        )}
      </div>
      <div className="project-row-body">
        <h3 className="project-row-title">{project.title}</h3>
        <p className="project-row-description">{project.description}</p>
        {project.link && (
          <a
            className="project-row-link"
            href={project.link}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            onClick={(event) => {
              if (external) return;
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
              event.preventDefault();
              navigate(project.link);
            }}
          >
            {project.linkLabel || 'View project'} <span className="project-row-link-arrow" aria-hidden="true">&#8594;</span>
          </a>
        )}
      </div>
    </article>
  );
};

const ProjectShowcase = ({ projects }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const rows = container.querySelectorAll('.project-row');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('project-row--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [projects]);

  return (
    <div className="project-showcase" ref={containerRef}>
      {projects.map((project, index) => (
        <ProjectRow key={project.id} project={project} reversed={index % 2 === 1} />
      ))}
    </div>
  );
};

export default ProjectShowcase;
