import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { apiUrl } from "../../components/Constants/api";
import { coinType } from "../Home/type";

const Coin: React.FC = () => {
  const [data, setData] = useState<coinType>();

  const getData = async (id: string) => {
    const key = "coinranking43e08f59f038992d39299a357d70a5c20bd8b01261a21ad2";
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const { detail } = apiUrl;

    await fetch(`${proxy}${detail}${id}`, {
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
        return setData(data.data.coin);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let id: string | any;
    if (window !== undefined) {
      id = window.location.pathname;
    }
    getData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {data ? (
        <div className={styles.itemCoin}>
          <div className={styles.itemBox}>
            <span>{data.name}</span>
            <div className={styles.imgBox}>
              <img src={data.iconUrl} />
            </div>
            <p>Price - {data.price}</p>
            <p>Market cap - {data.marketCap}</p>
            <p>Price changes: {data.change}</p>
          </div>
        </div>
      ) : (
        <h3>loading</h3>
      )}
    </>
  );
};

export default Coin;
