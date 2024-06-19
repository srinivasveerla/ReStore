import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../app/errors/Notfound";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";
export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [pd, setPd] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const { basket, setBasket, removeItem } = useStoreContext();
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find((i) => i.productId == pd?.id);
  useEffect(() => {
    if (item) setQuantity(item.quantity);
    id && // this is to ensure undefined doesn't go in as the parameter for details (from react 18)
      agent.Catalog.details(parseInt(id)) // parseInt is needed because in our agent argument is defined as int, if it waas a string we could have passed it directly
        .then((data) => setPd(data)) // lets check if we can add a then
        .catch((error) => console.log(error.response))
        .finally(() => setLoading(false));
  }, [id, item]);

  
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    //React.ChangeEvent<HTMLInputElement>) {
    if (parseInt(event.target.value) >= 0) {
      setQuantity(parseInt(event.target.value));
    }
  }

  function handleUpdateCart() {
    setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      pd &&
        agent.Basket.addItem(pd.id, updatedQuantity)
          .then((basket) => setBasket(basket))
          .catch((error) => console.log(error))
          .finally(() => setSubmitting(false));
    } else {
      const updatedQuantity = item.quantity - quantity;
      pd &&
        agent.Basket.removeItem(pd.id, updatedQuantity)
          .then(() => removeItem(pd.id, updatedQuantity))
          .catch((error) => console.log(error))
          .finally(() => setSubmitting(false));
    }
  }
  // axios
  //   .get(`http://localhost:5000/api/products/${id}`)
  //   .then((response) => response.data)
  //   .then((data) => setPd(data))
  //   .finally(() => setLoading(false));
  // }, [id]);

  if (loading) return <LoadingComponent message="Product details loading..." />;
  if (!pd) return <NotFound />;

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
          <Grid container sx={{ mt: 3 }} spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                disabled={item?.quantity === quantity || !item && quantity === 0}
                loading={submitting}
                variant="contained"
                sx={{ height: "55px" }}
                onClick={handleUpdateCart}
                fullWidth
              >
                {quantity > 0 ? "Update Quantity" : "Add to Cart"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
