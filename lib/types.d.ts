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

// TypeOfNews types
type TypeOfNewsType = {
  _id: string;
  title: string; 
  news: NewsType[];
};


// News paper types
type NewsType = {
  _id: string;
  title: string;
  image: string;
  content: string;
  information: [InformationType];
  typeofnews: [TypeOfNewsType];
  createdAt: Date;
  updatedAt: Date;
};

type InformationType = {
  _id: string;
  subTitle: string;  
  image: string;
  text: string;
};


// Exercise types
type ExerciseType ={
  _id: string
  title: string
  background: string
  Items: Item[]
}

type Item ={
  title: string
  link: string
  image: string
  content: Content[]
  choosePhrase: ChoosePhrase[]
  _id: string
}

type Content ={
  text: string
  _id: string
}

type ChoosePhrase ={
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
  titleEn: string
  titleVn: string
  image: string
  vocab: Vocab[]
}

// BilingualTopics type
type BilingualTopicsType = {
  _id: string
  topic: string
  subTopic: SubTopic[]
}
type SubTopic = {
  _id: string
  titleEn: string
  titleVn: string
  text: string
}

// Channel types
type ChannelType = {
  _id: string
  title: string  
  description: string
  channelId: string
}

// User types
type UserType = {
  _id: string
  fullname: string
  email: string  
  photoURL: string
  role: string
}