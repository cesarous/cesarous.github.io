import React, { useEffect } from 'react';
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import './css/PromoPage.css';
import './css/shared.css';
import { boxStyles } from './css/Exterior_box.js';
import { pythonConcurrencyCourseInfo } from '../data/pythonConcurrencyCourse.js';
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
      url: pythonConcurrencyCourseInfo.liveUrl,
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

      <section className="promo-hero">
        <p className="promo-eyebrow">Free course</p>
        <h1 className="project-title promo-hero-title">Python Concurrency Course</h1>
        <hr className="header-separator" />
        <p className="project-body promo-lede">
          A hands-on Python 3.12+ concurrency course: threads, locks, deadlocks, semaphores, the
          GIL, multiprocessing, and MapReduce-style streaming reduction over data too large for
          memory. 31 lessons, a full design deep dive on the classic streaming-parentheses
          interview problem, and 30 runnable problems with deterministic pytest harnesses.
        </p>

        <div className="promo-download-panel">
          <div className="promo-download-row">
            <div className="promo-download-option">
              <a
                className="promo-download-button"
                href={pythonConcurrencyCourseInfo.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('python-concurrency-open', { target: 'live-site' })}
              >
                Open the course
              </a>
              <p className="promo-download-meta">Read online - lesson guide, deep dive, and the full problem catalog.</p>
            </div>
            <div className="promo-download-option">
              <a
                className="promo-download-button"
                href={pythonConcurrencyCourseInfo.zipUrl}
                download
                onClick={() => trackEvent('python-concurrency-download', { target: 'source-zip' })}
              >
                Download source (.zip)
              </a>
              <p className="promo-download-meta">Plain Python + HTML, no build step - Windows, macOS, and Linux alike.</p>
            </div>
          </div>

          <p className="promo-download-version">
            {pythonConcurrencyCourseInfo.lessonCount} lessons  ·  {pythonConcurrencyCourseInfo.problemCount} runnable problems
          </p>

          <a
            className="promo-support-link"
            href={pythonConcurrencyCourseInfo.supportUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent('python-concurrency-support-click', {})}
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

      <section className="promo-section">
        <h2 className="project-title">What it covers</h2>
        <hr className="header-separator" />
        <ul className="promo-list">
          <li className="project-body promo-list-item">
            31 topics in order, from concurrency vs. parallelism through testing concurrent code
            and talking through a design in an interview - every topic links straight to the
            problem that exercises it, with the exact terminal commands to run.
          </li>
          <li className="project-body promo-list-item">
            A full design deep dive on validating balanced parentheses in a file too large for
            memory - chunking, streaming, associative reduction, and a reduction tree, worked
            through in pseudocode with no complete solution handed to you.
          </li>
          <li className="project-body promo-list-item">
            30 problems - synchronization primitives, the classic OS synchronization puzzles,
            concurrent-systems design patterns, and real divide-map-reduce problems - each with a
            runnable starter file and a deterministic pytest harness where every test carries its
            own timeout.
          </li>
          <li className="project-body promo-list-item">
            Free and unlimited, no account, no ads, no paywall. The support link is a donation,
            not a paywall.
          </li>
        </ul>
      </section>

      <section className="promo-section">
        <h2 className="project-title">Why it exists</h2>
        <hr className="header-separator" />
        <p className="project-body promo-body">
          "Validate this in data too large to fit in memory" is one of the most common shapes a
          Python concurrency interview question takes - and most candidates have never actually
          practiced splitting work across multiple workers and combining partial results,
          MapReduce-style. This course builds that skill directly, with the streaming
          balanced-parentheses problem as the running example.
        </p>
      </section>

      <section className="promo-section">
        <h2 className="project-title">Getting started</h2>
        <hr className="header-separator" />
        <h3 className="promo-subhead">Read online</h3>
        <ol className="promo-steps">
          <li className="project-body promo-list-item">
            Open the <a className="about-inline-link" href={pythonConcurrencyCourseInfo.liveUrl} target="_blank" rel="noreferrer">live site</a> -
            no install, no account, works on any device.
          </li>
        </ol>

        <h3 className="promo-subhead">Run the problems locally</h3>
        <ol className="promo-steps">
          <li className="project-body promo-list-item">
            Requires Python 3.12+. Clone the repo or unzip the download above, then, from the
            project folder:
          </li>
          <li className="project-body promo-list-item">
            <code className="promo-code">python -m venv .venv &amp;&amp; source .venv/bin/activate</code>{' '}
            (or <code className="promo-code">.venv\Scripts\activate</code> on Windows).
          </li>
          <li className="project-body promo-list-item">
            <code className="promo-code">pip install -r requirements.txt</code>
          </li>
          <li className="project-body promo-list-item">
            <code className="promo-code">pytest problems -v</code> runs every problem's tests at
            once, or point it at one problem's folder to run just that one.
          </li>
        </ol>
      </section>

      <section className="promo-section">
        <div className="promo-cta-row">
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
