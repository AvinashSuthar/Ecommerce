import React, { useState } from "react";
import { useAppStore } from "../store";
import { useNavigate } from "react-router-dom";
import Box from "../components/Box";
import { Country, State, City } from "country-state-city";
import Checkout from "../components/Checkout";
import CheckoutSteps from "../components/Checkout";

const Shipping = () => {
  const { shippingInfo, setShippingInfo } = useAppStore();
  const [address, setaddress] = useState(shippingInfo.address);
  const [city, setcity] = useState(shippingInfo.city);
  const [state, setstate] = useState(shippingInfo.state);
  const [contry, setcontry] = useState(shippingInfo.contry);
  const [pinCode, setpinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setcphoneNo] = useState(shippingInfo.phoneNo);
  const navigate = useNavigate();
  const handleSubmit = () => {
    const shippingInfo = {
      address,
      state,
      city,
      pinCode,
      contry,
      phoneNo,
    };
    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
    setShippingInfo(shippingInfo);
    navigate("/order/details");
  };
  return (
    <div>
      <CheckoutSteps step={0} />
      <Box>
        <div className="flex flex-col">
          <h1 className="mb-7 text-3xl text-center font-semibold">
            Shipping Details
          </h1>

          <label htmlFor="address" className="mb-1">
            Address
          </label>
          <input
            type="address"
            id="address"
            required
            name="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            className="p-2 mb-5 border rounded w-[400px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1">
            Phone
          </label>
          <input
            type="number"
            id="phone"
            required
            min={1111111111}
            max={9999999999}
            name="phone"
            placeholder="Enter Phone No."
            value={phoneNo}
            onChange={(e) => setcphoneNo(e.target.value)}
            className="p-2 mb-5 border rounded w-[400px]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="pincode" className="mb-1">
            Pincode
          </label>
          <input
            type="number"
            required
            id="pincode"
            name="pincode"
            placeholder="Enter Pincode"
            value={pinCode}
            onChange={(e) => setpinCode(e.target.value)}
            className="p-2 mb-5 border rounded w-[400px]"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="contry" className="mb-1">
            Select Contry
          </label>
          <select
            name="contry"
            onChange={(e) => setcontry(e.target.value)}
            className="border my-2 py-2 w-full rounded"
            value={contry}
            required
            id="contry"
          >
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        {contry && (
          <div className="flex flex-col">
            <label htmlFor="state" className="mb-1">
              Select State
            </label>
            <select
              className="border my-2 py-2 w-full rounded"
              name="state"
              required
              id="state"
              value={state}
              onChange={(e) => setstate(e.target.value)}
            >
              {State.getStatesOfCountry(contry).map((s) => (
                <option key={s.name} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {state && (
          <div className="flex flex-col">
            <label htmlFor="city" className="mb-1">
              Select City
            </label>
            <select
              className="border my-2 py-2 w-full rounded"
              name="city"
              required
              id="city"
              value={city}
              onChange={(e) => setcity(e.target.value)}
            >
              {City.getCitiesOfState(contry, state).map((c) => (
                <option key={c.name} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          className="mt-5 pt-3  pb-3 w-full text-sm mb-5 bg-black text-white hover:bg-gray-700 py-2 rounded transition-all duration-300"
          onClick={handleSubmit}
        >
          NEXT
        </button>
      </Box>
    </div>
  );
};

export default Shipping;
