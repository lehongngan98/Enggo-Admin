// Collection types
type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
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

// News paper types
type NewsType = {
  _id: string;
  title: string;
  content: string;
  image: string;
  information: InformationType[];
  createdAt: Date;
  updatedAt: Date;
};

type InformationType = {
  _id: string;
  subTitle: string;
  text: string;
  image: string;
  news: NewsType;
  createdAt: Date;
  updatedAt: Date;
};


// Exercise types
export interface ExerciseType {
  _id: string
  title: string
  background: string
  Items: Item[]
}

export interface Item {
  title: string
  link: string
  image: string
  content: Content[]
  choosePhrase: ChoosePhrase[]
  _id: string
}

export interface Content {
  text: string
  _id: string
}

export interface ChoosePhrase {
  question: string
  options: string[]
  correctAnswer: string
  _id: string
}

//  Story types
type StoryType = {
  _id: string;
  nameEn: string;
  nameVn: string;
  content: string;
  image: string;
  words: WordType[];
  
};

type WordType = {
  _id: string;
  word: string;
  meaning: string; 
};

// Topic video types
type TopicVideoType = {
  _id: string
  title: string
  background: string
  Items: TopicVideoItem[]
}

type TopicVideoItem ={
  _id: string
  image: string
  title: string
  videoId: string
}

// Vocabulary types
type VocabularyType = {
  _id: string
  image: string
  titleEn: string
  titleVn: string
  vocab: Vocab[]
}

type Vocab ={
  _id: string
  en: string
  vn: string
}

// Quote types
type QuoteType = {
  _id: string
  author: string
  text: string
  words: QuoteWord[]
}

export interface QuoteWord {
  _id: string
  word: string
  pronunciation: string
  meaning: string
  type: string
}

// communication types
type CommunicationType = {
  _id: string
  image: string
  titleEn: string
  titleVn: string
  vocab: Vocab[]
}