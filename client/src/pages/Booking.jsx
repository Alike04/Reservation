import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";

var curr = new Date();
curr.setDate(curr.getDate() + 1);
var now = curr.toISOString().substring(0, 10);

const Booking = ({ user }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [tables, setTables] = useState([{ number: 1, capacity: 2, _id: 0 }]);
  const [bookings, setBookings] = useState();
  const [date, setDate] = useState(now);
  const [time, setTime] = useState("9AM");
  const [size, setSize] = useState();
  const [focus, setFocus] = useState();

  const fetchAvailableTables = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/table`, {
        params: { time: time, date: date },
      })
      .then((res) => {
        setTables(res.data.tables);
      })
      .catch((e) => console.error(e));
  };
  const fetchBookings = () => {
    if (!user) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/book/${user._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setBookings(res.data.book);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  useEffect(() => {
    if (!user) return;
    fetchAvailableTables();
  }, [date, time]);

  // useEffect(() => {
  //   const newTables = tables.filter((table) => table.capacity == size);
  //   setTables(newTables);
  // }, [size]);
  // if (!user) {
  //   return (
  //     <div className="flex justify-center items-center">
  //       <button className="px-4 py-2 ">Log in</button>
  //     </div>
  //   );
  // }
  if (!user) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="flex flex-col space-y-5 text-center">
          <h1 className="text-xl">Please log in</h1>
          <NavLink to="/login">
            <button className="py-2 px-4 bg-red-500 text-white">Log in</button>
          </NavLink>
        </div>
      </div>
    );
  }
  if (!bookings) {
    return <></>;
  }
  const Confirm = () => {
    const reserve = () => {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/book/create`,
          {
            date: date,
            time: time,
            tableId: focus._id,
            userId: user._id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          fetchAvailableTables();
        })
        .catch();
    };
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
          <div className="relative  my-6 mx-auto max-w-3xl w-[800px]">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-center text-xl font-semibold">
                  Confirm your reservation
                </h3>
                <h1
                  className="text-red-500 font-bold text-xl cursor-pointer"
                  onClick={() => {
                    setShowDialog(false);
                    setFocus(null);
                  }}
                >
                  X
                </h1>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <h1>Date: {date}</h1>
                <h1>Time: {time}</h1>
                <h1>table size: {focus.capacity}</h1>
                <h1>table number: {focus.number}</h1>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm"
                  type="button"
                  onClick={() => {
                    reserve();
                    setShowDialog(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  const Table = ({ data }) => {
    return (
      <div key={nanoid()} className="w-[200px] p-4  bg-slate-200 shadow-lg">
        <h1 className="text-7xl text-center text-red-500 font-bold">
          #{data.number}
        </h1>
        <hr className="h-[2px] bg-black mt-10" />
        <h1 className="text-center">Capacity: {data.capacity}</h1>
        <div className="w-[100%] flex justify-center">
          <button
            onClick={() => {
              setFocus(data);
              setShowDialog(true);
            }}
            className="text-white bg-red-500 mt-4 py-2 px-4 hover:bg-red-600"
          >
            Reserve
          </button>
        </div>
      </div>
    );
  };

  const Booking = ({ data }) => {
    console.log(data);
    const table = tables.find((t) => t._id == data.tableId);
    console.log(table);
    return (
      <div
        key={nanoid()}
        className="w-full h-20 bg-slate-200 m-2 flex justify-around items-center"
      >
        <h1>Time: {data.time}</h1>
        <h1>Table number: {table.number}</h1>
        <h1>{data.date.slice(0, 10)}</h1>
        <button className="text-white bg-red-500 mt-4 py-2 px-4 hover:bg-red-600">
          Cancel
        </button>
      </div>
    );
  };

  return (
    <div className="">
      <div className="container">
        <h1 className="text-center font-bold text-lg">Table Reservation</h1>
        <div className="flex justify-around mt-10">
          <input
            defaultValue={now}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            min={new Date().toISOString().split("T")[0]}
            className="w-[250px] bg-red-500 text-white p-2"
            type="date"
          />
          <select
            onChange={(e) => {
              setTime(e.target.value);
            }}
            name="time"
            className="w-[250px] bg-red-500 p-2 text-white"
            id=""
          >
            <option value="9AM">9AM</option>
            <option value="10AM">10AM</option>
            <option value="11AM">11AM</option>
            <option value="1PM">1PM</option>
            <option value="2PM">2PM</option>
            <option value="3PM">3PM</option>
            <option value="4PM">4PM</option>
            <option value="5PM">5PM</option>
            <option value="6PM">6PM</option>
          </select>
          <select
            onChange={(e) => setSize(e.target.value)}
            name="size"
            className="w-[250px] bg-red-500 p-2 text-white"
            id=""
          >
            <option value="-">-</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
        {showDialog && <Confirm />}
        <div className="grid grid-cols-4 gap-4 justify-center mt-10 p-10">
          {tables.map((t) => {
            if (size == "-") return <Table data={t} />;
            else if (t.capacity == size && t.available == true)
              return <Table data={t} />;
          })}
        </div>
      </div>
      <div className="container">
        <h1 className="text-center font-bold text-lg">My reservations</h1>
        <div className="flex flex-col space-y-5">
          {bookings.map((b) => {
            return <Booking data={b} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Booking;
