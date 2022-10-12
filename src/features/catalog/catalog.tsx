
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Products } from '../../app/model/products';
import ProductList from './productList';

export default () => {
    const [products, setProduct] = useState<Products[]>([])

    useEffect(() => {
      fetch('http://localhost:4000/api/ProductControler')
        .then(((response) => { return response.json() }))
        .then((data) => { setProduct(data);})
    }, [])
    return <>
        <ProductList products={products}></ProductList>
    </>
} 