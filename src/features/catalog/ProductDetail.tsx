import { Grid, Typography ,Divider, TableContainer, Table, TableBody, TableRow, TableCell} from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Products } from '../../app/model/products';


export default ()=>{
    const {id} = useParams<{id:string}>();
    const [product,setProduct]=useState<Products | null>(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        axios.get(`http://localhost:4000/api/ProductControler/${id}`)
        .then((response)=>setProduct(response.data))
        .catch((err)=>console.log(err))
        .finally(()=>setLoading(false));
    },[id])
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
            </Grid>
        </Grid>
    )
}