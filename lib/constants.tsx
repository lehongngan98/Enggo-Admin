import {
  Captions,
    LayoutDashboard,
    Newspaper,
    Shapes,
    ShoppingBag,
    Tag,
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
  ];