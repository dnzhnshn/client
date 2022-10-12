import { AppBar, Switch, Toolbar, Typography } from "@mui/material"

interface props {
    mode: boolean,
    setMode: any
}
export default (props: props) => {
    const handleChecked =(e:any)=>{
        props.setMode(e.target.checked);
    }
    return <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
            <Typography variant="h6">
                RE-STORE
            </Typography>
            <Switch
                checked={props.mode}
                onChange={handleChecked}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </Toolbar>
    </AppBar>
}