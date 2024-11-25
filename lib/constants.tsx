import {
  ALargeSmall,
  Captions,
    LayoutDashboard,
    LayoutList,
    Newspaper,
    NotebookText,
    Play,
    Shapes,
    ShoppingBag,
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
      label: "Exercises (fix)",
    },
    {
      url: "/story",
      icon: <NotebookText />,
      label: "Story",
    },
    {
      url: "/topicvideo",
      icon: <Play />,
      label: "Topic Video",
    },
    {
      url: "/vocabulary",
      icon: <ALargeSmall/>,
      label: "Vocabulary",
    },
    {
      url: "/quote",
      icon: <TextQuote/>,
      label: "Quote",
    }

  ];