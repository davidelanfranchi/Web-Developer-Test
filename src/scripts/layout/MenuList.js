import React from "react";
import "./MenuList.scss";

const menuItems = [
  {
    label: "Products",
    href: "#",
  },
  {
    label: "News",
    href: "#",
  },
  {
    label: "Contact",
    href: "#",
  },
  {
    label: "Cart",
    href: "#",
    iconUrl: "/static/images/cart.svg",
  },
];

function MenuList(props) {
  return (
    <ul className={`MenuList ${props.type}`}>
      {menuItems.map((item, index) => (
        <li className="MenuList__item" key={index}>
          <a
            className="MenuList__link"
            href={item.href}
            aria-label={item.label}
          >
            {item.iconUrl ? (
              <span
                className="MenuList__link-icon"
                style={{
                  WebkitMaskImage: `url(${item.iconUrl})`,
                  maskImage: `url(${item.iconUrl})`,
                }}
              ></span>
            ) : (
              <span className="MenuList__link-label">{item.label}</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default MenuList;
