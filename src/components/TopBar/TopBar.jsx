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

const useStyles = makeStyles((theme) => ({
  mainToolbarTransparent: {
    background: "none",
    transition: "all 0.3s ease-in-out",
  },
  mainToolbarWhite: {
    background: "white",
    transition: "all 0.3s ease-in-out",
  },

  toolbar: {
    margin: "0 300px",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleWhite: {
    color: "white",
    textShadow: "black 2px 2px 5px",
    flexGrow: 1,
    fontSize: "24px",
    transition: "all 0.3s ease-in-out",
  },
  titleBlack: {
    color: "black",
    flexGrow: 1,
    fontWeight: "bold",
    letterSpacing: "2px",
    fontSize: "24px",
    transition: "all 0.3s ease-in-out",
  },
  logo: {
    width: "64px",
    height: "64px",
  },
}));

const TopBar = () => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
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

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position={"fixed"}
      className={
        fixed ? classes.mainToolbarWhite : classes.mainToolbarTransparent
      }
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <img
            src={AppLogo}
            alt={"Back to home page"}
            className={classes.logo}
          />{" "}
        </IconButton>
        <Typography
          variant="h6"
          className={fixed ? classes.titleBlack : classes.titleWhite}
        >
          Plan Your Trip
        </Typography>

        {auth && (
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
