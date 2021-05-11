import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { CourseColumnKey as ColumnKey, SortDirection } from 'src/core';

import { useStyles } from './HeadCell.styles';

const config: {
  [key in ColumnKey]: {
    label: string;
    tooltip?: string;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    width?: number;
    className?: string;
    sortable?: boolean;
  };
} = {
  [ColumnKey.Id]: {
    label: 'ID',
    sortable: true,
    width: 160,
  },
  [ColumnKey.Name]: {
    label: 'Name',
    sortable: true,
    className: 'name',
  },
  [ColumnKey.Foundational]: {
    label: 'Foundational?',
    align: 'center',
    sortable: true,
    width: 160,
  },
  [ColumnKey.Deprecated]: {
    label: 'Deprecated?',
    align: 'center',
    sortable: true,
    width: 160,
  },
  [ColumnKey.Semesters]: {
    label: 'Semesters',
    tooltip: 'When reviews have been published',
    align: 'center',
    sortable: false,
    width: 120,
  },
  [ColumnKey.Reviews]: {
    label: 'Reviews',
    align: 'center',
    sortable: true,
    width: 160,
  },
  [ColumnKey.Difficulty]: {
    label: 'Difficulty (1-5)',
    tooltip: '1-Very Easy, 5-Very Hard',
    align: 'center',
    sortable: true,
    width: 160,
  },
  [ColumnKey.Workload]: {
    label: 'Workload (hrs/wk)',
    align: 'center',
    sortable: true,
    width: 160,
  },
  [ColumnKey.Rating]: {
    label: 'Rating (1-5)',
    tooltip: '1-Strongly Disliked, 5-Strongly Liked',
    align: 'center',
    sortable: true,
    width: 160,
  },
};

interface Props {
  id: ColumnKey;
  orderBy: ColumnKey;
  order: SortDirection;
}

const HeadCell: React.FC<TableCellProps & Props> = ({
  id,
  orderBy,
  order,
  onClick,
  ...rest
}) => {
  const classes = useStyles();
  const { align, width, className, label, tooltip, sortable } = config[id];
  const active = id === orderBy;
  const shouldTruncate = active && label.length > 5;
  const adjustedLabel = shouldTruncate ? label.substr(0, 5) + '...' : label;

  const content = tooltip ? (
    <Tooltip title={tooltip} placement="top">
      <span>{adjustedLabel}</span>
    </Tooltip>
  ) : (
    adjustedLabel
  );

  return (
    <TableCell
      sortDirection={orderBy === id ? order : false}
      {...rest}
      align={align}
      style={{ width }}
      className={className && (classes as any)[className]}
    >
      {sortable ? (
        <TableSortLabel
          active={active}
          direction={order}
          onClick={onClick}
          hideSortIcon
        >
          {content}
        </TableSortLabel>
      ) : (
        content
      )}
    </TableCell>
  );
};

export default HeadCell;
