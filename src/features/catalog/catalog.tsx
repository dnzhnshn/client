
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Products } from '../../app/model/products';
import ProductList from './productList';
import agent from '../../api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
export default () => {
    const [products, setProduct] = useState<Products[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.catalog.list()
            .then((data) => { setProduct(data); })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [])
    if (loading)
        return <LoadingComponent message='loading catalog'></LoadingComponent>

    return <>
        <ProductList products={products}></ProductList>
    </>
} 