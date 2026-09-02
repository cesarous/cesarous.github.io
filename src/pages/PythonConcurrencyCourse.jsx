import React, { useEffect } from 'react';
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import './css/CcdaViewer.css';
import './css/shared.css';
import { boxStyles } from './css/Exterior_box.js';
import { courseInfo } from '../data/courseDownload.js';
import { trackEvent } from '../lib/analytics';

const tech_stack = ["Python 3.12+", "threading", "multiprocessing", "pytest"];

const PythonConcurrencyCourse = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Python Concurrency Course',
      description: 'A hands-on Python 3.12+ concurrency course: threads, locks, deadlocks, semaphores, the GIL, multiprocessing, and MapReduce-style streaming reduction over data too large for memory. 31 lessons and 30 runnable problems with pytest harnesses.',
      url: courseInfo.liveUrl,
      provider: {
        '@type': 'Person',
        name: 'Cesar Rodriguez',
        url: 'https://cesarous.github.io/',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    };
    const script = document.createElement('script');
    script.id = 'python-concurrency-course-structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <Box maxWidth="xxl" mx="auto" marginBottom='10% !important' sx={boxStyles}>

      <section className="ccda-hero">
        <p className="ccda-eyebrow">Free course</p>
        <h1 className="project-title ccda-hero-title">Python Concurrency Course</h1>
        <hr className="header-separator" />
        <p className="project-body ccda-lede">
          A hands-on Python 3.12+ concurrency course: threads, locks, deadlocks, semaphores, the
          GIL, multiprocessing, and MapReduce-style streaming reduction over data too large for
          memory. 31 lessons, a full design deep dive on the classic streaming-parentheses
          interview problem, and 30 runnable problems with deterministic pytest harnesses.
        </p>

        <div className="ccda-download-panel">
          <div className="ccda-download-row">
            <div className="ccda-download-option">
              <a
                className="ccda-download-button"
                href={courseInfo.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('course-open', { target: 'live-site' })}
              >
                Open the course
              </a>
              <p className="ccda-download-meta">Read online - lesson guide, deep dive, and the full problem catalog.</p>
            </div>
            <div className="ccda-download-option">
              <a
                className="ccda-download-button"
                href={courseInfo.zipUrl}
                download
                onClick={() => trackEvent('course-download', { target: 'source-zip' })}
              >
                Download source (.zip)
              </a>
              <p className="ccda-download-meta">Plain Python + HTML, no build step - Windows, macOS, and Linux alike.</p>
            </div>
          </div>

          <p className="ccda-download-version">
            {courseInfo.lessonCount} lessons  ·  {courseInfo.problemCount} runnable problems
          </p>

          <a
            className="ccda-support-link"
            href={courseInfo.supportUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('course-support-click', {})}
          >
            Support this course
          </a>
        </div>

        <div className="tech-tag-row">
          {tech_stack.map((tech) => (
            <span key={tech} className="tag-chip">{tech}</span>
          ))}
        </div>
      </section>

      <section className="ccda-section">
        <h2 className="project-title">What it covers</h2>
        <hr className="header-separator" />
        <ul className="ccda-list">
          <li className="project-body ccda-list-item">
            31 topics in order, from concurrency vs. parallelism through testing concurrent code
            and talking through a design in an interview - every topic links straight to the
            problem that exercises it, with the exact terminal commands to run.
          </li>
          <li className="project-body ccda-list-item">
            A full design deep dive on validating balanced parentheses in a file too large for
            memory - chunking, streaming, associative reduction, and a reduction tree, worked
            through in pseudocode with no complete solution handed to you.
          </li>
          <li className="project-body ccda-list-item">
            30 problems - synchronization primitives, the classic OS synchronization puzzles,
            concurrent-systems design patterns, and real divide-map-reduce problems - each with a
            runnable starter file and a deterministic pytest harness where every test carries its
            own timeout.
          </li>
          <li className="project-body ccda-list-item">
            Free and unlimited, no account, no ads, no paywall. The support link is a donation,
            not a paywall.
          </li>
        </ul>
      </section>

      <section className="ccda-section">
        <h2 className="project-title">Why it exists</h2>
        <hr className="header-separator" />
        <p className="project-body ccda-body">
          I failed a technical interview on exactly this problem: validate balanced parentheses in
          an input too large to fit in memory, splitting the work across multiple workers and
          combining partial results, MapReduce-style. This is the course I built afterward to
          close that gap for good - for myself, and for anyone else prepping for a Python
          concurrency interview.
        </p>
      </section>

      <section className="ccda-section">
        <h2 className="project-title">Getting started</h2>
        <hr className="header-separator" />
        <h3 className="ccda-subhead">Read online</h3>
        <ol className="ccda-steps">
          <li className="project-body ccda-list-item">
            Open the <a className="about-inline-link" href={courseInfo.liveUrl} target="_blank" rel="noreferrer">live site</a> -
            no install, no account, works on any device.
          </li>
        </ol>

        <h3 className="ccda-subhead">Run the problems locally</h3>
        <ol className="ccda-steps">
          <li className="project-body ccda-list-item">
            Requires Python 3.12+. Clone the repo or unzip the download above, then, from the
            project folder:
          </li>
          <li className="project-body ccda-list-item">
            <code className="ccda-code">python -m venv .venv &amp;&amp; source .venv/bin/activate</code>{' '}
            (or <code className="ccda-code">.venv\Scripts\activate</code> on Windows).
          </li>
          <li className="project-body ccda-list-item">
            <code className="ccda-code">pip install -r requirements.txt</code>
          </li>
          <li className="project-body ccda-list-item">
            <code className="ccda-code">pytest problems -v</code> runs every problem's tests at
            once, or point it at one problem's folder to run just that one.
          </li>
        </ol>
      </section>

      <section className="ccda-section">
        <div className="ccda-cta-row">
          <Button className="button-with-hover" onClick={() => navigate('/projects')}>
            Back to projects
          </Button>
          <Button className="button-with-hover" onClick={() => navigate('/connect')}>
            Questions? Get in touch
          </Button>
        </div>
      </section>

    </Box>
  );
};

export default PythonConcurrencyCourse;
