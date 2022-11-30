import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { fontWeight } from "@mui/system";
import { Link } from "react-router-dom";
import { Products } from '../../app/model/products';
import { useState } from 'react';
import agent from '../../api/agent';
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../context/StoreContext";

interface props {
  product: Products
}
export default ({ product }: props) => {
  const [loading, setLoading] = useState(false);
  const {setBasket}=useStoreContext();

  const handleAddItem=()=>{
  setLoading(true);
  agent.basket.addItem(product.id).
  then((basket)=>{setBasket(basket)}).
  catch((err)=>{console.log(err)}).
  finally(()=>(setLoading(false)))
  }

  return <Card>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: "secondary.main" }} >
          {product.name.charAt(0).toUpperCase()}
        </Avatar>
      }
      title={product.name}
      titleTypographyProps={{ sx: { fontWeight: "bold", color: "primary.main" } }}>
    </CardHeader>
    <CardMedia
      component="img"
      height="140"
      sx={{ backgroundSize: "contain" }}
      image="https://www.ticimax.com/Uploads/images/url-nedir-fe43a0.jpg"
      title={product.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" color="secondary">
        ${(product.price / 100).toFixed(2)}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product.brand} / {product.type}
      </Typography>
    </CardContent>
    <CardActions>
      <LoadingButton 
      size="small" 
      loading={loading} 
      onClick={()=>handleAddItem()} >Add to card</LoadingButton>
      <Button component={Link} to={`/productDetail/${product.id}`} size="small">View</Button>
    </CardActions>
  </Card>
}