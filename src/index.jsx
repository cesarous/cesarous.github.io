import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Connect from './pages/Connect';


library.add(fab, fas, far);

// Real multi-page site: Home is the landing page, About/Experience/Projects/
// Connect are standalone destinations linked from the nav and from Home's
// teasers. Old/unknown paths (including the previous /services,
// /qualifications stubs) redirect to Home rather than rendering a dead page.
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
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);


