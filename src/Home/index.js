//component listing all items
import axios from "axios";
import { useEffect, useState } from "react";
import { filters } from "../constants";
import Card from "./Card";
import "./styles.scss";
//API end point
const APIEndPoint =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

const Home = () => {
  const [items, setItems] = useState();
  const [filterApplied, setFilterApplied] = useState();
  var [tempItems, setTempItems] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  var filterToggle = false;
  //Toggle function for filter
  var filterToggler = () => {
    let ele = document.getElementById("filters-div")?.classList;
    if (filterToggle) {
      ele?.add("visible");
    } else {
      ele?.remove("visible");
    }
  };
  //Fetching the list of items from API initially
  useEffect(() => {
    setLoading(true);
    axios
      .get(APIEndPoint)
      .then((response) => {
        setItems(response.data);
        setTempItems(items);
      })
      .catch(() => {
        setError("Some error occurred. Retry after some time.");
      });
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [items, error]);

  useEffect(() => {
    setTempItems(items);
  }, [items]);
  //Function to apply filter and search parameter on the items
  const applyFilters = (form) => {
    setTempItems(items);
    var formData = new FormData(form);
    var filter = {};
    for (var pair of formData.entries()) {
      if (Object.hasOwn(filter, pair[0])) {
        filter[pair[0]].push(pair[1]);
      } else {
        Object.defineProperty(filter, pair[0], {
          value: [pair[1]],
          writable: true,
        });
      }
    }
    if (Object.getOwnPropertyNames(filter).length === 0 || search.length === 0)
      setTempItems(items);
    if (search.length !== 0)
      setTempItems((tempItems) =>
        tempItems.filter((item) => {
          return (
            search.toLowerCase().includes(item.name.toLowerCase()) ||
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            search.toLowerCase().includes(item.type.toLowerCase()) ||
            search.toLowerCase().includes(item.color.toLowerCase())
          );
        })
      );

    Object.getOwnPropertyNames(filter).forEach((key) => {
      if (key === "price") {
        var itemsIn0to250 = [];
        var itemsIn250to450 = [];
        var itemsIn451 = [];
        filter[key].forEach((option) => {
          switch (option) {
            case "0-250":
              itemsIn0to250 = tempItems.filter((item) => {
                if (item[key] <= 250 && item[key] >= 0) {
                  return true;
                } else return false;
              });
              break;
            case "251-450":
              itemsIn250to450 = tempItems.filter((item) => {
                if (item[key] <= 450 && item[key] >= 251) {
                  return true;
                } else return false;
              });
              break;
            case ">450":
              itemsIn451 = tempItems.filter((item) => {
                if (item[key] >= 451) {
                  return true;
                } else return false;
              });
              break;
            default:
              return false;
          }
        });
        tempItems = [...itemsIn0to250, ...itemsIn250to450, ...itemsIn451];
      } else
        tempItems = tempItems.filter((item) =>
          filter[key].toString().includes(item[key])
        );
      setTempItems(tempItems);
    });
    filterToggler();
  };
  //Updating UI once change in search parameter
  useEffect(() => {
    setTempItems(items);
    applyFilters(document.getElementById("filters"));
  }, [search, filterApplied]);

  if (loading)
    return (
      <div className="home">
        <div className="loading-wrapper">
          <box-icon
            size="3rem"
            animation="burst"
            name="circle"
            color="#0b294e"
          ></box-icon>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="home">
        <div className="error-wrapper">
          <h1 className="heading">{error}</h1>
          <button className="btn" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="home">
      <div className="search-wrapper">
        <input
          className="search-bar"
          type="text"
          onChange={(e) => {
            setSearch((search) => e.target.value);
          }}
          value={search}
          placeholder="search by name color type"
        />
        <button
          className="filter-btn btn"
          onClick={() => {
            filterToggle = true;
            filterToggler();
          }}
        >
          <box-icon name="filter-alt" color="#32225a"></box-icon>
        </button>
      </div>
      {/* Listing all item using card component */}
      <div className="home-items-list">
        {tempItems?.length === 0 ? (
          <>No items Found</>
        ) : (
          <>
            {tempItems?.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </>
        )}
      </div>
      <div id="filters-div" className="home-filters">
        <form id="filters">
          {Object.entries(filters).map((filter) => {
            return (
              <div>
                <p className="filter-name">{filter[0]}</p>
                {filter[1].options.map((item) => (
                  <div key={item} className="filter-option">
                    <input type="checkbox" name={filter[0]} value={item} />
                    <label>{item}</label>
                  </div>
                ))}
              </div>
            );
          })}
          <div className="btn-wrapper">
            <button
              className="reset"
              onClick={(e) => {
                e.preventDefault();
                setTempItems((tempItems) => items);
                filterToggler();
                setFilterApplied(false);
                document.getElementById("filters").reset();
              }}
            >
              Reset
            </button>
            <button
              className="submit"
              onClick={(e) => {
                e.preventDefault();
                setFilterApplied(true);
                applyFilters(document.getElementById("filters"));
              }}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
