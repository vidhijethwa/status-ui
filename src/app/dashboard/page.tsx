'use client';

import { useEffect, useState } from 'react';
import { fetchQuoteData } from '../service/quote.service';
import { useRouter } from 'next/navigation';

export default function PlaceOrders() {
      const [quote, setQuote] = useState<string>('');
      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<string>('');
      const router = useRouter();

      const fetchQuote = async () => {
            setLoading(true);
            setError('');
            try {
                  const response = await fetchQuoteData()
                  setQuote(response.data);
            } catch (err) {
                  setError('Failed to fetch quote.');
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchQuote();
      }, []);

      return (
            <main className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">

                  <div
                        className="absolute inset-0 z-0 pointer-events-none"
                        style={{
                              backgroundImage: `
                        linear-gradient(to right, rgba(32, 216, 244, 0.09) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(32, 216, 244, 0.18) 1px, transparent 1px)
                `,
                              backgroundSize: '200px 200px',
                        }}
                  />

                  <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="w-[700px] h-[700px] rounded-full bg-blue-400 opacity-12 blur-3xl mx-auto mt-40" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                        <svg className="absolute w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
                              <defs>
                                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                          <stop offset="0%" stopColor="black">
                                                <animate attributeName="offset" values="0;1" dur="4s" repeatCount="indefinite" />
                                          </stop>

                                          <stop offset="50%" stopColor="blue" />

                                          <stop offset="100%" stopColor="transparent" />
                                    </linearGradient>
                              </defs>

                              <path
                                    d="M 500 250 L 700 250 C 720 250 720 300 740 300"
                                    stroke="url(#lineGradient)"
                                    strokeWidth="2"
                                    fill="none"
                              />
                              <path
                                    d="M 500 250 L 300 250 C 280 250 280 300 260 300"
                                    stroke="url(#lineGradient)"
                                    strokeWidth="2"
                                    fill="none"
                              />
                        </svg>
                  </div>

                  <div className="relative z-10 bg-white text-black rounded-xl shadow-lg max-w-xl w-full p-8 space-y-6 text-center">
                        <h1 className="text-2xl font-semibold">Daily Inspiration</h1>

                        {loading ? (
                              <p className="text-gray-600">Loading...</p>
                        ) : error ? (
                              <p className="text-red-600">{error}</p>
                        ) : (
                              <p className="text-lg italic">“{quote}”</p>
                        )}

                        <button
                              onClick={fetchQuote}
                              className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-green-700 transition duration-200"
                        >
                              Refresh Quote
                        </button>
                  </div>

                  <div className="fixed bottom-4 z-10">
                        <button
                              onClick={() => router.push('/login')}
                              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                        >
                              Logout
                        </button>
                  </div>
            </main >
      );
}
