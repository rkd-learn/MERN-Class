import { useState } from "react";
import { API_URL } from "../config/config";

import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  convertJsonToFormData,
  getNotEqualObject,
  isObjectEqual,
} from "../utils/helpers";

export const ProductForm = () => {
  const params = useParams();
  const id = params.id;

  const navitate = useNavigate();

  const [product, setProduct] = useState(null);

  const [err, setErr] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ shouldUseNativeValidation: true });

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("ACCESS_TOKEN");

        const _headers = {};

        if (token) {
          _headers.Authorization = `Bearer ${token}`;
        }

        const result = await Axios(`${API_URL}/product/${id}`, {
          headers: _headers,
        });
        setIsLoading(false);

        const product = result.data;

        const defualtData = {};
        if (product._id) {
          defualtData.name = product.name;
          defualtData.price = product.price;
          defualtData.brand = product.brand;
          defualtData.size = product.size;
          defualtData.productImage = product.image;
        }

        reset(defualtData);

        setProduct(product);
      } catch (e) {
        setIsLoading(false);
        setErr(e?.response?.data?.error ?? e.messsage);
      }
    };

    if (id && !product) {
      getProduct(id);
    }
  }, [id]);

  const onSubmit = async (data) => {
    const defualtData = {};
    if ( id && product?._id) {
      defualtData.name = product.name;
      defualtData.price = product.price;
      defualtData.brand = product.brand;
      defualtData.size = product.size;
      defualtData.productImage = product.image;
    }

    if (id) {
      const payload = {
        ...data,
        productImage: product.image,
      };
      // check updated data and new data
      if (!isObjectEqual(payload, defualtData)) {
        const updatedData = getNotEqualObject(payload, defualtData);
        const formData = convertJsonToFormData(updatedData);

        await Axios.put(`${API_URL}/product/${id}`, formData);
      }
    } else {
      console.log("ELSE")
      const payload = {
        ...data,
        productImage: data.productImage[0],
      };
      const formData = convertJsonToFormData(payload);

      const createdProduct = await Axios.post(`${API_URL}/product`, formData);
      if (createdProduct.data._id) {
        navitate(`/product/${createdProduct.data._id}`);
      }
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("productImage", file);

      const update = await Axios.put(`${API_URL}/product/${id}`, formData);

      const product = update.data;

      const defualtData = {};
      if (product._id) {
        defualtData.name = product.name;
        defualtData.price = product.price;
        defualtData.brand = product.brand;
        defualtData.size = product.size;
        defualtData.productImage = product.image;
      }

      reset(defualtData);

      setProduct(product);
    }
  };

  return (
    <div id="singup">
      {errors && (
        <h2
          style={{
            color: "red",
            margin: "auto",
          }}
        >
          {JSON.stringify(errors)}
        </h2>
      )}

      <h3 className="text-center pt-5">Product form</h3>
      <div className="container">
        <div
          id="login-row"
          className="row justify-content-center align-items-center"
        >
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form
                id="login-form"
                className="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-group">
                  <label htmlFor="name" className="text-info">
                    name:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    {...register("name", { required: "Please enter name." })}
                    required={true}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price" className="text-info">
                    price:
                  </label>
                  <br />
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    {...register("price", {
                      required: "Please enter price.",
                      valueAsNumber: true,
                    })}
                    required={true}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="brand" className="text-info">
                    brand:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="form-control"
                    {...register("brand", {
                      required: "Please enter brand name.",
                    })}
                    required={true}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="size" className="text-info">
                    Size:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="size"
                    id="size"
                    className="form-control"
                    {...register("size", { required: "Please enter size." })}
                    required={true}
                  />
                </div>
                {Boolean(id) && product ? (
                  <>
                    <img
                      className="img-fluid img-rounded m-4"
                      src={`${API_URL}/${product.image}`}
                      style={{ height: "200px" }}
                      alt={product.name}
                    />
                    <div>
                      <label
                        htmlFor="productImage"
                        className="btn btn-info btn-md mb-4"
                      >
                        Upload new image
                      </label>
                      <br />
                      <input
                        type="file"
                        name="productImage"
                        onChange={handleUploadImage}
                        id="productImage"
                        style={{ display: "none" }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="form-group">
                    <label htmlFor="productImage" className="text-info">
                      product Image:
                    </label>
                    <br />
                    <input
                      type="file"
                      name="productImage"
                      id="productImage"
                      className="form-control"
                      {...register("productImage", {
                        required: "Please enter productImage.",
                      })}
                      required={true}
                    />
                  </div>
                )}
                <div className="form-group">
                  <input
                    type="submit"
                    name="submit"
                    className="btn btn-info btn-md"
                    value= {id?'update':"submit"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
