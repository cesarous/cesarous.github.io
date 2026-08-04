import { Box } from "@chakra-ui/react";
import ContactList from '../components/ContactList.jsx';
import ContactUs from '../components/ContactUs.jsx';
import { boxStyles } from './css/Exterior_box.js';

const contactItems = [
  {
    id: 1,
    title: 'Phone Number',
    description: '+1 (773)-396-2850'
  },
  {
    id: 2,
    title: 'Email',
    description: 'cero@umich.edu'
  },
  {
    id: 3,
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/cerod/',
    description: '/in/cerod'
  },
  {
    id: 4,
    title: 'Github',
    link: 'https://github.com/cesarous/',
    description: 'github.com/cesarous/'
  }
];

const Connect = () => {
  return (
    <Box maxWidth="xxl" mx="auto" display='inLine' alignItems='center' marginBottom='10% !important' sx={boxStyles}>
      <h1 id="connect" className="project-title">Connect</h1>
      <hr className="header-separator" />
      <Box display="flex" flexDirection="column" alignItems="center">
        <ContactList items={contactItems} />
        <ContactUs></ContactUs>
      </Box>
    </Box>
  );
};

export default Connect;
