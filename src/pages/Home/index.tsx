import React from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

export default function LandingPage() {
  return (
    <div>
      <Header />
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto">
          <h1 className="text-4xl text-blue-900 font-bold mb-8">
            Planeje suas viagens com facilidade!
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            Descubra destinos incríveis, crie itinerários personalizados e tenha
            uma estimativa dos seus gastos.
          </p>
          <Link
            to="/logar"
            className="bg-blue-900 text-white py-3 px-6 rounded-md hover:bg-blue-800 transition duration-200"
          >
            Comece agora!
          </Link>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl text-blue-900 font-bold mb-8">
            Recursos incríveis para facilitar sua viagem:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-md p-6 shadow-lg">
              <h3 className="text-xl text-blue-900 font-bold mb-4">
                Planejamento simplificado
              </h3>
              <p className="text-gray-700">
                Crie itinerários detalhados, adicione pontos de interesse,
                visualize mapas interativos e gerencie suas reservas em um só
                lugar.
              </p>
            </div>
            <div className="bg-white rounded-md p-6 shadow-lg">
              <h3 className="text-xl text-blue-900 font-bold mb-4">
                Inspiração ilimitada
              </h3>
              <p className="text-gray-700">
                Explore uma ampla variedade de destinos, descubra hotéis,
                restaurantes e atrações turísticas no local de destino.
              </p>
            </div>
            <div className="bg-white rounded-md p-6 shadow-lg">
              <h3 className="text-xl text-blue-900 font-bold mb-4">
                Calculadora de gastos
              </h3>
              <p className="text-gray-700">Ao planejar sua viagem, tenha em tempo real uma estimativa dos gastos da sua viagem.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue-900 py-20">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h2 className="text-4xl text-white font-bold mb-8">
            Comece a planejar suas viagens hoje mesmo!
          </h2>
          <p className="text-white text-lg mb-8">
            Junte-se a milhões de viajantes em nossa plataforma e descubra
            experiências incríveis ao redor do mundo.
          </p>
          <Link
            to="/registrar"
            className="bg-white text-blue-900 py-3 px-8 rounded-md hover:bg-blue-100 transition duration-200"
          >
            Crie uma conta
          </Link>
        </div>
      </section>
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="w-1/2">
            <img
              src={require("../../resources/landingPage1.png")}
              alt="Imagem 1"
              className="w-full rounded-lg"
            />
          </div>
          <div className="w-1/2">
            <div className="p-8 bg-white rounded-lg shadow-lg">
              <h2 className="text-3xl text-blue-900 font-bold mb-8">
                Descubra novos horizontes
              </h2>
              <p className="text-gray-700">
                Viaje para lugares exóticos, mergulhe em diferentes culturas e
                crie memórias que durarão para sempre. Nosso aplicativo torna
                isso tudo possível.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="w-1/2">
            <div className="p-8 bg-white rounded-lg shadow-lg">
              <h2 className="text-3xl text-blue-900 font-bold mb-8">
                Aventure-se pelo mundo
              </h2>
              <p className="text-gray-700">
                Explore as montanhas mais altas, as praias mais paradisíacas e
                as cidades mais vibrantes. Com nosso aplicativo, você pode
                planejar e vivenciar aventuras inesquecíveis.
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src={require("../../resources/landingPage2.png")}
              alt="Imagem 2"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </section>
      <section className="bg-blue-900 py-20">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <h2 className="text-4xl text-white font-bold mb-8">
          Comece a explorar novos destinos agora mesmo!
          </h2>
          <Link
            to="/registrar"
            className="bg-white text-blue-900 py-3 px-8 rounded-md hover:bg-blue-100 transition duration-200"
          >
            Crie uma conta
          </Link>
        </div>
      </section>
      <div>
        <Footer />
      </div>
    </div>
  );
}
