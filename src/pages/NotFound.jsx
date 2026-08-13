import { Box, Button } from "@chakra-ui/react";
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/shared.css';
import { boxStyles } from './css/Exterior_box.js';

// Unknown paths used to be redirected straight to the home page. That reads to
// a search engine as a "soft 404": the URL answers 200 with unrelated content
// instead of admitting the page is gone, so dead URLs stay in the index. This
// page says so plainly and offers a way onward. Genuinely retired paths still
// redirect - see the explicit routes in index.jsx.
const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = 'Page not found | Cesar Rodriguez';
  }, []);

  return (
    <Box maxWidth="xxl" mx="auto" marginBottom='10% !important' sx={boxStyles}>
      <h1 className="project-title">Page not found</h1>
      <hr className="header-separator" />
      <p className="project-body">
        There is nothing at <code>{location.pathname}</code>. The page may have been
        renamed or removed.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '16px' }}>
        <Button className="button-with-hover" onClick={() => navigate('/')}>
          Back to home
        </Button>
        <Button className="button-with-hover" onClick={() => navigate('/projects')}>
          See projects
        </Button>
      </div>
    </Box>
  );
};

export default NotFound;
