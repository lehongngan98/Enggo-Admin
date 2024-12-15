import {
  ALargeSmall,
  Captions,
  CaseSensitive,
  LayoutList,
  Newspaper,
  NotebookText,
  Play,
  Speech,
  TextQuote,
  Youtube
} from "lucide-react";
  
  export const navLinks = [
   
    {
      url: "/news",
      icon: <Captions />,
      label: "Tin Tức",
    },
    
    {
      url: "/typeofnews",
      icon: <Newspaper />,
      label: "Loại Tin Tức",
    },
    {
      url: "/exercises",
      icon: <LayoutList/>,
      label: "Bài Tập",
    },
    {
      url: "/story",
      icon: <NotebookText />,
      label: "Truyện",
    },
    {
      url: "/topicvideo",
      icon: <Play />,
      label: "Chủ Đề Video",
    },
    {
      url: "/vocabulary",
      icon: <ALargeSmall/>,
      label: "Từ Vựng",
    },
    {
      url: "/quote",
      icon: <TextQuote/>,
      label: "Trích Dẫn",
    },
    
    {
      url: "/bilingualtopic",
      icon: <CaseSensitive/>,
      label: "Chủ Đề Song Ngữ",
    },
    {
      url: "/channel",
      icon: <Youtube/>,
      label: "Kênh Học Youtube",
    },{
      url: "/communication",
      icon: <Speech/>,
      label: "Giao Tiếp",
    },

  ];