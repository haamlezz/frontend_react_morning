import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const EditProduct = ({ productId }) => {
  const { data, error } = useSWR(
    `http://127.0.0.1:3002/products/${productId}`,
    fetcher
  );
  const [id, setId] = useState("");
  const [proName, setProName] = useState("");
  const [price, setPrice] = useState("");
  const [catId, setCatId] = useState("");

  useEffect(() => {
    if (data) {
      setId(data.id);
      setProName(data.pro_name);
      setPrice(data.price);
      setCatId(data.cat_id);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      id: id,
      pro_name: proName,
      price: parseInt(price),
      cat_id: parseInt(catId),
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:3002/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      mutate(`http://127.0.0.1:3002/products/${productId}`); // Revalidate the data
      mutate("http://127.0.0.1:3002/products"); // Revalidate the list of products
    } catch (err) {
      console.error(err.message);
    }
  };

  if (error) return <div>Failed to load product</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID:</label>
          <input type="text" value={id} readOnly />
        </div>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={proName}
            onChange={(e) => setProName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category ID:</label>
          <input
            type="number"
            value={catId}
            onChange={(e) => setCatId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
