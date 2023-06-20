import { Outlet, Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-blue-900">
    <div className="container mx-auto py-4 flex justify-between items-center">
      <div>
        <img
          src={require('../resources/logobranco.png')} // Substitua pelo caminho da sua imagem fictícia
          alt="Logo da Empresa"
          className="h-16"
        />
      </div>
      <ul className="flex space-x-4 text-white justify-center font-sans">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/explorar" className="hover:text-gray-300">
            Explorar
          </Link>
        </li>
        <li>
          <Link to="/viagens" className="hover:text-gray-300">
            Minhas Viagens
          </Link>
        </li>
        <li>
          <Link to="/contato" className="hover:text-gray-300">
            Perfil
          </Link>
        </li>
      </ul>
      <div>
        <button className="text-white">Logar</button>
        <button className="text-white ml-4">Registrar</button>
      </div>
    </div>
  </nav>
  );
};
export default Header;
