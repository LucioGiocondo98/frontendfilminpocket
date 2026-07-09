import { Burger, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import "../styles/TopNavbar.css";
import { GiFilmSpool } from "react-icons/gi";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { TiFilm } from "react-icons/ti";
import { TbCardsFilled } from "react-icons/tb";
import { FaDoorOpen } from "react-icons/fa6";
import { TfiUser } from "react-icons/tfi";

export default function TopNavbar() {
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="top-navbar-container">
      <div className="px-3 d-flex justify-content-between align-items-center">
        <Link
          to="/home"
          className="top-navbar-brand d-flex align-items-center"
        >
          <GiFilmSpool size={32} />
          <span className="ms-2 navbar-title-text">FilmInPocket</span>
        </Link>

        <div className="d-none d-lg-flex align-items-center gap-5">
          <Link
            to="/profilo"
            className="top-navbar-link d-flex flex-row"
          >
            <TfiUser size={20} />
            Profilo
          </Link>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            className="top-navbar-link"
          >
            <FaDoorOpen size={20} />
            Logout
          </a>
        </div>

        <Burger
          opened={opened}
          onClick={toggle}
          className="d-lg-none"
          color="white"
          aria-label="Menu"
        />
      </div>

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        title={<span className="menu-off">Menu</span>}
        classNames={{ content: "top-navbar-offcanvas", header: "top-navbar-offcanvas" }}
      >
        <div className="d-flex flex-column align-items-start ps-3 gap-2">
          <Link to="/home" onClick={close} className="top-navbar-link">
            <TiFilm size={20} />
            Home
          </Link>
          <Link to="/collection" onClick={close} className="top-navbar-link">
            <TbCardsFilled size={20} />
            Collezione
          </Link>
          <Link to="/decks" onClick={close} className="top-navbar-link">
            <MdOutlineCollectionsBookmark size={20} />
            Mazzi
          </Link>
          <Link to="/profilo" onClick={close} className="top-navbar-link">
            <TfiUser size={20} />
            Profilo
          </Link>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              close();
              handleLogout();
            }}
            className="top-navbar-link"
          >
            <FaDoorOpen size={20} />
            Logout
          </a>
        </div>
      </Drawer>
    </div>
  );
}
