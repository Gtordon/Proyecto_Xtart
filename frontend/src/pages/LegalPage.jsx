// Aviso legal, privacidad y cookies. Describe lo que la web hace de verdad con los datos.
import { useEffect } from 'react';
import { useLocation } from 'react-router';

function LegalPage() {
  const { hash } = useLocation();

  // Los enlaces del pie llevan a /legal#privacidad, etc.: se baja hasta ese apartado
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <div className="pagina pagina--texto">
      <header className="cabecera">
        <div>
          <h1 className="cabecera__titulo">Aviso legal y privacidad</h1>
          <p className="cabecera__sub">Proyecto académico de 2.º DAW. Las empresas y los datos son de ejemplo.</p>
        </div>
      </header>

      <section id="aviso-legal" className="tarjeta bloque">
        <h2 className="seccion__titulo">Aviso legal</h2>
        <p className="bloque__texto">
          SABITECH WEB es la web de reservas de las jornadas tecnológicas SABITECH. La desarrolla Umbral Labs SL,
          empresa ficticia creada para el Proyecto Intermodular de 2.º de DAW (XTART, curso 2026-2027).
        </p>
      </section>

      <section id="privacidad" className="tarjeta bloque">
        <h2 className="seccion__titulo">Privacidad</h2>
        <p className="bloque__texto">La web solo guarda los datos necesarios para gestionar las reservas:</p>
        <ul className="lista-texto">
          <li>Nombre y correo, para identificar a cada persona.</li>
          <li>La contraseña, siempre cifrada.</li>
          <li>El token de la sesión: solo se guarda su huella (hash) y caduca a las 8 horas.</li>
          <li>Las reservas de cada persona, que solo puede ver ella misma.</li>
        </ul>
        <p className="bloque__texto">Las cuentas las crea la organización y en las pruebas solo se usan datos inventados.</p>
      </section>

      <section id="cookies" className="tarjeta bloque">
        <h2 className="seccion__titulo">Cookies</h2>
        <p className="bloque__texto">
          La web no usa cookies de seguimiento ni de publicidad. Para mantener la sesión iniciada guarda el token en
          el almacenamiento del navegador, y se borra al pulsar «Salir».
        </p>
      </section>
    </div>
  );
}

export default LegalPage;
