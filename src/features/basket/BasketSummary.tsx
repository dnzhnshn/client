import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, getFabUtilityClass } from "@mui/material";
import { useStoreContext } from "../../context/StoreContext";
import { getCurrency } from "../../util/util";

export default function BasketSummary() {
    debugger;
    let deliveryFee = 0;
    const {basket}=useStoreContext(); 
    const subtotal =basket?.items.reduce((sum,item)=>sum+(item.price*item.quantity),0)??0;
    if(subtotal>10000){
        deliveryFee=0;
    }else{
        deliveryFee=200;
    }
    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{ getCurrency(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{getCurrency(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{getCurrency(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}