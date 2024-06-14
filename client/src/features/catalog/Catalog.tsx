import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error.response))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <LoadingComponent message="Catalog loading..." />;
  return (
    <>
      <ProductList products={products} />
    </>
  );
}

{
  /* function AddProducts() {
    setProducts((products) => [
      ...products,
      {
        name: "Product" + products.length,
        price: products.length * 100,
        id: products.length + 101,
        brand: "mybrand",
        description: "mydescription",
        pictureUrl: "http://picsum.photos/200",
      },
    ]);
  }
  
  <Button
        sx={{ backgroundColor: "red" }}
        variant="contained"
        id="submit-btn"
        onClick={() => AddProducts()}
      >
        Add Products
      </Button> */
}
