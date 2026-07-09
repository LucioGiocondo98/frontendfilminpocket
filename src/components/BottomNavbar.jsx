import { MdPublic } from "react-icons/md";
import { Link } from "react-router-dom";
import "../styles/BottomNavbar.css";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { TiFilm } from "react-icons/ti";
import { TbCardsFilled } from "react-icons/tb";
const BottomNavbar = () => {
  return (
    <div className="bottom-navbar-container bg-dark border-secondary shadow-sm">
      <div className="p-0">
        <div className="row justify-content-evenly text-center gx-0">
          <div className="col-3 bottom-icon p-0">
            <Link to="/home" className="d-block py-2 nav-link-custom">
              <TiFilm size={20} />
              <div className="nav-text">Home</div>
            </Link>
          </div>
          <div className="col-3 bottom-icon  p-0">
            <Link to="/collection" className="d-block py-2 nav-link-custom">
              <TbCardsFilled size={20} />
              <div className="nav-text">Collezione</div>
            </Link>
          </div>
          <div className="col-3 bottom-icon p-0">
            <Link to="/decks" className="d-block py-2 nav-link-custom">
              <MdOutlineCollectionsBookmark size={20} />
              <div className="nav-text">Deck</div>
            </Link>
          </div>
          <div className="col-3 bottom-icon p-0">
            <Link to="/home" className="d-block py-2 nav-link-custom">
              <MdPublic size={20} />
              <div className="nav-text">Community</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
