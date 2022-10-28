import { AlignHorizontalCenter, ShoppingCart } from "@mui/icons-material"
import { AppBar, List, Switch, Toolbar, Typography, ListItem, IconButton, Badge, Box } from "@mui/material"
import { typography } from "@mui/system"
import { NavLink } from "react-router-dom"

interface props {
    mode: boolean,
    setMode: any
}

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'contact', path: '/contact' },
    { title: 'about', path: '/about' }
]

const rightLinks = [
    { title: "login", path: '/login' },
    { title: 'register', path: '/register' }
]

export default (props: props) => {
    const handleChecked = (e: any) => {
        props.setMode(e.target.checked);
    }
    return <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: "flex", justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6">
                    RE-STORE
                </Typography>
                <Switch
                    checked={props.mode}
                    onChange={handleChecked}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Box>
            <List sx={{ display: "flex" }}>
                {
                    midLinks.map(({ title, path }) => (
                        <ListItem component={NavLink}
                            to={path}
                            key={path}
                            sx={{
                                color: "inherit", typography: "h6", '&:hover': {
                                    color: 'secondary.main'
                                }
                            }}>
                            {title.toUpperCase()}
                        </ListItem>
                    ))
                }
            </List>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton size="large" sx={{ color: 'inherit' }}>
                    <Badge badgeContent={1} color='secondary'>
                        <ShoppingCart></ShoppingCart>
                    </Badge>
                </IconButton>
                <List sx={{ display: "flex" }}>
                    {
                        rightLinks.map(({ title, path }) => (
                            <ListItem component={NavLink} to={path} key={path}
                                sx={{
                                    color: "inherit",
                                    typography: "h6",
                                    '&:hover': {
                                        color: 'secondary.main'
                                    }
                                }}>
                                {title.toUpperCase()}
                            </ListItem>
                        ))
                    }
                </List>
            </Box>

        </Toolbar>
    </AppBar>
}