import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="bg-blue-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div className="col-span-1">
            <ul className="flex justify-start items-center">
              <li>
                <Link to="/" className="text-white mr-4">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explorar" className="text-white mr-4">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/viagens" className="text-white mr-4">
                  My Trips
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-white mr-4">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Header;
