import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { AppLogo } from "../../assets";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { HOME, LOGIN, REGISTER } from "../../consts/routes";
import styles from "./Topbar.module.css";
import TokenService from "../../services/TokenService";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const TopBar = ({ stickyTopBar }) => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(TokenService.getUser());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [fixed, setFixed] = React.useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    TokenService.removeUser();
    setAuth(null);
  };

  return (
    <AppBar
      position={stickyTopBar ? "sticky" : "fixed"}
      className={
        fixed || stickyTopBar
          ? styles.mainToolbarWhite
          : styles.mainToolbarTransparent
      }
    >
      <Toolbar className={styles.toolbar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <img
            src={AppLogo}
            alt={"Back to home page"}
            className={styles.logo}
          />
        </IconButton>
        <Typography
          variant="h6"
          className={fixed ? styles.titleBlack : styles.titleWhite}
        >
          <Link to={HOME}>Plan Your Trip </Link>
        </Typography>
        {auth ? (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Button color="inherit">
              <Link to={LOGIN}>Login</Link>
            </Button>

            <Button color="inherit">
              <Link to={REGISTER}>Register </Link>
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
