import { useEffect, useState } from "react";

import Axios from "axios";

import { Product } from "./Product"

import { API_URL } from "../config/config"

export const Home = () => {

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
    <div className="row">
      {
        products.map(product => (
          <div className="col-3 p-2 p-2" key={product._id} >
            <Product product={product} />
          </div>
        )
        )
      }
    </div>
  )
}

