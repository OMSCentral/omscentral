import Menu from '@material-ui/core/Menu';
import React, { useState } from 'react';
import { Nullable } from 'src/core';
import { FilterCount } from 'src/core/types';

import ToolbarButton from '../ToolbarButton';
import { getFilterMenuLabel } from './FilterMenu.utils';

interface Props {
  id: string;
  filterName: string;
  filterCount: FilterCount;
  isMenuShown: boolean;
  showMenu: () => void;
  hideMenu: () => void;
  content: React.ReactNode;
}

const FilterMenu: React.FC<Props> = ({
  id,
  filterName,
  filterCount,
  isMenuShown,
  showMenu,
  hideMenu,
  content,
}) => {
  const [anchorEl, setAnchorEl] = useState<Nullable<Element>>(null);

  const handleOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
    showMenu();
  };

  const handleClose = () => {
    setAnchorEl(null);
    hideMenu();
  };

  return (
    <>
      <ToolbarButton
        id={id}
        caption={getFilterMenuLabel(filterName, filterCount)}
        onClick={handleOpen}
      />
      <Menu
        keepMounted
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuShown}
        onClose={handleClose}
        MenuListProps={{ disablePadding: true }}
      >
        {isMenuShown ? content : null}
      </Menu>
    </>
  );
};

export default FilterMenu;
