import React, { useState } from "react";
import useSWR, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const Product = () => {
  const [proName, setProName] = useState("");
  const [price, setPrice] = useState("");
  const [catId, setCatId] = useState("");
  const { data, error } = useSWR("http://127.0.0.1:3002/products", fetcher);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      pro_name: proName,
      price: parseInt(price),
      cat_id: parseInt(catId),
    };

    try {
      const response = await fetch("http://127.0.0.1:3002/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      mutate("http://127.0.0.1:3002/products"); // Revalidate the data
    } catch (err) {
      console.error(err.message);
    }
  };

  if (error) return <div>Failed to load products</div>;
  if (!data) return <div>Loading...</div>;

  const handleDelete = (id) => {
    console.log(`delete id ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`edit id ${id}`);
  };

  return (
    <>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Product</button>
      </form>
      <h1>Products</h1>
      <ul>
        {data.map((product) => (
          <li key={product.id}>
            {product.pro_name} - Price: {product.price} - Category ID:{" "}
            {product.cat_id}
            <button onClick={() => handleEdit(product.id)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Product;
