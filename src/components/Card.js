import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItem;
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  let dispatch = useDispatchCart();
  let data = useCart();
  let priceRef = useRef();

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food);
    console.log(new Date());
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          quantity: quantity,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          quantity: quantity,
          size: size,
          img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      quantity: quantity,
      size: size,
    });

    // setBtnEnable(true)
  };

  let finalPrice = quantity * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "500px" }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "250px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <p className="card-text">{foodItem.description}</p>
          <div className="container w-100"></div>
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => {
              setSize(e.target.value);
            }}
            ref={priceRef}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-success justify-center"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
