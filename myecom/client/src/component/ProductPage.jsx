import { useEffect, useState } from "react";

import Axios from "axios";

export const Product = () => {

  const [products, setProducts] = useState({});

  const [err, setErr] = useState(null)

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = localStorage.getItem("ACCESS_TOKEN");

        const _headers = {}

        if (token) {
          _headers.Authorization = `Bearer ${token}`
        }


        const result = await Axios(
          'http://localhost:9000/product',
          {
            headers: _headers
          }
        );
        setIsLoading(false);
        setProducts(result.data);
      }
      catch (e) {
        setErr(e.response.data.error)
      }
    }
    fetchData();
  }, []);

  if (err) {
    return <h1>{err}</h1>
  }


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

