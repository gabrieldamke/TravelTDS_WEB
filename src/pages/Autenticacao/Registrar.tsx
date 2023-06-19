import React from 'react';

const Registrar = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Registrar</h2>
      <form className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Nome Completo"
          className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-4 w-64"
        />
        <input
          type="email"
          placeholder="Email"
          className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-4 w-64"
        />
        <input
          type="password"
          placeholder="Senha"
          className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-4 w-64"
        />
        <input
          type="password"
          placeholder="Confimar senha"
          className="rounded-lg border-2 border-gray-300 px-4 py-2 mb-4 w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Registrar;