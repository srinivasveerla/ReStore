import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
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
