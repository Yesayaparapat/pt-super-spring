import { useState, useEffect } from 'react';
import { fetchVehiclesService, type VehicleData } from '../services/vehicle';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import VehicleCard from '../components/VehicleCard';

interface DashboardProps {
  token: string;
  username: string;
  onLogout: () => void;
}

export default function Dashboard({ token, username, onLogout }: DashboardProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('sideVehicle');
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadVehicleData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetchVehiclesService(token);

        if (response.status === true) {
          setVehicles(response.message.data);
        } else {
          if (response.message === 'Invalid Token.') {
            alert('Sesi Anda telah berakhir. Silakan login kembali.');
            onLogout();
          } else {
            setError(response.message);
          }
        }
      } catch (err) {
        setError('Gagal mengambil data dari server. Periksa koneksi internet Anda.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadVehicleData();
  }, [token, onLogout]);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const query = searchQuery.toLowerCase();
    return (
      (vehicle.plate && vehicle.plate.toLowerCase().includes(query)) ||
      (vehicle.device_name && vehicle.device_name.toLowerCase().includes(query)) ||
      (vehicle.imei && vehicle.imei.toLowerCase().includes(query))
    );
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen w-screen bg-bg-dashboard font-sans overflow-x-hidden">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        onLogout={onLogout}
        activeItem={activeTab}
        onTabChange={setActiveTab}
      />

      <main
        className={`flex-grow transition-[margin-left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col min-h-screen ml-0 ${
          isSidebarCollapsed ? 'md:ml-[70px]' : 'md:ml-[260px]'
        }`}
      >
        <Navbar
          username={username}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          toggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <div className="p-4 sm:p-[30px] flex-grow">
          
          {loading && (
            <div className="flex flex-col items-center py-[100px] text-[#64748b]">
              <div className="w-10 h-10 border-4 border-[#e2e8f0] border-t-blue-500 rounded-full animate-spin"></div>
              <p className="mt-4 font-medium">Memuat data kendaraan dari API...</p>
            </div>
          )}

          {error && (
            <div className="p-5 rounded-lg text-center my-10 mx-auto max-w-[600px] bg-[#fef2f2] border border-[#fee2e2] text-red-500">
              <p className="font-semibold mb-2.5">Gagal Mengambil Data</p>
              <p className="m-0">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.imei} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
