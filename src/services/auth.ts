export interface LoginResponseSuccess {
  status: true;
  message: {
    data: {
      username: string;
      fullname: string;
      email: string;
      phone: string;
      token: string;
    };
  };
}

export interface LoginResponseError {
  status: false;
  message: string;
}

export type LoginResponse = LoginResponseSuccess | LoginResponseError;

export async function loginService(username: string, password: string): Promise<LoginResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/login`;

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data: LoginResponse = await response.json();
  return data;
}

export async function verifyTokenService(token: string): Promise<boolean> {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseUrl}/vehicle`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.status === true;
  } catch (err) {
    console.error('Token validation failed:', err);
    return false;
  }
}

export async function logoutService(_token: string): Promise<void> {
  return Promise.resolve();
}