import { NavLink } from 'react-router-dom';
import NavBlockOk from './NavBlockOk';

function Navbar() {
  return (
    <div className="nav_container">
      <div className="about fixed top-[5.86vh] right-[5.86vw] text-white z-20">
      <div className="about_container relative h-[50px] about_section font-bold text-xl flex flex-col justify-center items-center">
            <div className="about_text">About</div>
          <div className="bottom_bar absolute bottom-0 border-4 w-[75%] border-[#7C7C7C] rounded-md"></div>
          <div className="bottom_bar_fill absolute bottom-0 border-4 w-[0] opacity-0 rounded-md"></div>
        </div>
      </div>
      <nav className="navbar flex ">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'active' : '')}
        end
      >
        <NavBlockOk navText="Home" />
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <NavBlockOk navText="Service 1" />
      </NavLink>
      <NavLink
        to="/blog"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <NavBlockOk navText="Service 2" />
      </NavLink>
      <NavLink
        to="/portfolio"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <NavBlockOk navText="Portofolio" />
      </NavLink>
    </nav>
    </div>
    
  );
}

export default Navbar;