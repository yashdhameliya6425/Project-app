import React from "react";
// import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor: '#2196F3',
    width: drawerWidth,
    spacing: 8,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '41px',
  },
  logo: {
    marginLeft: '15px',
    color: "#2196F3"
  },
  firstDrawerPaper: {
    width: '55px',
    marginTop: '41px',
    backgroundColor: '#2196F3'
  },
  divider: {
    backgroundColor: "black"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen] = React.useState(false);
  const [subDrawerOpen, setSubDrawerOpen] = React.useState(false);
  const history = useHistory()

  const onRedirect = (url) => {
    history.push(url)
  }

  return (
    <>
      <div className={classes.logo}>
        <Typography variant="h4" noWrap>
          Field Pro
        </Typography>
      </div>
      <Divider variant="fullWidth" className={classes.divider} />
      <div >
        <Drawer
          variant="permanent"
          className={(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          })}
          classes={{
            paper: classes.firstDrawerPaper
          }}
        >
          <Button onClick={() => { setSubDrawerOpen(true) }}> <InboxIcon /> </Button>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={subDrawerOpen}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton
                onClick={() => {
                  setSubDrawerOpen(false);
                }}
              >
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>

            <Divider />
            <List>
              <ListItem button>
                <ListItemText primary="Project Manager" onClick={() => onRedirect('/project-manager')} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Form Manager" onClick={() => onRedirect('/form-manager')} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Question Manager" onClick={() => onRedirect('/questions-manager')} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Photo Label Manager" onClick={() => onRedirect('/photo-label-manager')} />
              </ListItem>
            </List>
          </Drawer>
        </Drawer>
      </div>
    </>
  );
}