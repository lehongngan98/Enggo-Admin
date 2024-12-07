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
    // {
    //   url: "/",
    //   icon: <LayoutDashboard />,
    //   label: "Dashboard",
    // },
    // {
    //   url: "/user",
    //   icon: <UsersRound />,
    //   label: "Users",
    // },   
    // {
    //   url: "/collections",
    //   icon: <ShoppingBag />,
    //   label: "Bộ Sưu Tập",
    // } ,
    // {
    //   url: "/products",
    //   icon: <Tag />,
    //   label: "Sản Phẩm",
    // },
    {
      url: "/typeofnews",
      icon: <Newspaper />,
      label: "Loại Tin Tức",
    },
    {
      url: "/news",
      icon: <Captions />,
      label: "Tin Tức",
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