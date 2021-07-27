import React from "react"
import { Link } from "react-router-dom"
import { Drawer as MUIDrawer, List, ListItem } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({ drawer: { width: "900px" } })

const Drawer = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const classes = useStyles()
  return (
    <MUIDrawer
      open={isDrawerOpen}
      className={classes.drawer}
      onClose={() => setIsDrawerOpen(false)}
    >
      <List>
        <ListItem button key={"Dashboard"}>
          <Link to="/dashboard">Dashboard</Link>
        </ListItem>
        <ListItem button key={"Games"}>
          <Link to="/games">Games</Link>
        </ListItem>
        <ListItem button key={"Home"}>
          <Link to="/">Home</Link>
        </ListItem>
      </List>
    </MUIDrawer>
  )
}

export default Drawer
