import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { navbarMenuItems } from "./variables/Private_Items";
import SvgIcon from "./components/Component_Svg";

export default function SideBar() {
    const location = useLocation();

    const navbarMenuLinks = navbarMenuItems.map(link => (
        <div key={link.key}>
            <NavLink
                to={link.href}
                className={location.pathname === link.href ? 'link-navbar-menu-active' : 'link-navbar-menu'}
            >
                <SvgIcon svgId={link.svgId} />
                {link.name}
            </NavLink>
        </div>
    ));

    return (
        <div className="container">
            <div className="navbar-menu">
                {navbarMenuLinks}
            </div>
        </div>
    );
}