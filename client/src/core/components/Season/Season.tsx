import { SvgIconTypeMap as SITM } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { OverridableComponent as OC } from '@material-ui/core/OverridableComponent';
import SummerIcon from '@material-ui/icons/Brightness5';
import FallIcon from '@material-ui/icons/Eco';
import SpringIcon from '@material-ui/icons/EmojiNature';
import UnknownIcon from '@material-ui/icons/Help';
import clsx from 'clsx';
import React from 'react';
import { Season as SeasonEnum, SeasonSize } from 'src/core';

import { useStyles } from './Season.styles';

const seasonIcons: { [key in SeasonEnum]: OC<SITM<unknown, 'svg'>> } = {
  [SeasonEnum.Spring]: SpringIcon,
  [SeasonEnum.Summer]: SummerIcon,
  [SeasonEnum.Fall]: FallIcon,
  [SeasonEnum.Unknown]: UnknownIcon,
};

interface Props {
  className?: string;
  season: SeasonEnum;
  size?: SeasonSize;
}

const Season: React.FC<Props> = ({ className, season, size = 'default' }) => {
  const classes = useStyles();

  const seasonClasses: { [key in SeasonEnum]?: string } = {
    [SeasonEnum.Spring]: classes.spring,
    [SeasonEnum.Summer]: classes.summer,
    [SeasonEnum.Fall]: classes.fall,
    [SeasonEnum.Unknown]: undefined,
  };

  const sizeClasses: { [key in SeasonSize]?: string } = {
    small: classes.small,
    large: classes.large,
    default: undefined,
  };

  const Icon = seasonIcons[season];

  return (
    <Avatar
      className={clsx(className, seasonClasses[season], sizeClasses[size])}
    >
      <Icon fontSize={size} />
    </Avatar>
  );
};

export default Season;
