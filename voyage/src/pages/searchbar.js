import React from "react";
import "./styles/searchbar.css";
import Results from "./results";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

// Places API key
var searchMade = false;

export default function Searchbar() {
  const [address, setAddress] = React.useState("");
  const [search, setSearch] = React.useState("");

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);

    setAddress(value);
    setSearch(results[0]);
    searchMade = true;
  };

  const getSearch = () => {
    return <Results item={search} />;
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="searchbar">
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
                className: "form-control",
                label: "Search",
              })}
            />

            <div className="suggestions">
              {loading ? <div>loading...</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div
                    className="suggestion"
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      {searchMade ? getSearch() : null}
    </div>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
