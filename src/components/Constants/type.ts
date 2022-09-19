export type coinType = {
    btcPrice: string;
    change: string;
    coinrankingUrl: string;
    color: string;
    iconUrl: string;
    listedAt: number;
    lowVolume: boolean;
    marketCap: string;
    name: string;
    price: string;
    rank: number;
    sparkline: [];
    symbol: string;
    tier: number;
    uuid: string
};

export type coinsType = [
    coinType
];