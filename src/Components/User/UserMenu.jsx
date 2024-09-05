import KPIDashboard from './KPIDashboard';

import Topbar from '../common/topbar/Topbar';
import Navbar from './UserNavbar';
import SideNav from '../common/SideNav/sideNav';
const UserMenu = () => {
  

  return (
    <div>
      <Topbar/>
    <Navbar/>
      <KPIDashboard />
    </div>
  );
};

export default UserMenu;
