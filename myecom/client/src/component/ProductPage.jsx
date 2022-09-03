import { useEffect, useState } from "react";

import Axios from "axios";

import { Product } from "./Product"

import { API_URL } from "../config/config"

export const ProductPage = () => {

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
          `${API_URL}/product`,
          {
            headers: _headers
          }
        );
        setIsLoading(false);
        setProducts(result.data);
      }
      catch (e) {
        console.log("EE", e)
        setErr(e?.response?.data?.error ?? e.messsage)
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
        products?.map((product) => <Product key={product._id} product={product} />
        )
      }
    </div>
  )
}

