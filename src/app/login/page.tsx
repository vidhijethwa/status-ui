'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { loginUser } from '../service/auth.service';

export default function LoginPage() {
      const [username, setUsername] = useState<string>('');
      const [error, setError] = useState<string>('');
      const router = useRouter();

      const handleLogin = async (e: FormEvent) => {
            e.preventDefault();
            setError('');

            const { success, error } = await loginUser(username);

            if (success) {
                  router.push('/dashboard');
            } else {
                  setError(error || 'Unexpected error');
            }
      };

      return (
            <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
                  <div className="w-full max-w-md bg-white/95 border border-gray-200 rounded-2xl p-10 shadow-xl transition-transform hover:scale-[1.01] duration-300 ease-in-out">

                        <div className="flex flex-col items-center mb-6">
                              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                              <p className="text-sm text-gray-500">Login to get your Quote</p>
                        </div>

                        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                              <div>
                                    <label className="block text-sm text-gray-600 mb-1">Username</label>
                                    <input
                                          type="text"
                                          placeholder="Enter your username"
                                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-black shadow-sm"
                                          value={username}
                                          onChange={(e) => setUsername(e.target.value)}
                                          required
                                    />
                              </div>


                              {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                              <button
                                    type="submit"
                                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition duration-200 ease-in-out shadow-md"
                              >
                                    Login
                              </button>
                        </form>
                  </div>
            </main>
      );
}
