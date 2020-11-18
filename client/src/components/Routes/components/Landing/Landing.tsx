import React from 'react';
import { Redirect } from 'react-router';

import { paths } from 'src/constants';

const Landing: React.FC = () => <Redirect to={paths.courses} />;

export default Landing;
