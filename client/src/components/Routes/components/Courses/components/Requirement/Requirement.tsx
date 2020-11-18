import React from 'react';
import { Size } from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';

import { SpecializationRequirement } from 'src/graphql';
import { specializationMeta } from 'src/constants/specializationMeta';
import { useStyles } from './Requirement.styles';

interface Props {
  index: number;
  requirement: SpecializationRequirement;
  size: Size;
}

const Requirement: React.FC<Props> = ({ index, requirement, size }) => {
  const classes = useStyles();

  return (
    <Typography
      className={index === 0 ? classes.first : classes.later}
      display="block"
      gutterBottom
      variant={size === 'small' ? 'body2' : 'body1'}
    >
      {specializationMeta.translateType(requirement.type)}
      &nbsp;
      {`(${requirement.count})`}
    </Typography>
  );
};

export default Requirement;
