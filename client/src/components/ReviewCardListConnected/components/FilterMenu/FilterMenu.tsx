import Menu from '@material-ui/core/Menu';
import React, { useState } from 'react';
import { Nullable } from 'src/core';
import { FilterCount } from 'src/core/types';

import ToolbarButton from '../ToolbarButton';

interface Props {
  id: string;
  filterName: string;
  filterCount: FilterCount;
  open: boolean;
  updateOpen: (open: boolean) => void;
  content: React.ReactNode;
}

const FilterMenu: React.FC<Props> = ({
  id,
  filterName,
  filterCount,
  open,
  updateOpen,
  content,
}) => {
  const [anchorEl, setAnchorEl] = useState<Nullable<Element>>(null);

  const handleOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
    updateOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    updateOpen(false);
  };

  return (
    <>
      <ToolbarButton
        id={id}
        caption={`${filterName}: ${
          !filterCount ||
          filterCount.selected === 0 ||
          filterCount.selected === filterCount.total
            ? 'All'
            : filterCount.selected
        }`}
        onClick={handleOpen}
      />
      <Menu
        keepMounted
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        MenuListProps={{ disablePadding: true }}
      >
        {open ? content : null}
      </Menu>
    </>
  );
};

export default FilterMenu;
