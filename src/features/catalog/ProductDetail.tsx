import { Grid, Typography ,Divider, TableContainer, Table, TableBody, TableRow, TableCell, TextField} from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Products } from '../../app/model/products';
import agent from '../../api/agent';
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../errors/Notfound";
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from "../../context/StoreContext";


export default ()=>{
    const {id} = useParams<{id:string}>();
    const [product,setProduct]=useState<Products | null>(null);
    const [loading,setLoading]=useState(true);
    const [quantity,setQuantity]=useState(0);
    const {basket,setBasket,removeFromBasket} =useStoreContext();
    const [submitting,setSubmitting]=useState(false)
    const item=basket?.items.find(p=>p.productId==product?.id);

    useEffect(()=>{
        if(item) setQuantity(item.quantity);
        agent.catalog.details(parseInt(id)).then((product)=>{
            setProduct(product);
        }).catch((err)=>console.log(err))
        .finally(()=>setLoading(false));
    },[id,item])

    if (loading)
    return <LoadingComponent message="loading..."></LoadingComponent>
    if(!product) 
        return <NotFound></NotFound> 

        const handleQuantityChange=(event:any)=>{
            if(event.target.value>0)
            setQuantity(event.target.value);
        }

    const handleUpdateBasket=()=>{
        if(!item || item.quantity<quantity){
            setSubmitting(true);
            agent.basket.addItem(parseInt(id),quantity).then((basket)=>{
                setBasket(basket);
            }).catch((err)=>{
                console.log(err);
            }).finally(()=>{
                setSubmitting(false);
            })
        }else{
            const updatedQuantity=item.quantity-quantity;
            agent.basket.removeItem(parseInt(id),updatedQuantity).then(()=>{
                removeFromBasket(parseInt(id),updatedQuantity);
            }).catch((err)=>{
                console.log(err);
            }).finally(()=>{
                setSubmitting(false);
            })
        }
    }    

    return(
        <Grid container spacing={6}>
            <Grid item xs={6}>
             <img src={product?.pictureUrl} alt={product?.name} width='%100'/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3"> {product?.name} </Typography>
                <Divider sx={{mb:2}}/>
                <Typography variant="h4">${product?.price.toFixed(2)} </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product?.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product?.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product?.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product?.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity In Stoc</TableCell>
                                <TableCell>{product?.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField variant="outlined" type="number" label="Quantity in cart" fullWidth value={quantity} onChange={handleQuantityChange}>
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <LoadingButton disabled={item?.quantity==quantity} loading={submitting} onClick={handleUpdateBasket} sx={{height:'55px'}} color='primary' size='large' variant="contained" fullWidth > 
                     {item?'Update to basket':'Add to basket'}
                    </LoadingButton>
                </Grid>
            </Grid>
            </Grid>           
        </Grid>
    )
}