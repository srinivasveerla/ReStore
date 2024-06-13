import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import { Grid, Table, TableCell, TableRow, Typography } from "@mui/material";
export default function ProductDetails() {
  let { id } = useParams<{ id: string }>();
  const [pd, setPd] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then((response) => {
      console.log(response.data);
      setPd(response.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (!pd) return <h1>Product Not Found</h1>;

  return (
    <>
      <Typography variant="h4">Product Details</Typography>
      <Grid container>
        <Grid item xs={6}>
          <img
            src={pd.pictureUrl}
            alt={pd.name}
            style={{ width: "100%" }}
          ></img>
        </Grid>
        <Grid item xs={6}>
          <Table>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{pd.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>{pd.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Price</TableCell>
              <TableCell>${(pd.price / 100).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{pd.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Quantity in Stock</TableCell>
              <TableCell>{pd.quantityInStock}</TableCell>
            </TableRow>
          </Table>
        </Grid>
      </Grid>
    </>
  );
}
