import React, { useEffect, useState } from 'react';
import './App.css';
import './pages/css/Sidebar.css';
import * as Icons from '@mui/icons-material/'; // Import all icons from Material-UI
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Image } from "@chakra-ui/react";

import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const menu_list = [
  { id: 1, title: 'Home', path: '/', icon: 'Home' },
  { id: 2, title: 'About', path: '/about', icon: 'Person' },
  { id: 3, title: 'Experience', path: '/experience', icon: 'WorkHistory' },
  { id: 4, title: 'Projects', path: '/projects', icon: 'Engineering' },
  { id: 5, title: 'Connect', path: '/connect', icon: 'Phone' },
];

const PAGE_TITLES = {
  '/': 'Cesar Rodriguez',
  '/about': 'About - Cesar Rodriguez',
  '/experience': 'Experience - Cesar Rodriguez',
  '/projects': 'Projects - Cesar Rodriguez',
  '/connect': 'Connect - Cesar Rodriguez',
};

const MyItem = ({ box, isActive, onNavigate }) => {
  const BoxIcon = Icons[box.icon];

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

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] || PAGE_TITLES['/'];
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
            src="favicon.ico"
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
