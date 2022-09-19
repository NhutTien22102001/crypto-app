import React from "react";
import Link from "next/link";
import { coinType } from "./type";
import styles from "./Item.module.scss";

type Props = {
  data: coinType;
};

const Item: React.FC<Props> = ({ data }) => {
  return (
    <Link href={data.uuid}>
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
    </Link>
  );
};

export default Item;
