export interface VehicleData {
  imei: string;
  owner: string;
  device_name: string;
  plate: string;
  gsm_no: string;
  activation_time: string;
  expired_gsm: string;
  gps_type: string;
  vehicle_type: string;
  acc: 'ON' | 'OFF';
  speed: number;
  mileage: number;
  last_positioning: string;
  last_update: string;
  battery: string;
}

export interface VehicleResponseSuccess {
  status: true;
  message: {
    total: number;
    data: VehicleData[];
  };
}


export interface VehicleResponseError {
  status: false;
  message: string;
}

export type VehicleResponse = VehicleResponseSuccess | VehicleResponseError;

export async function fetchVehiclesService(token: string): Promise<VehicleResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/vehicle`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const data: VehicleResponse = await response.json();
  return data;
}
