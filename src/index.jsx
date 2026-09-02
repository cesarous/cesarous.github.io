import './index.css';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Courses from './pages/Courses';
import Connect from './pages/Connect';
import CcdaViewer from './pages/CcdaViewer';
import PythonConcurrencyCourse from './pages/PythonConcurrencyCourse';
import NotFound from './pages/NotFound';
import { initAnalytics } from './lib/analytics';


initAnalytics();

// The site is light by default and never follows OS/browser dark-mode
// preference (useSystemColorMode: false) - the same URL should look the
// same to every first-time visitor. A visitor's own toggle choice is
// persisted (Chakra's default colorModeManager: localStorage, key
// "chakra-ui-color-mode") and read back on their next visit.
//
// We lean on Chakra's OWN color-mode system rather than hand-rolling one:
// it already manages document.documentElement.dataset.theme and
// style.colorScheme for us, and doing it ourselves in parallel just fights
// Chakra's mount effect, which overwrites whatever we set. Our CSS tokens
// in index.css target that same [data-theme="dark"] attribute, so no
// change was needed on that side.
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

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

  <ChakraProvider theme={theme}>
    {/* Runs before React hydrates, so the very first paint already has the
        right data-theme attribute - this is Chakra's own answer to the
        "flash of wrong theme" problem, in place of a hand-rolled inline
        script. */}
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<Experience />} />
          <Route path="projects" element={<Projects />} />
          <Route path="courses" element={<Courses />} />
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


