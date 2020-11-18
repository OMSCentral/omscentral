import React from 'react';
import { OverridableComponent as OC } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap as SITM } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import FallIcon from '@material-ui/icons/Eco';
import SpringIcon from '@material-ui/icons/EmojiNature';
import SummerIcon from '@material-ui/icons/Brightness5';
import UnknownIcon from '@material-ui/icons/Help';
import clsx from 'clsx';

import { useStyles } from './Season.styles';

export enum SeasonEnum {
  Unknown = 0,
  Spring = 1,
  Summer = 2,
  Fall = 3,
}

export type SeasonSize = 'small' | 'large' | 'default';

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
