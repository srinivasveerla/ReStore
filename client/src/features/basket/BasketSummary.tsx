import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";

export default function BasketSummary() {
    const {basket} = useStoreContext();
    const subtotal = basket ? basket.items.reduce((sum,item)=>sum+(item.price*item.quantity),0):0;
    const deliveryFee = subtotal<10000 ? subtotal*0.05 : 0; // 10000%100 = 100

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{(subtotal/100).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{(deliveryFee/100).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{((subtotal + deliveryFee)/100).toFixed(2)}</TableCell>
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