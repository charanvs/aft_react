import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import MarqueeComponent from "../components/utilities/MarqueeComponent";
import apiClient from "../apiClient";

interface NavLinkType {
  id: number;
  name: string;
  url: string;
  parent_id: number | null;
  order: number;
  children?: NavLinkType[];
}

const Header: React.FC = () => {
  const [navLinks, setNavLinks] = useState<NavLinkType[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchNavLinks = async () => {
      try {
        const response = await apiClient.get<NavLinkType[]>("/nav-links"); // Base URL in apiClient
        setNavLinks(response.data);
      } catch (error) {
        console.error("Failed to fetch navigation links:", error);
      }
    };

    fetchNavLinks();
  }, []);

  const isActiveMenu = (link: NavLinkType): boolean => {
    if (location.pathname === link.url) {
      return true;
    }
    if (link.children) {
      return link.children.some((child) => location.pathname === child.url);
    }
    return false;
  };

  const renderNavItems = (links: NavLinkType[]) => {
    return links.map((link) =>
      link.children && link.children.length > 0 ? (
        <NavDropdown
          title={link.name}
          id={`dropdown-${link.id}`}
          key={link.id}
          className={`custom-dropdown ${isActiveMenu(link) ? "active" : ""}`}
          onMouseEnter={(e) => {
            const dropdown = (e.target as HTMLElement).closest(".dropdown");
            if (dropdown) dropdown.classList.add("show");
          }}
          onMouseLeave={(e) => {
            const dropdown = (e.target as HTMLElement).closest(".dropdown");
            if (dropdown) dropdown.classList.remove("show");
          }}
        >
          {link.children.map((child) =>
            child.children && child.children.length > 0 ? (
              <NavDropdown
                title={child.name}
                id={`dropdown-${child.id}`}
                key={child.id}
                className="nested-dropdown"
                onMouseEnter={(e) => {
                  const dropdown = (e.target as HTMLElement).closest(".dropdown");
                  if (dropdown) dropdown.classList.add("show");
                }}
                onMouseLeave={(e) => {
                  const dropdown = (e.target as HTMLElement).closest(".dropdown");
                  if (dropdown) dropdown.classList.remove("show");
                }}
              >
                {child.children.map((subChild) => (
                  <NavDropdown.Item
                    as={NavLink}
                    to={subChild.url}
                    key={subChild.id}
                    className="sub-sub-menu-item"
                  >
                    {subChild.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ) : (
              <NavDropdown.Item
                as={NavLink}
                to={child.url}
                key={child.id}
                className="sub-menu-item"
              >
                {child.name}
              </NavDropdown.Item>
            )
          )}
        </NavDropdown>
      ) : (
        <Nav.Item key={link.id}>
          <NavLink
            to={link.url}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {link.name}
          </NavLink>
        </Nav.Item>
      )
    );
  };

  return (
    <>
      <Navbar expand="lg" className="navbar mb-0">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="navbar-brand">
            AFT Portal
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">{renderNavItems(navLinks)}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Include Marquee Component */}
      <MarqueeComponent />
    </>
  );
};

export default Header;
