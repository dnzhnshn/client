import { Grid } from "@mui/material"
import { Products } from '../../app/model/products';
import ProductCard from "./productCard";

interface props {
    products: Products[]
}
export default (props: props) => {
    return <Grid container spacing={4} >
        {props.products.map((p) =>
            <Grid item xs={3} key={p.id}>
                <ProductCard product={p}></ProductCard>
            </Grid>
        )}
    </Grid>
}