import React, { useState } from "react";
import { Country, State, City } from "country-state-city";

const Dropdown = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  const allCountries = Country.getAllCountries();

  const handleCountryChange = (e) => {
    const countryIsoCode = e.target.value;
    setSelectedCountry(countryIsoCode);
    setSelectedState("");
    setCities([]);

    const fetchedStates = State.getStatesOfCountry(countryIsoCode);
    setStates(fetchedStates);
  };

  const handleStateChange = (e) => {
    const stateIsoCode = e.target.value;
    setSelectedState(stateIsoCode);

    const fetchedCities = City.getCitiesOfState(selectedCountry, stateIsoCode);
    setCities(fetchedCities);
  };

  return (
    <div className="bg-cyan-900 w-full h-screen flex items-center justify-center">
      <div className="p-5 sm:w-[600px] bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg">
        <h1 className="text-white text-lg sm:text-2xl lg:text-3xl font-bold mb-5">
          Country State City Dropdown
        </h1>
        <div>
          {/* Country Dropdown */}
          <select
            className="block w-full outline-none mb-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 text-white shadow-md"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {allCountries.map((country) => (
              <option
                key={country.isoCode}
                value={country.isoCode}
                className="text-black"
              >
                {country.name}
              </option>
            ))}
          </select>

          {/* State Dropdown */}
          <select
            className="block w-full outline-none mb-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 text-white shadow-md"
            value={selectedState}
            onChange={handleStateChange}
            disabled={!states.length}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option
                key={state.isoCode}
                value={state.isoCode}
                className="text-black"
              >
                {state.name}
              </option>
            ))}
          </select>

          {/* City Dropdown */}
          <select
            className="block w-full outline-none mb-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 text-white shadow-md"
            disabled={!cities.length}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name} className="text-black">
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
