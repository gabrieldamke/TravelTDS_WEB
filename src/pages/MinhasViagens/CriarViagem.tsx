import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { animated, useSpring, useTransition } from "react-spring";
import { Stepper, Step as FormStep } from "react-form-stepper";
import { StepStyleDTO } from "react-form-stepper/dist/components/Step/StepTypes";
import { render } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { GetAllDestinosAsync } from "../../store/Destino.store";
interface CriarViagemProps {}

interface Despesas {
  budget: number;
  destinations: string[];
}

enum Step {
  Budget = 1,
  Destinations = 2,
  Review = 3,
}

const CriarViagem: React.FC<CriarViagemProps> = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const stateDestinos = useSelector(
    (root: RootState) => root.destinoStore.destinos
  );

  const [step, setStep] = useState<Step>(Step.Budget);
  const [despesas, setDespesas] = useState<Despesas>({
    budget: 0,
    destinations: [],
  });
  const blueStepperStyle: StepStyleDTO = {
    activeBgColor: "#007bff",
    activeTextColor: "#fff",
    completedBgColor: "#28a745",
    completedTextColor: "#fff",
    inactiveBgColor: "#fff",
    inactiveTextColor: "#007bff",
    size: "32px",
    circleFontSize: "14px",
    labelFontSize: "14px",
    borderRadius: "50%",
    fontWeight: "bold",
  };
  const handleNextStep = () => {
    setIsTransitioning(true);
  };

  const SpringIn = ({ children }: any) => {
    const props = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      config: {
        mass: 4.7,
        tension: 170,
        friction: 120,
        precision: 0.3,
        velocity: 0,
      },
    });
    return <animated.div style={props}>{children}</animated.div>;
  };

  const handlePreviousStep = (): void => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const budget = Number(e.target.value);
    setDespesas((prevDespesas) => ({ ...prevDespesas, budget }));
  };

  const handleDestinationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedDestinations = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setDespesas((prevDespesas) => ({
      ...prevDespesas,
      destinations: selectedDestinations,
    }));
  };

  const handleConfirm = (): void => {
    // Lógica para confirmar a criação da viagem
    console.log("Viagem confirmada!");
  };

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      if (step === 2) {
        dispatch(GetAllDestinosAsync());
      }
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
        setIsTransitioning(false);
      }, 500); // Ajuste o valor do atraso conforme necessário (em milissegundos)

      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);
  const renderStepContent = (): JSX.Element | null => {
    switch (step) {
      case Step.Budget:
        return (
          <SpringIn>
            <div className="step-content flex flex-col items-center justify-center">
              <h2 className="text-gray-500 text-5xl text-center mb-8">
                Qual o seu orçamento?
              </h2>
              <div className="input-wrapper">
                <input
                  type="number"
                  value={despesas.budget}
                  onChange={handleBudgetChange}
                  className="bg-transparent border-b border-gray-300 text-5xl text-center text-gray-500 w-40 py-4 mt-2 focus:outline-none"
                  placeholder="Digite o valor desejado"
                />
                <div className="input-overlay" />
              </div>
              <button
                onClick={handleNextStep}
                className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full font-semibold shadow-lg "
              >
                Avançar
              </button>
            </div>
          </SpringIn>
        );
      case Step.Destinations:
        return (
          <SpringIn>
            <div className="step-content">
              <h2>Passo 2: Escolha os destinos</h2>
              <select
                multiple
                value={despesas.destinations}
                onChange={handleDestinationChange}
              >
                {stateDestinos.map((destino) => (
                  <option key={destino.id} value={destino.id}>
                    {destino.nome}
                  </option>
                ))}
              </select>
              {/* Elementos de seleção de atrações, hotéis e restaurantes */}
              {/* ... */}
              {/* Exibição do mapa com os pontos conectando os destinos */}
              {/* ... */}
              <button onClick={handlePreviousStep}>Voltar</button>
              <button onClick={handleNextStep}>Avançar</button>
            </div>
          </SpringIn>
        );
      case Step.Review:
        return (
          <SpringIn>
            <div className="step-content">
              <h2>Passo 3: Revisar e confirmar</h2>
              <p>Orçamento: {despesas.budget}</p>
              <p>Destinos selecionados: {despesas.destinations.join(", ")}</p>
              <button onClick={handlePreviousStep}>Voltar</button>
              <button onClick={handleConfirm}>Confirmar</button>
            </div>
          </SpringIn>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <Header />
      <Stepper
        activeStep={step - 1}
        className={`my-8 ${step === 1 ? "animate-stepper" : ""}`}
        styleConfig={blueStepperStyle}
      >
        <FormStep label="Orçamento" />
        <FormStep label="Destinos" />
        <FormStep label="Revisar e confirmar" />
      </Stepper>
      {step ? renderStepContent() : renderStepContent()}
    </div>
  );
};

export default CriarViagem;
