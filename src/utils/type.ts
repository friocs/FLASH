type nftType = {
  id: number;
  name: string;
  img?: string;
  logo?: string;
  type?: boolean;
  Floor_price?: number;
  quantity?: number;
  Highest_quotation?: number;
  Transaction_volume?: number;
  Cumulative_total_price?: number;
  portrait?: string;
};

type nftrecordType = {
  id: number; //id
  series?: string; //系列
  price: number | string; //价格
  time: string; //时间
  img?: string; //图片
  type?: boolean; // 是否撤销
  Pooltype?: string; //   Pooltype '0'买池 '1'卖池 '2'买卖池
  code?: string; // 编号
  has?: string; // TX
  gas?: string; // gas费
  Token?: string; // 代币
  quantity?: number; // 购买数量
  NFT_quantity?: number; //出售数量
  curvetype?: boolean; // 曲线类型
  curvetquantity?: string; //Delta
  Service?: string; //手续费
  Delegation?: string; //委托类型
  poolAddr?: string; //池子地址
  nftContractAddr?: string; //nft地址
  sellNftCount?: string;
  contractLogo?: string;
  name?: string;
  nftContractName?: string;
  buyAmount?: string|number;
  newType?: string|number;
  from?: string;
  to?: string;
  swapAmount?:string|number;
  swapNum?:string|number;
};

type userMapType = {
  hexAddress: string;
  name: string;
  headPic: string;
  token?: string;
  isLogin: boolean;
  introduction: string;
};

type TransactionType = {
  ts: string;
  price: string;
  time: string;
};

type businessType = {
  img: string;
  name: string;
  price: number;
  type?: boolean;
};

// interface Inters {
//   length: number;
// }

type bannerListType = {
  name: string;
  type: boolean;
  top_img: string;
  back_img: string;
};

type nftdetailsType = {
  poolAddr: string;
  blockChain: string;
  contractAddr: string;
  creatorIncome: string;
  nftCirculation: string;
  nftContractName: string;
  name:string;
  nftImage: string;
  nftOwner: string;
  nftPrice: string;
  nftTokenId: string;
  protocolStandard: string;
  tokenList: string;
  isAuth: number;
  contractLogo: string;
  transactionHistoryVOList: {
    ts: string;
    price: string;
    time: string;
    type: string;
    to: string;
    from: string
  }[];
  partData: {
    ts: string;
    price: string;
    time: string;
    type: string;
    to: string;
    from: string
  }[];
};

type mynftType = {
  value: string;
  label: string;
  nftContractAddr: string;
  id: number;
};

export {
  nftType,
  nftrecordType,
  userMapType,
  TransactionType,
  businessType,
  bannerListType,
  nftdetailsType,
  mynftType,
};
