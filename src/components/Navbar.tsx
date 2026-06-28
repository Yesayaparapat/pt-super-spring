import iconNotif from './../assets/iconNotif.svg';
import iconAvatar from './../assets/iconAvatar.svg';
import iconFlag from './../assets/iconFlag.svg';
import iconDropDown from './../assets/iconDropDown.svg';
import iconNavbar from '../assets/iconNavbar.svg';
interface NavbarProps {
  username: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export default function Navbar({ searchQuery, setSearchQuery, toggleSidebar, isSidebarCollapsed }: NavbarProps) {
  return (
    <header className="h-[70px] bg-white border-b border-border-color flex items-center justify-between px-4 sm:px-[30px] sticky top-0 z-[90]">
      <div className="flex items-center gap-2 sm:gap-5">
        <button
          className={`bg-transparent border-none cursor-pointer text-text-dark flex items-center justify-center p-2 rounded-[5px] hover:bg-[#f1f5f9] outline-none ${isSidebarCollapsed ? 'md:hidden' : 'block'
            }`}
          onClick={toggleSidebar}
          title="Toggle Sidebar"
        >
          <img src={iconNavbar} alt="icon navbar" className='rounded-sm w-[24px] h-[24px]' />
        </button>

        <div className="flex items-center bg-[#f1f5f9] rounded-[20px] px-3 py-1.5 sm:px-4 sm:py-2 w-36 xs:w-48 sm:w-[300px] border border-transparent transition-all duration-200 focus-within:border-primary-blue focus-within:bg-white">
          <svg width="16" height="16" fill="none" stroke="#888888" strokeWidth="2.5" viewBox="0 0 24 24" className="flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-sm text-text-dark ml-2 w-full placeholder:text-text-muted"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-[25px]">
        <div className="relative cursor-pointer flex items-center p-1">
          <img className='rounded-xl' src={iconNotif} alt="notification icon" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
            6
          </span>
        </div>

        {!isSidebarCollapsed && (
          <div className="flex items-center gap-1.5 cursor-pointer text-sm font-medium text-[#475569]">
            <img src={iconFlag} alt="icon flag" className='rounded-sm' />
            <span className="hidden sm:inline">English</span>
            <img src={iconDropDown} alt="icon drop down" className='rounded-sm' />
          </div>
        )}

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-lg flex-shrink-0 overflow-hidden">
            <img src={iconAvatar} alt="User Avatar" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-[#1e293b] leading-tight ">Aldy</span>
            <span className="text-xs text-text-muted">Admin</span>
          </div>
          <div className='lg:ml-[50px] border-[1px] border-[#e2e8f0] rounded-full w-6 h-6 flex items-center justify-center'>
            <img src={iconDropDown} alt="icon drop down" className='rounded-sm' />
          </div>
        </div>
      </div>
    </header>
  );
}
