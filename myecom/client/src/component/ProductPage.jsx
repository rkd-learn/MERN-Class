import { useEffect, useState } from "react";

import Axios from "axios";

export const Product = () => {

  const [products, setProducts] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(
        'http://localhost:9000/product'
      );
      setIsLoading(false);
      setProducts(result.data);
    }
    fetchData();
  }, []);


  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      ProductPage
      {
        products?.map((product, index) => (
          <div key={index}>
            <h1>Name: {product.name}</h1>
            <h2>Price: ${product.price}</h2>
            <h2>Size : {product.size}</h2>
            <h2>Brand : {product.brand}</h2>
          </div>
        )
        )
      }
    </div>
  )
}

