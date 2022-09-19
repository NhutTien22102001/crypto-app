import styles from "./index.module.scss";
import React, { useEffect, useState, useRef } from "react";
import { apiUrl } from "../../components/Constants/api";
import { coinsType } from "../Constants/type";
import Item from "./Item";

const Home: React.FC = () => {
  const [coinData, setCoinData] = useState<coinsType>();
  const { base } = apiUrl;
  const dataRef = useRef<coinsType>();

  const getData = async () => {
    const key = "coinranking43e08f59f038992d39299a357d70a5c20bd8b01261a21ad2";
    const proxy = "https://cors-anywhere.herokuapp.com/";
    await fetch(`${proxy}${base}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": `${key}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dataRef.current = data.data.coins;
        return setCoinData(data.data.coins);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSortByPrice = () => {
    let sort =
      coinData &&
      coinData.sort((a, b) => {
        return +a.price - +b.price;
      });
    dataRef.current = sort;
    setCoinData(sort ? [...sort] : undefined);
  };

  const onSortByCap = () => {
    let sort =
      dataRef.current &&
      dataRef.current.sort((a, b) => {
        return +a.marketCap - +b.marketCap;
      });
    dataRef.current = sort;
    setCoinData(sort ? [...sort] : undefined);
  };

  const onSortByChange = () => {
    let sort =
      dataRef.current &&
      dataRef.current.sort((a, b) => {
        return +a.change - +b.change;
      });
    dataRef.current = sort;
    setCoinData(sort ? [...sort] : undefined);
  };

  const onSearch = (e: any) => {
    let dataFilter: any =
      dataRef.current &&
      dataRef.current.filter((o: any) => {
        return o.name.toLowerCase().includes(e.target.value.toLowerCase());
      });

    if (dataFilter?.length) {
      setCoinData(dataFilter);
    }
  };

  const onCancel = (e: any) => {
    e.preventDefault();
    setCoinData(undefined);
    const { price, change, cap } = e.target;
    let inputTern = [price, change, cap];
    inputTern.map((e, i) => {
      if ((e.checked = true)) {
        return (e.checked = false);
      }
    });
    getData();
  };

  return (
    <>
      <div className={styles.searchBox}>
        <input
          placeholder="Search coins name"
          onChange={onSearch}
          id="name"
          type="text"
        />
        <form onSubmit={onCancel} className={styles.listSort}>
          <div className={styles.sortItem}>
            <input
              onChange={onSortByPrice}
              type="radio"
              id="price"
              name="sort"
            />
            <label htmlFor="price">Sort by price</label>
          </div>
          <div className={styles.sortItem}>
            <input onChange={onSortByCap} type="radio" id="cap" name="sort" />
            <label htmlFor="cap">Sort by market cap</label>
          </div>
          <div className={styles.sortItem}>
            <input
              onChange={onSortByChange}
              type="radio"
              id="change"
              name="sort"
            />
            <label htmlFor="change">Sort by price change</label>
          </div>
          <button>Cancel sorting</button>
        </form>
      </div>

      {coinData ? (
        <div className={styles.listItem}>
          {coinData.length &&
            coinData.map((e, i) => {
              return <Item key={i} data={e} />;
            })}
        </div>
      ) : (
        <h3>loading</h3>
      )}
    </>
  );
};

export default Home;
