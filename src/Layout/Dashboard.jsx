import { useState } from "react";
import {
  FaAd,
  FaBars,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaUtensils,
  FaTimes,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass =
    "flex items-center gap-3 px-4 py-2 rounded-md font-medium transition duration-200 hover:bg-[#ff5200]/80 hover:text-white";
  const activeClassName = "bg-[#ff5200] text-white";

  // Reusable NavLink Wrapper (for auto close in mobile)
  const CloseNavLink = ({ to, icon, label, extra }) => (
    <NavLink
      to={to}
      onClick={() => setIsOpen(false)} // ✅ Auto close on click
      className={({ isActive }) =>
        `${navLinkClass} ${isActive ? activeClassName : ""}`
      }
    >
      {icon} {label} {extra}
    </NavLink>
  );

  const adminLinks = (
    <>
      <li>
        <CloseNavLink to="/dashboard/adminHome" icon={<FaHome />} label="Admin Home" />
      </li>
      <li>
        <CloseNavLink to="/dashboard/addItems" icon={<FaUtensils />} label="Add Items" />
      </li>
      <li>
        <CloseNavLink to="/dashboard/manageItems" icon={<FaList />} label="Manage Items" />
      </li>
      <li>
        <CloseNavLink to="/dashboard/users" icon={<FaUser />} label="All Users" />
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <CloseNavLink to="/dashboard/userHome" icon={<FaHome />} label="User Home" />
      </li>
      <li>
        <CloseNavLink
          to="/dashboard/paymentHistory"
          icon={<FaCalendar />}
          label="Payment History"
        />
      </li>
      <li>
        <CloseNavLink
          to="/dashboard/cart"
          icon={<FaShoppingCart />}
          label="My Cart"
          extra={
            <span className="ml-auto bg-white text-[#ff5200] text-xs font-bold px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          }
        />
      </li>
      <li>
        <CloseNavLink to="/dashboard/review" icon={<FaAd />} label="Review" />
      </li>
    </>
  );

  const commonLinks = (
    <>
      <li>
        <CloseNavLink to="/" icon={<FaHome />} label="Home" />
      </li>
      <li>
        <CloseNavLink to="/order/salad" icon={<FaSearch />} label="Menu" />
      </li>
      <li>
        <CloseNavLink to="/contact" icon={<FaEnvelope />} label="Contact" />
      </li>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-gradient-to-b from-[#f76b2b] to-orange-400 text-white shadow-lg p-4">
        <Link to="/">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">🍽️ Mozzo Bazar</h2>
            <p className="text-sm text-orange-100 mt-1">Dashboard</p>
          </div>
        </Link>

        <nav>
          <ul className="space-y-2">
            {isAdmin ? adminLinks : userLinks}
            <div className="divider my-4 border-white/20" />
            {commonLinks}
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <button
          className="p-4 text-[#ff5200] text-2xl"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        {/* Sidebar Content */}
        <aside
          className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-[#f76b2b] to-orange-400 text-white shadow-lg p-4 z-50 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">🍽️ Mozzo Bazar</h2>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes className="text-white text-xl" />
            </button>
          </div>

          {/* Role-based Links */}
          <nav>
            <ul className="space-y-2">
              {isAdmin ? adminLinks : userLinks}
              <div className="divider my-4 border-white/20" />
              {commonLinks}
            </ul>
          </nav>
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
