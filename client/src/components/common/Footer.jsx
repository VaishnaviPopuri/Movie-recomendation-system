import { Paper, Stack, Button, Box } from '@mui/material'; // Removed Typography and useTheme imports
import React from 'react';
import Container from './Container';
import Logo from './Logo';
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";

const Footer = () => {
  // Removed theme variable since it's not used
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem", position: 'relative' }}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction={{ xs: "column", md: "row " }}
          sx={{ height: "max-content" }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "inherit" }}
                component={Link}
                to={item.path}
              >
                {item.display}
              </Button>
            ))}
          </Box>
        </Stack>
        {/* Removed Typography component */}
      </Paper>
    </Container>
  );
};

export default Footer;
