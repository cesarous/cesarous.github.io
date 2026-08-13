import React, { useEffect } from 'react';
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import './css/CcdaViewer.css';
import './css/shared.css';
import { boxStyles } from './css/Exterior_box.js';
import { ccdaDownload } from '../data/ccdaDownload.js';

const tech_stack = ["Python", "XML / C-CDA", "Desktop app", "Windows", "macOS"];

const CcdaViewer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'C-CDA File Viewer',
      applicationCategory: 'MedicalApplication',
      operatingSystem: ccdaDownload.builds.map((build) => build.operatingSystem).join(', '),
      url: 'https://cesarous.github.io/ccda-viewer',
      image: 'https://cesarous.github.io/CCDA.png',
      description: 'A desktop viewer for Windows and macOS that turns C-CDA and CCDA XML medical record exports into a structured, readable document.',
      downloadUrl: ccdaDownload.builds.map((build) => build.href),
      softwareVersion: ccdaDownload.version,
    };
    const script = document.createElement('script');
    script.id = 'ccda-viewer-structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <Box maxWidth="xxl" mx="auto" marginBottom='10% !important' sx={boxStyles}>

      <section className="ccda-hero">
        <p className="ccda-eyebrow">Freelance project · Burnes and Libman</p>
        <h1 className="project-title ccda-hero-title">C-CDA File Viewer</h1>
        <hr className="header-separator" />
        <p className="project-body ccda-lede">
          A desktop tool that turns C-CDA medical record exports - dense, machine-oriented XML - into
          a document a person can actually read. Built for legal staff who receive these files from
          hospitals and need the contents, not the markup.
        </p>

        <div className="ccda-download-panel">
          <div className="ccda-download-row">
            {ccdaDownload.builds.map((build) => (
              <div key={build.id} className="ccda-download-option">
                {/* `download` is inert cross-origin, but GitHub already serves
                    release assets as attachments, so these save rather than
                    navigate. */}
                <a
                  className="ccda-download-button"
                  href={build.href}
                  download={build.fileName}
                >
                  {build.label}
                </a>
                <p className="ccda-download-meta">{build.meta}</p>
              </div>
            ))}
          </div>

          <p className="ccda-download-version">
            Version {ccdaDownload.version}  ·  {ccdaDownload.released}
          </p>

          <a
            className="ccda-support-link"
            href={ccdaDownload.supportUrl}
            target="_blank"
            rel="noreferrer"
          >
            Support continued development
          </a>
        </div>

        <div className="tech-tag-row">
          {tech_stack.map((tech) => (
            <span key={tech} className="tag-chip">{tech}</span>
          ))}
        </div>
      </section>

      <section className="ccda-section">
        <h2 className="project-title">What it does</h2>
        <hr className="header-separator" />
        <ul className="ccda-list">
          <li className="project-body ccda-list-item">
            Opens a C-CDA XML export and renders it as a structured, readable document instead of
            exposing the underlying markup.
          </li>
          <li className="project-body ccda-list-item">
            Handles the real-world variation between hospital systems, which rarely emit the spec the
            same way twice. The parser was reverse-engineered against actual files rather than the
            reference implementation.
          </li>
          <li className="project-body ccda-list-item">
            Runs as a standalone Windows application - no install of Python, no command line, no
            developer setup.
          </li>
        </ul>
      </section>

      <section className="ccda-section">
        <h2 className="project-title">Why it exists</h2>
        <hr className="header-separator" />
        <p className="project-body ccda-body">
          Legal staff at Burnes and Libman were receiving patient records as C-CDA files and had no
          practical way to read them. The available options were to open raw XML, or to pay for
          enterprise clinical software built for a different job entirely. This closes that gap: one
          file, one window, the record in plain view.
        </p>
      </section>

      <section className="ccda-section">
        <h2 className="project-title">Installing it</h2>
        <hr className="header-separator" />
        <h3 className="ccda-subhead">Windows</h3>
        <ol className="ccda-steps">
          <li className="project-body ccda-list-item">
            Download and run <code className="ccda-code">CCDA-Viewer-Setup.exe</code>.
          </li>
          <li className="project-body ccda-list-item">
            SmartScreen will warn that the publisher is unrecognized, because the build is not
            code-signed. Choose <em>More info</em>, then <em>Run anyway</em>. The warning reports
            the absence of a paid signing certificate, not anything the installer does.
          </li>
          <li className="project-body ccda-list-item">
            Open the app and point it at a <code className="ccda-code">.xml</code> C-CDA file.
          </li>
        </ol>

        <h3 className="ccda-subhead">macOS</h3>
        <ol className="ccda-steps">
          <li className="project-body ccda-list-item">
            Download and unzip <code className="ccda-code">CCDA-Viewer-macOS.zip</code>, then drag{' '}
            <code className="ccda-code">CCDA Viewer.app</code> into Applications.
          </li>
          <li className="project-body ccda-list-item">
            The first launch is blocked, because the app is not notarized by Apple. Rather than
            double-clicking it, <strong>Control-click the app and choose <em>Open</em></strong>,
            then confirm at the prompt. macOS remembers the exception, so this is only needed once.
          </li>
          <li className="project-body ccda-list-item">
            Open the app and point it at a <code className="ccda-code">.xml</code> C-CDA file.
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

export default CcdaViewer;
