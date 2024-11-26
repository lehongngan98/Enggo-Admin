import {
  ALargeSmall,
  Captions,
    CaseSensitive,
    LayoutDashboard,
    LayoutList,
    Newspaper,
    NotebookText,
    Play,
    Shapes,
    ShoppingBag,
    Speech,
    Tag,
    TextQuote,
    UsersRound,
    Youtube,
  } from "lucide-react";
  
  export const navLinks = [
    {
      url: "/",
      icon: <LayoutDashboard />,
      label: "Dashboard",
    },
    {
      url: "/user",
      icon: <UsersRound />,
      label: "Users",
    },    
    {
      url: "/news",
      icon: <Newspaper />,
      label: "Chủ Đề Tin Tức",
    },
    {
      url: "/infomation",
      icon: <Captions />,
      label: "Tin Tức",
    },
    
    {
      url: "/exercises",
      icon: <LayoutList/>,
      label: "Bài Tập (fix)",
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
      label: "Tự Vựng",
    },
    {
      url: "/quote",
      icon: <TextQuote/>,
      label: "Trích Dẫn",
    },
    {
      url: "/communication",
      icon: <Speech/>,
      label: "Giao Tiếp",
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
    }

  ];