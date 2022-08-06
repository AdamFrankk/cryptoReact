import React from "react";
import { ReactComponent as IconFinance } from "images/icons/menu-finance.svg";
import { ReactComponent as IconPackage } from "images/icons/menu-package.svg";
import { ReactComponent as IconPerson } from "images/icons/menu-person.svg";
import { ReactComponent as IconSettings } from "images/icons/menu-settings.svg";
import { ReactComponent as IconTeam } from "images/icons/menu-team.svg";
import { Link } from "react-router-dom";
import style from "./menu.module.scss";

const default_links = [
  {
    name: "Profile",
    link: "/profile",
    icon: IconPerson
  },
  {
    name: "My package",
    link: "/package",
    icon: IconPackage
  },
  {
    name: "My team",
    link: "/team",
    icon: IconTeam
  },
  {
    name: "Finance",
    link: "/finance",
    icon: IconFinance
  },
  {
    name: "Settings",
    link: "/settings",
    icon: IconSettings
  }
];

const Menu = ({ links = default_links }) => {
  return (
    <div className={style.container}>
      <div className={style.menu}>
        {links &&
          Array.isArray(links) &&
          links.map((item) => (
            <Link key={item.name} to={item.link} className={style.menu_item}>
              <item.icon className={style.menu_item_icon} />
              <span className={style.menu_item_label}>{item.name}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Menu;
