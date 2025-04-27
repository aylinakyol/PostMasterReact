import { useState, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ContextError } from "./ContextError";
import { navbarMenuItems } from "./variables/Private_Items";
import { svgList } from "./variables/Private_Items";

export default function SideBar() {
    const { setIsErrorExist, setError } = useContext(ContextError);
    const location = useLocation();
    const navigate = useNavigate();

    const navbarMenuLinks = navbarMenuItems.map(link => (
        <div key={link.key}>
            <NavLink
                to={link.href}
                className={location.pathname === link.href ? 'link-navbar-menu-active' : 'link-navbar-menu'}
            >
                {svgList.find(svg => svg.key === link.svgId) && (
                    <svg
                        viewBox={svgList.find(svg => svg.key === link.svgId).viewBox}
                        data-icon={svgList.find(svg => svg.key === link.svgId).name}
                        width="24"
                        height="24"
                        style={{ marginRight: '8px' }}
                        dangerouslySetInnerHTML={{ __html: svgList.find(svg => svg.key === link.svgId).value }}
                    />
                )}
                {link.name}
            </NavLink>
        </div>
    ));

    return (
        <div className = "container">
            <div className = "navbar-menu">
                {navbarMenuLinks}
            </div>
        </div>
    )
}