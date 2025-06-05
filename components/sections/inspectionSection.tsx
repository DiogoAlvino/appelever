import React from 'react';
import PrimaryList from '~/components/lists/primaryList';
import QuestionsList from '~/components/lists/questionsList';
import { questions } from '~/data/questions';

interface InspectionSectionProps {
  respostas: { [id: string]: 'sim' | 'nao' | 'na' | null };
  onResponder: (id: string, value: 'sim' | 'nao' | 'na' | null) => void;
}

const TITULOS: { [key: string]: string } = {
  quadro_de_comando: 'Quadro de Comando',
  maquina_de_tracao: 'Máquina de Tração',
  motor_eletrico: 'Motor Elétrico',
  freios: 'Freios',
  cabina: 'Cabina',
  polia_de_tracao: 'Polia de Tração',
  aparelho_seletorsensor: 'Aparelho Seletor/Sensor',
  limitador_de_velocidade: 'Limitador de Velocidade',
  polia_de_desvio: 'Polia de Desvio',
  fita_seletora: 'Fita Seletora',
  cabo_de_aco_de_tracao: 'Cabo de Aço de Tração',
  cabo_de_aco_do_limitadorregulador: 'Cabo do Limitador/Regulador',
};

export default function InspectionSection({ respostas, onResponder }: InspectionSectionProps) {
  return (
    <>
      {Object.entries(questions).map(([key, lista], index) => {
        if (!lista || lista.length === 0) return null;

        const numero = index + 1;
        const titulo = TITULOS[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        const listaComIds = lista.map((q) => ({ ...q, id: `${key}_${q.id}` }));

        const respondido = listaComIds.some((q) => respostas[q.id]);

        return (
          <PrimaryList
            key={key}
            title={`${numero}. ${titulo}`}
            helperEnabled
            helperTitle={`${numero}. ${titulo}`}
            helperDescription={`Descrição do item ${titulo}`}
            respondido={respondido} 
          >
            <QuestionsList
              questoes={listaComIds}
              respostas={respostas}
              onResponder={onResponder}
            />
          </PrimaryList>
        );
      })}
    </>
  );
}
