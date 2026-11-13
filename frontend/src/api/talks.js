import { Navigate } from 'react-router';

// Mis reservas: solo con sesión iniciada. Sin sesión, lleva al login.
// Falta la ruta del backend que devuelve las reservas del usuario (GET /api/reservations).
function MyReservationsPage({ token }) {
  if (!token) return <Navigate to="/login" replace />;

  return (
    <main>
      <h1>Mis reservas</h1>
      <p>Pendiente: el backend aún no tiene la ruta que devuelve las reservas del usuario.</p>
    </main>
  );
}

export default MyReservationsPage;
