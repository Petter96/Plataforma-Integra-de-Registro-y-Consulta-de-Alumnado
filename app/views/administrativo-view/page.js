'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('currentUser');
    if (!stored) {
      router.push('/'); // Si no hay sesión, regresa al login
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.role !== 'admin') {
      router.push('/'); // Si el rol no coincide, regresa al login
      return;
    }
    setUser(parsed);
  }, []);

  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <p>Bienvenido, {user.username}</p>
      {/* Tu contenido de admin aquí */}
      <button onClick={() => { sessionStorage.clear(); router.push('/'); }}>
        Cerrar sesión
      </button>
    </div>
  );
}