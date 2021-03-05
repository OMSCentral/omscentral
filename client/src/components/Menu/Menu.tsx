import IconButton from '@material-ui/core/IconButton';
import MaterialMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ToolbarButton from 'src/components/ReviewCardListConnected/components/ToolbarButton';
import { Nullable } from 'src/core';

interface Props {
  id: string;
  buttonCaption?: string;
  icon?: React.ReactNode;
  edge?: 'end' | 'start';
  items: {
    key: string;
    onClick?: () => void;
    path?: string;
    caption: React.ReactNode | JSX.Element;
  }[];
  closeOnClick?: boolean;
  'data-cy'?: string;
}

const Menu: React.FC<Props> = ({
  id,
  buttonCaption,
  icon,
  edge,
  items,
  closeOnClick = true,
  'data-cy': dataCy,
}) => {
  const [anchorEl, setAnchorEl] = useState<Nullable<Element>>(null);
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();

  const handleOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleClick = (path?: string, onClick?: () => void) => () => {
    path && history.push(path);
    onClick && onClick();
    closeOnClick && handleClose();
  };

  return (
    <>
      {buttonCaption != null && icon == null && (
        <ToolbarButton id={id} caption={buttonCaption} onClick={handleOpen} />
      )}

      {icon != null && buttonCaption == null && (
        <IconButton
          edge={edge}
          aria-label={id}
          aria-controls={id}
          aria-haspopup="true"
          onClick={handleOpen}
          color="inherit"
        >
          {icon}
        </IconButton>
      )}

      <MaterialMenu
        id={id}
        data-cy={dataCy}
        keepMounted
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
      >
        {items.map(({ key, onClick, path, caption }) => (
          <MenuItem
            key={key}
            onClick={handleClick(path, onClick)}
            data-cy={`${dataCy}_${key}`}
          >
            {caption}
          </MenuItem>
        ))}
      </MaterialMenu>
    </>
  );
};

export default Menu;
