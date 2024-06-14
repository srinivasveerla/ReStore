import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../app/errors/Notfound";
export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [pd, setPd] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    id && // this is to ensure undefined doesn't go in as the parameter for details (from react 18)
      agent.Catalog.details(parseInt(id)) // parseInt is needed because in our agent argument is defined as int, if it waas a string we could have passed it directly
        .then((data) => setPd(data))
        .catch((error) => console.log(error.response))
        .finally(() => setLoading(false));
  }, [id]);
  // axios
  //   .get(`http://localhost:5000/api/products/${id}`)
  //   .then((response) => response.data)
  //   .then((data) => setPd(data))
  //   .finally(() => setLoading(false));
  // }, [id]);

  if (loading) return <LoadingComponent message="Product details loading..." />;
  if (!pd) return <NotFound/>;

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
            <TableBody>
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
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
}
