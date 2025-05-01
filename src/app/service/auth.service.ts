interface LoginResponse {
      success: boolean;
      error?: string;
}

export async function loginUser(username: string): Promise<LoginResponse> {
      try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ username }),
            });

            const data = await response.json();

            if (response.ok) {
                  return { success: true };
            } else {
                  return { success: false, error: data.message || 'Login failed' };
            }
      } catch (error) {
            return { success: false, error: 'Network error, please try again later' };
      }
}
