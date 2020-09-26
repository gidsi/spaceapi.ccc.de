import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';


class MyToolbar extends React.Component {
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" color="inherit">
                CCC Spaces
              </Typography>
            <div>
              <IconButton
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={this.state.open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
              >
                <MenuIcon />
              </IconButton>
              <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                          <MenuItem
                            onClick={() => window.location.href = '/'}
                            containerElement={<Link to="/" />}
                          >
                            Events
                          </MenuItem>
                          <MenuItem
                            onClick={() => window.location.href = '/list'}
                            containerElement={<Link to="/list" />}
                          >
                            Spaces
                          </MenuItem>
                          <MenuItem
                              onClick={() => window.location.href = '/services'}
                              containerElement={<Link to="/services" />}
                          >
                            Services
                          </MenuItem>
                          <MenuItem
                            onClick={() => window.location.href = 'http://ccc.de/de/imprint'}
                          >
                            Impressum
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default MyToolbar;
