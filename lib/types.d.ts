type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProfuctType[];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: string;
  category: [string];
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
};

type NewsType = {
  _id: string;
  title: string;
  content: string;
  image: string;
  information: [InformationType];
  createdAt: Date;
  updatedAt: Date;
};

type InformationType = {
  _id: string;
  subTitle: string;
  text: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};