import iconDashboard from '../assets/iconDashboard.svg';
import iconJob from '../assets/iconJob.svg';
import iconVehicle from '../assets/iconVehicleList.svg';
import iconNavMenu from '../assets/iconNavMenu.svg';
import iconSettings from '../assets/iconSetting.svg';
import iconLogout from '../assets/iconLogout.svg';
import iconSideDashboard from '../assets/iconSideDashboard.svg';
import iconSideJob from '../assets/iconSideJob.svg';
import iconSideVehicle from '../assets/iconSideVehileList.svg';
import iconSideSettings from '../assets/iconSidesettings.svg';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  onLogout: () => void;
  activeItem: string;
  onTabChange: (tabId: string) => void;
}

export default function Sidebar({ isCollapsed, toggleSidebar, onLogout, activeItem, onTabChange }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      collapsedId: 'sideDashboard',
      label: 'Dashboard',
      iconDefault: iconDashboard,
      iconActive: iconSideDashboard
    },
    {
      id: 'job',
      collapsedId: 'sideJob',
      label: 'Job',
      iconDefault: iconJob,
      iconActive: iconSideJob
    },
    {
      id: 'vehicles',
      collapsedId: 'sideVehicle',
      label: 'Vehicle Lists',
      iconDefault: iconVehicle,
      iconActive: iconSideVehicle
    }
  ];

  const checkIsActive = (id: string, collapsedId: string) => {
    if (id === activeItem || collapsedId === activeItem) return true;
    if (id === 'dashboard' && activeItem === 'sideDashboard') return true;
    if (id === 'sideDashboard' && activeItem === 'dashboard') return true;
    if (id === 'job' && activeItem === 'sideJob') return true;
    if (id === 'sideJob' && activeItem === 'job') return true;
    if (id === 'vehicles' && activeItem === 'sideVehicle') return true;
    if (id === 'sideVehicle' && activeItem === 'vehicles') return true;
    return false;
  };

  return (
    <aside
      className={`bg-white border-r border-border-color min-h-screen flex flex-col transition-[width_transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden fixed left-0 top-0 z-[100] ${isCollapsed
        ? '-translate-x-full md:translate-x-0 md:w-[70px]'
        : 'translate-x-0 w-[260px]'
        }`}
    >
      <div className={`h-[70px] flex items-center border-b border-border-color overflow-hidden flex-shrink-0 ${isCollapsed ? 'justify-center px-2' : 'justify-between px-5'
        }`}>
        {isCollapsed ? (
          <button
            className="bg-transparent border-none cursor-pointer text-text-muted flex items-center justify-center p-2 rounded-md transition-colors duration-200 hover:bg-[#f1f5f9] outline-none"
            onClick={toggleSidebar}
            title="Toggle Sidebar"
          >
            <img src={iconNavMenu} alt="icon nav menu" className="rounded-sm w-[24px] h-[24px]" />
          </button>
        ) : (
          <>
            <div className="text-lg font-bold text-[#1e293b] whitespace-nowrap">
              <span className="text-primary-blue">GPS.ID TMS</span>
            </div>
            <button
              className="bg-transparent border-none cursor-pointer text-text-muted flex items-center justify-center p-2 rounded-md transition-colors duration-200 hover:bg-[#f1f5f9] outline-none"
              onClick={toggleSidebar}
              title="Toggle Sidebar"
            >
              <img src={iconNavMenu} alt="icon nav menu" className="rounded-sm w-[24px] h-[24px]" />
            </button>
          </>
        )}
      </div>

      <ul className="list-none p-[20px_10px] m-0 flex flex-col gap-2 flex-grow">
        {menuItems.map((item) => {
          const isActive = checkIsActive(item.id, item.collapsedId);
          const iconSrc = isCollapsed ? item.iconActive : item.iconDefault;

          return (
            <li
              key={item.id}
              onClick={() => onTabChange(isCollapsed ? item.collapsedId : item.id)}
              className={`relative flex items-center gap-[15px] p-[12px_15px] rounded-lg text-[15px] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap ${isCollapsed ? 'justify-center p-3' : 'justify-start'
                } ${isActive
                  ? (isCollapsed ? 'text-primary-blue bg-transparent' : 'text-white bg-primary-blue')
                  : 'text-[#475569] hover:bg-[#f8fafc] hover:text-primary-blue'
                }`}
              title={isCollapsed ? item.label : undefined}
            >
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[5px] h-[36px] bg-primary-blue rounded-r"
                  style={{ marginLeft: '-10px' }}
                />
              )}

              <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                <img
                  src={iconSrc}
                  alt={item.label}
                  className={`rounded-sm w-[24px] h-[24px] transition-all duration-200 ${
                    isActive && !isCollapsed ? 'brightness-0 invert' : ''
                  }`}
                />
              </span>
              {!isCollapsed && (
                <span className="transition-opacity duration-200">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="p-[15px_10px] border-t border-border-color">
        <div
          className={`flex items-center gap-[15px] p-[12px_15px] rounded-lg text-[#475569] text-[15px] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-[#f8fafc] hover:text-primary-blue ${isCollapsed ? 'justify-center p-3' : 'justify-start'
            }`}
          title={isCollapsed ? 'Settings' : undefined}
        >
          <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
            <img src={isCollapsed ? iconSideSettings : iconSettings} alt="icon settings" className="rounded-sm w-[24px] h-[24px]" />
          </span>
          {!isCollapsed && (
            <span className="transition-opacity duration-200">
              Settings
            </span>
          )}
        </div>

        <div
          className={`flex items-center gap-[15px] p-[12px_15px] rounded-lg text-[#475569] text-[15px] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-[#f8fafc] hover:text-primary-blue ${isCollapsed ? 'justify-center p-3' : 'justify-start'
            }`}
          onClick={onLogout}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
            <img src={iconLogout} alt="icon logout" className="rounded-sm w-[24px] h-[24px]" />
          </span>
          {!isCollapsed && (
            <span className="transition-opacity duration-200">
              Logout
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
