import React, { useEffect, useState } from 'react';
import './App.css';
import './pages/css/Sidebar.css';
// Imported one by one on purpose. A namespace import of @mui/icons-material
// pulls the entire set - several thousand components - into the bundle to use
// the five below.
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PhoneIcon from '@mui/icons-material/Phone';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Image } from "@chakra-ui/react";

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { buildPageMeta } from './data/pageMeta.mjs';

const NAV_ICONS = {
  Home: HomeIcon,
  Person: PersonIcon,
  WorkHistory: WorkHistoryIcon,
  Engineering: EngineeringIcon,
  Phone: PhoneIcon,
};

const menu_list = [
  { id: 1, title: 'Home', path: '/', icon: 'Home' },
  { id: 2, title: 'About', path: '/about', icon: 'Person' },
  { id: 3, title: 'Experience', path: '/experience', icon: 'WorkHistory' },
  { id: 4, title: 'Projects', path: '/projects', icon: 'Engineering' },
  { id: 5, title: 'Connect', path: '/connect', icon: 'Phone' },
];

const setMetaContent = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
};

const setCanonical = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const MyItem = ({ box, isActive, onNavigate }) => {
  const BoxIcon = NAV_ICONS[box.icon];

  return (
    <>
      <a
        className="nav-item-link"
        href={box.path}
        onClick={(e) => {
          // Let modified clicks (open in new tab, etc.) fall through to the
          // browser's native anchor behavior instead of hijacking them.
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
          e.preventDefault();
          onNavigate(box.path);
        }}
        aria-current={isActive ? 'page' : undefined}
      >
        <MenuItem
          className={`custom-menu-item${isActive ? ' custom-menu-item--active' : ''}`}
          icon={BoxIcon && <BoxIcon fontSize="small" />}
        >
          {box.title}
        </MenuItem>
      </a>
      <hr className="menu-separator" />
    </>
  );
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [toggled, setToggled] = useState(false);

  // Keeps the <head> in step with client-side navigation. Direct loads and
  // crawlers get these same values as static HTML - see the prerender step in
  // scripts/prerender-meta.mjs, which reads the same source of truth.
  useEffect(() => {
    const page = buildPageMeta(location.pathname);
    const { canonical, image } = page;

    document.title = page.title;
    setCanonical(canonical);
    setMetaContent('meta[name="description"]', { name: 'description', content: page.description });
    setMetaContent('meta[property="og:title"]', { property: 'og:title', content: page.title });
    setMetaContent('meta[property="og:description"]', { property: 'og:description', content: page.description });
    setMetaContent('meta[property="og:url"]', { property: 'og:url', content: canonical });
    setMetaContent('meta[property="og:image"]', { property: 'og:image', content: image });
    setMetaContent('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMetaContent('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMetaContent('meta[name="twitter:title"]', { name: 'twitter:title', content: page.title });
    setMetaContent('meta[name="twitter:description"]', { name: 'twitter:description', content: page.description });
    setMetaContent('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
  }, [location.pathname]);

  // Jump to the top of the page on every route change - otherwise the new
  // page can render mid-scroll if you navigated from partway down a long page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const closeMobileMenu = () => setToggled(false);

  const goTo = (path) => {
    navigate(path);
    closeMobileMenu();
  };

  return (
    <div className="App">
      <div className="center-content">

        {/* Own row at the top on mobile (hidden on desktop via CSS) - toggles
            the nav menu inline, in normal document flow, rather than as an
            overlay drawer. */}
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-label={toggled ? 'Close menu' : 'Open menu'}
          aria-expanded={toggled}
          onClick={() => setToggled((prev) => !prev)}
        >
          {toggled ? <CloseIcon /> : <MenuIcon />}
          <span className="mobile-nav-toggle-label">Menu</span>
        </button>

        <Sidebar className={`sidebar${toggled ? ' sidebar--open' : ''}`}>
          <Image
            className="sidebar-logo"
            src="/favicon.ico"
            alt="Laurel wreath"
          />
          <Menu iconShape="square">
            {menu_list.map((menu_item) => (
              <MyItem
                key={menu_item.id}
                box={menu_item}
                isActive={location.pathname === menu_item.path}
                onNavigate={goTo}
              />
            ))}
          </Menu>
        </Sidebar>

        <div className="main-content">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default App;
