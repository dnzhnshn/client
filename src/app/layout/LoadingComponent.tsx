import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { positions } from "@mui/system";


const LoadingComponent = ()=>(
    <Backdrop open={true} invisible={true}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress size={100} color="secondary" />
            <Typography variant="h4" sx={{justifyContent:"center" ,positions:"fixed" ,top:"%60"}}> Loading...</Typography>          
        </Box>
    </Backdrop>
)
export default LoadingComponent;