import React, { useEffect } from 'react';
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import './css/CcdaViewer.css';
import './css/shared.css';
import { boxStyles } from './css/Exterior_box.js';
import { ccdaDownload } from '../data/ccdaDownload.js';
import { trackEvent } from '../lib/analytics';

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
      description: 'Opens the C-CDA and CCDA XML files hospitals send and lays them out as a record you can actually read - medications, allergies, problems, immunizations, encounters and procedures - with search and printing built in. Free and unlimited, with no account and no ads, and it runs entirely on your own machine, on Windows and macOS.',
      downloadUrl: ccdaDownload.builds.map((build) => build.href),
      softwareVersion: ccdaDownload.version,
      // A zero-price Offer is how search engines are told the app is free -
      // the word "free" in the description alone carries no structured meaning.
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
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
          A free desktop app for Windows and macOS that opens C-CDA and CCDA XML files - the dense,
          machine-oriented exports hospitals send - and lays them out as a document a person can
          actually read. Unlimited files, no account, no ads. Built for legal staff who need the
          contents of a medical record, not the markup.
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
                  onClick={() => trackEvent('ccda-download', {
                    build: build.id,
                    version: ccdaDownload.version,
                  })}
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
            onClick={() => trackEvent('ccda-support-click', {
              version: ccdaDownload.version,
            })}
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
            Lays out the whole record as readable sections - medications, allergies, problems,
            immunizations, encounters, procedures - with search and printing built in.
          </li>
          <li className="project-body ccda-list-item">
            Free and unlimited - open as many files as you like, with no account, no subscription
            and no ads. The support link is a donation, not a paywall.
          </li>
          <li className="project-body ccda-list-item">
            Handles the real-world variation between hospital systems, which rarely emit the spec the
            same way twice. The parser was reverse-engineered against actual files rather than the
            reference implementation.
          </li>
          <li className="project-body ccda-list-item">
            Runs as a standalone app on Windows and macOS - no install of Python, no command line,
            no developer setup - and works entirely offline, so the file never leaves your computer.
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
