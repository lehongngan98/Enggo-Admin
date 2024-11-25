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
  } from "lucide-react";
  
  export const navLinks = [
    {
      url: "/",
      icon: <LayoutDashboard />,
      label: "Dashboard",
    },
    {
      url: "/collections",
      icon: <Shapes />,
      label: "Collections",
    },
    {
      url: "/products",
      icon: <Tag />,
      label: "Products",
    },

    {
      url: "/news",
      icon: <Newspaper />,
      label: "Newspaper Topic",
    },
    {
      url: "/infomation",
      icon: <Captions />,
      label: "Article",
    },
    
    {
      url: "/exercises",
      icon: <LayoutList/>,
      label: "Bài Tập (fix)",
    },
    {
      url: "/story",
      icon: <NotebookText />,
      label: "Câu chuyện",
    },
    {
      url: "/topicvideo",
      icon: <Play />,
      label: "Chủ đề Video",
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
      label: "Chủ đề song ngữ",
    }

  ];