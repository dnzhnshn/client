
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useStoreContext } from '../../context/StoreContext';
import agent from '../../api/agent';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import BasketSummary from './BasketSummary';

const BasketPage = () => {

  const { basket, removeFromBasket, setBasket } = useStoreContext();
  const [loadingStatus, setStatus] = useState({
    loading:false,
    name:''
  });

  if (!basket) return <Typography variant='h3'>Basket is empty </Typography>

  const handleRemoveItem = (productId: number, quantity = 1,name:string) => {
    setStatus({loading:true,name});
    agent.basket.removeItem(productId, quantity)
      .then(() => { removeFromBasket(productId, quantity); })
      .catch((err) => { console.log(err) })
      .finally(() => { setStatus({loading:false,name}); })
  }

  const handleAddItem = (productId: number, quantity = 1,name:string) => {
    setStatus({loading:true,name});
    agent.basket.addItem(productId, quantity)
      .then((basket) => { setBasket(basket) })
      .catch((err) => { console.log(err) })
      .finally(() => { setStatus({loading:false,name});})
  }

  return (<>
   <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="center">Quantity</TableCell>
          <TableCell align="right">Subtotal</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {basket.items.map((row) => (
          <TableRow
            key={row.productId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">${(row.price / 100).toFixed(2)}</TableCell>
            <TableCell align="center">
              <LoadingButton color='error' loading={loadingStatus.loading && loadingStatus.name==='remove'+row.productId} onClick={() => handleRemoveItem(row.productId,undefined,'remove'+row.productId.toString())}>
                <Remove />
              </LoadingButton>
              {row.quantity}
              <LoadingButton color='secondary' loading={loadingStatus.loading&& loadingStatus.name==='add'+row.productId} onClick={() => { handleAddItem(row.productId,undefined,'add'+row.productId.toString()) }}>
                <Add />
              </LoadingButton>
            </TableCell>
            <TableCell align="right">${((row.price * row.quantity) / 100).toFixed(2)}</TableCell>
            <TableCell align="right">
              <LoadingButton color='error' loading={loadingStatus.loading&& loadingStatus.name==='delete'+row.productId} onClick={() => handleRemoveItem(row.productId, row.quantity,'delete'+row.productId.toString())}>
                <Delete></Delete>
              </LoadingButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Grid container>
    <Grid item xs={6}>
      <Box></Box>
    </Grid>
  <Grid item xs={6}>
    <BasketSummary></BasketSummary>
  </Grid>
  </Grid>
  
  </>
 
  )
}

export default BasketPage;