import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { positions } from "@mui/system";

interface props{
    message?:string
}
const LoadingComponent = ({message='loading...'}:props)=>(
    <Backdrop open={true} invisible={true}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress size={100} color="secondary" />
            <Typography variant="h4" sx={{justifyContent:"center" ,positions:"fixed" ,top:"%60"}}>{message}</Typography>          
        </Box>
    </Backdrop>
)
export default LoadingComponent;