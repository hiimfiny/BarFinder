import { Outlet, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
const Menu = () => {
  return (
    <>
      <nav className="menus">
        <ul>
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to="/ingredients">
              <button>Ingredients</button>
            </Link>
          </li>
          <li>
            <Link to="/drinks">
              <button>Drinks</button>
            </Link>
          </li>
          <li>
            <Link to="/pubs">
              <button>Pubs</button>
            </Link>
          </li>
          <li>
            <Link to="/map">
              <button>Map</button>
            </Link>
          </li>
          <li>
            <Link to="/user">
              <button>
                <FontAwesomeIcon icon={faUser} />
              </button>
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Menu
