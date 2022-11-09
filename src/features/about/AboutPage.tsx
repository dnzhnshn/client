import { Alert, Button, ButtonGroup, Typography } from "@mui/material"
import { Container } from "@mui/system"
import agent from "../../api/agent"
import { useState } from 'react';


const AboutPage=()=>{

  const [validationErrors, setValidationErros] = useState<string[]>([]);
  const getValidationErr = () => {
    agent.testError.getValidationError().then((response) => {
    }).catch((err) => {
      setValidationErros(err);
    })
  }

  return (
    <Container>
      <Typography gutterBottom variant="h2"> error testing</Typography>
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={() => { agent.testError.get400Error().catch((err) => { console.log(err) }) }}>400</Button>
        <Button variant="contained" onClick={() => { agent.testError.get401Error().catch((err) => console.log(err)) }}>401</Button>
        <Button variant="contained" onClick={() => { agent.testError.get404Error().catch((err) => console.log(err)) }}>404</Button>
        <Button variant="contained" onClick={() => { agent.testError.get500Error().catch((err) => console.log(err)) }}>500</Button>
        <Button variant="contained" onClick={getValidationErr}>400</Button>
      </ButtonGroup>
      {validationErrors.length > 0 &&
        <Alert>
          {validationErrors.flat()}
        </Alert>
      }
    </Container>
  )
}
export default AboutPage;