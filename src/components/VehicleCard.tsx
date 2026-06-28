import { type VehicleData } from '../services/vehicle';
import iconDispatch from '../assets/iconDispatch.svg';
import iconGps from '../assets/TruckBox - Hitam.svg';
import iconAcc from '../assets/iconAcc.svg';
import iconDev from '../assets/iconDev.svg';
import iconBattery from '../assets/iconBattery.svg';

interface VehicleCardProps {
  vehicle: VehicleData;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const speedPercentage = Math.min((vehicle.speed / 120) * 100, 100);

  const getVehicleStatus = () => {
    if (vehicle.acc === 'ON' && vehicle.speed > 0) {
      return { label: 'Running', color: 'text-emerald-500' };
    }
    if (vehicle.acc === 'OFF' && vehicle.speed === 0) {
      return { label: 'Parking', color: 'text-primary-blue' };
    }
    if (vehicle.acc === 'ON' && vehicle.speed === 0) {
      return { label: 'Stop', color: 'text-red-500' };
    }
    return { label: 'Unknown', color: 'text-gray-500' };
  };

  const status = getVehicleStatus();

  return (
    <div className="flex flex-col">
      <div className="bg-white border-t border-x border-gray-200 rounded-t-sm px-5 py-2 flex items-center gap-2 self-start  z-10 -mb-[1px]">
        <span className="text-[11px] text-gray-400 font-medium">Status :</span>
        <img src={iconDispatch} alt="Dispatch" className="w-4.5 h-4.5" />
        <span className={`text-[11px] font-bold ${status.color}`}>{status.label}</span>
      </div>

      <div className="bg-white rounded-sm rounded-tl-none border border-gray-200 overflow-hidden flex flex-col ">
        <div className="bg-white flex items-center px-5 py-4">
          <div className="flex-shrink-0 flex flex-col items-center justify-center w-[160px]">
            <svg className="w-[160px] h-[90px]" viewBox="0 0 160 90">
              <path
                d="M 15 80 A 60 60 0 0 1 145 80"
                fill="none"
                stroke="#E1E8EC"
                strokeWidth="20"
                strokeLinecap="butt"
                strokeDasharray="11, 10"
              />
              <path
                d="M 15 80 A 60 60 0 0 1 145 80"
                fill="none"
                stroke={`url(#speedGrad-${vehicle.imei})`}
                strokeWidth="20"
                strokeLinecap="butt"
                strokeDasharray="11, 10"
                mask={`url(#activeMask-${vehicle.imei})`}
              />
              <defs>
                <linearGradient id={`speedGrad-${vehicle.imei}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#43A6EE" />
                  <stop offset="100%" stopColor="#43A6EE" />
                </linearGradient>
                <mask id={`activeMask-${vehicle.imei}`}>
                  <path
                    d="M 15 80 A 50 50 0 0 1 145 80"
                    fill="none"
                    stroke="white"
                    strokeWidth="20"
                    strokeDasharray={Math.PI * 65}
                    strokeDashoffset={Math.PI * 65 - (speedPercentage / 100) * Math.PI * 65}
                    strokeLinecap="butt"
                  />
                </mask>
              </defs>
            </svg>
            <div className="text-center -mt-10">
              <span className="text-sm font-bold text-gray-800">{vehicle.speed}km/h</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Odo : {vehicle.mileage}km</span>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center justify-center w-[60px]">
            <img src={iconGps} alt="GPS" className="w-[60px] h-[52px]" />
          </div>

          <div className="flex-grow min-w-0">
            <div className="text-[10px] text-gray-400 mb-0.5">
              Shipment Number{' '}
              <span className="font-semibold text-gray-500">{vehicle.imei}</span>
            </div>
            <div className="text-lg font-extrabold text-gray-800 leading-tight mb-3 truncate">
              {vehicle.plate || 'No Plate'} - {vehicle.device_name}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 w-full border-t border-gray-100 py-3 px-6 bg-white">
          <div className={`flex items-center gap-2 text-sm font-semibold ${vehicle.acc === 'ON' ? 'text-emerald-500' : 'text-[#1A1A1A]'}`}>
            <img src={iconAcc} alt="ACC" className="w-6 h-6" />
            <span>ACC {vehicle.acc}</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#1A1A1A]">
            <img src={iconDev} alt="Device" className="w-6 h-6" />
            <span>{vehicle.gps_type || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-end gap-2 text-sm font-semibold text-[#1A1A1A]">
            <img src={iconBattery} alt="Battery" className="w-6 h-6" />
            <span>{vehicle.battery}%</span>
          </div>
        </div>

        <div className="px-6 pb-4 bg-white">
          <div className="bg-[#F5F6FA] border border-[#f1f5f9] rounded-xl px-4 py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 text-[10px] text-gray-700 font-bold font-nunito text-center">
            <div className="sm:text-left">
              Data Terakhir : <span className="text-[#1A1A1A] font-normal">{vehicle.last_update}</span>
            </div>
            <div className="sm:text-center">
              No GSM : <span className="text-[#1A1A1A] font-normal">{vehicle.gsm_no}</span>
            </div>
            <div className="sm:text-right">
              Expired : <span className="text-[#1A1A1A] font-normal">{vehicle.expired_gsm}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}