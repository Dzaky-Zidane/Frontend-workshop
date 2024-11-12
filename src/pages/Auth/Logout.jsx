import { Link } from 'react-router-dom';
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      // Hapus cookies setelah logout
      useEffect(() => {
        Cookies.set('token', token, { expires: 7, secure: true, path: '/' });
        Cookies.remove('id', { path: '/' });
        Cookies.remove('token', { path: '/' });
        console.log("Cookies after logout:", document.cookie); // Cek status cookie
        navigate('/login');
      }, [navigate]);
      

      // Jika menggunakan API untuk logout
      try {
        const token = Cookies.get('token');
        if (token) {
          await axios.post('http://127.0.0.1:8000/api/auth/logout', null, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        // Arahkan pengguna ke halaman login
        navigate('/login');
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div>
      {/* Tailwind CDN link (pastikan link ini ada di dalam tag <head> di index.html) */}
      <link
        alt="Your Company"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        className="mx-auto h-10 w-auto"
      />

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
            Sedang Logout...
          </h2>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-500">Sedang mengarahkan ke halaman login...</p>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
    return (
      <nav>
        {/* Link ke komponen Logout */}
        <Link to="/logout" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Logout
        </Link>
      </nav>
    );
  }