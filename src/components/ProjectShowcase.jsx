import React, { useEffect, useRef } from 'react';
import './css/ProjectShowcase.css';

const isExternal = (link) => /^https?:\/\//.test(link || '');

const ProjectRow = ({ project, reversed }) => {
  return (
    <article className={`project-row${reversed ? ' project-row--reversed' : ''}`}>
      <div className="project-row-media">
        {project.image && <img src={project.image} alt={project.title} loading="lazy" />}
      </div>
      <div className="project-row-body">
        <h3 className="project-row-title">{project.title}</h3>
        <p className="project-row-description">{project.description}</p>
        {project.link && (
          <a
            className="project-row-link"
            href={project.link}
            target={isExternal(project.link) ? '_blank' : undefined}
            rel={isExternal(project.link) ? 'noreferrer' : undefined}
          >
            View project <span className="project-row-link-arrow" aria-hidden="true">&#8594;</span>
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
