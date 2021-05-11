import IconButton from '@material-ui/core/IconButton';
import MaterialMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Nullable } from 'src/core';

interface Props {
  id: string;
  icon?: React.ReactNode;
  renderTrigger?: (args: {
    open: boolean;
    onOpen: (event: React.MouseEvent) => void;
    onClose: () => void;
  }) => React.ReactElement;
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
  icon,
  edge,
  items,
  closeOnClick = true,
  'data-cy': dataCy,
  renderTrigger,
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
      {renderTrigger != null ? (
        renderTrigger({
          open,
          onOpen: handleOpen,
          onClose: handleClose,
        })
      ) : (
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
        {items.map((item) => (
          <MenuItem
            key={item.key}
            onClick={handleClick(item.path, item.onClick)}
            data-cy={`${dataCy}_${item.key}`}
          >
            {item.caption}
          </MenuItem>
        ))}
      </MaterialMenu>
    </>
  );
};

export default Menu;
