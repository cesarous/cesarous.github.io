import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Connect from './pages/Connect';
import CcdaViewer from './pages/CcdaViewer';
import PythonConcurrencyCourse from './pages/PythonConcurrencyCourse';
import NotFound from './pages/NotFound';
import { initAnalytics } from './lib/analytics';


initAnalytics();

// Real multi-page site: Home is the landing page, About/Experience/Projects/
// Connect are standalone destinations linked from the nav and from Home's
// teasers.
//
// The retired /services and /qualifications stubs redirect to Home, since
// links to them may still exist. Anything else renders a not-found page
// rather than silently landing on Home - a redirect there tells a visitor
// nothing and leaves search engines indexing dead URLs as duplicates of the
// home page.
createRoot(document.getElementById('root')).render(

  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<Experience />} />
          <Route path="projects" element={<Projects />} />
          <Route path="connect" element={<Connect />} />
          <Route path="ccda-viewer" element={<CcdaViewer />} />
          <Route path="ccdaviewer" element={<Navigate to="/ccda-viewer" replace />} />
          <Route path="concurrency-course" element={<PythonConcurrencyCourse />} />
          <Route path="services" element={<Navigate to="/" replace />} />
          <Route path="qualifications" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);


