import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Paper from 'src/components/Paper';

const Maintenance: React.FC = () => {
  return (
    <Container component="main" maxWidth="lg">
      <Paper>
        <Typography component="h1" variant="h5">
          OMSCentral is under maintenance. Thank you for your patience.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Maintenance;
