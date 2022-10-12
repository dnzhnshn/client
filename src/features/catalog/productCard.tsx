import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { fontWeight } from "@mui/system";
import { Products } from '../../app/model/products';

interface props {
  product: Products
}

export default ({ product }: props) => {
  return <Card>
    <CardHeader
      avatar={
        <Avatar sx={{bgcolor:"secondary.main"}} >
          {product.name.charAt(0).toUpperCase()}
        </Avatar>
      }
      title={product.name}
      titleTypographyProps={{sx: {fontWeight:"bold" ,color:"primary.main"}}}>
    </CardHeader>
    <CardMedia
      component="img"
      height="140"
      sx={{backgroundSize:"contain"}}
      image="https://www.ticimax.com/Uploads/images/url-nedir-fe43a0.jpg"
      title={product.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" color="secondary">
        ${(product.price/10).toFixed(2)}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product.brand} / {product.type}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Add to card</Button>
      <Button size="small">View</Button>
    </CardActions>
  </Card>
}