import { Link } from "react-router-dom";

export default function Logar() {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Travel YES</h2>
        <form className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Email"
            className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-4 w-64"
          />
          <input
            type="password"
            placeholder="Senha"
            className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-4 w-64"
          />
          <Link to="/">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Logar
            </button>
          </Link>
          <Link to="/registrar">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Registrar
          </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
