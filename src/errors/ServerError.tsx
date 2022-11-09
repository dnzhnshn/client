
import { Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';

const ServerError = () => {
    return <Container component={Paper}>
        <Typography variant='h4' color='error' gutterBottom>
            Server Error
        </Typography>
    </Container>
}

export default ServerError;