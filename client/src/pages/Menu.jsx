import React from "react";
import dishes from "../menu.json";
import { nanoid } from "nanoid";
import Login from "./Login";

const Menu = () => {
  return (
    <div className="bg-slate-200">
      <div className="container space-y-10 p-10">
        <h1 className="text-center text-2xl">Menu</h1>
        <div className="grid grid-cols-3 justify-center gap-10">
          {dishes.products.map((d) => {
            return <Dish data={d} />;
          })}
        </div>
      </div>
    </div>
  );
};

const Dish = ({ data }) => {
  console.log(data.photo);
  return (
    <div
      key={nanoid()}
      className="w-[300px] shadow-lg h-[400px] mx-auto bg-slate-100 hover:scale-105 duration-200 border-t-8 border-red-500 rounded-md"
    >
      <img className="w-[250px] h-[250px] object-cover mx-auto" src={data.photo} alt="123" />
      <div className="text-center">
        <h1 className="text-xl">{data.name}</h1>
        <hr className=" bg-red-500 h-[3px] w-[80%] mx-auto" />
        <p>{data.ingredients}</p>
      </div>
    </div>
  );
};

export default Menu;
