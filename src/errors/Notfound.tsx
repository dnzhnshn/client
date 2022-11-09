
import { Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';

const NotFound = () => {
    return <Container component={Paper}>
        <Typography variant='h4' color='error' gutterBottom>
            Opss! We could not this page
        </Typography>
    </Container>
}

export default NotFound;