import {Link, useLocation} from 'react-router-dom';
import './SideNavigationPanel.scss';
import logo from '../../icons/logo.png';
import homeline from '../../icons/home-line.png';
import hearthand from '../../icons/heart-hand.png';

const SideNavigationPanel = () => {

  const location = useLocation();

  const sideNavigationPanelElements = [
    {
      id: 1,
      path: '/home',
      icon: homeline,
      text: 'Home',
    },
    {
      id: 2,
      path: '/patients',
      icon: hearthand,
      text: 'Patients',
    }
  ]

  return (
    <nav className='side-navigation-panel'>
      <img className='side-navigation-panel__logo' src={logo}/>
      <div className='side-navigation-panel__tab-menu'>
        {sideNavigationPanelElements.map(sideNavigationPanelElement => {
          return (
            <Link key={sideNavigationPanelElement.id} to={sideNavigationPanelElement.path} data-testid={sideNavigationPanelElement.id} className={`side-navigation-panel__tab-menu__tab-element ${location.pathname === sideNavigationPanelElement.path ? 'active' : ''}`}>
              <img className="side-navigation-panel__tab-menu__tab-element__icon" src={sideNavigationPanelElement.icon}/>
              <div className="side-navigation_panel__text">{sideNavigationPanelElement.text}</div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
};

export default SideNavigationPanel;
