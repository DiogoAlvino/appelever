import React from 'react';
import PrimaryList from '~/components/lists/primaryList';
import QuestionsList from '~/components/lists/questionsList';
import { questions } from '~/data/questions';
import { UploadWithMeta } from '~/models/uploadModel';

interface InspectionSectionProps {
  respostas: { [id: string]: 'sim' | 'nao' | 'na' | null };
  onResponder: (id: string, value: 'sim' | 'nao' | 'na' | null) => void;
  onUploadImage: (questionId: string, uploads: UploadWithMeta[]) => void;
  onRemoveImage: (questionId: string, uri: string) => void;
  imagens: { [questionId: string]: UploadWithMeta[] };
}

export default function InspectionSection({
  respostas,
  onResponder,
  onUploadImage,
  onRemoveImage,
  imagens,
}: InspectionSectionProps) {
  return (
    <>
      {questions.map((section, index) => {
        if (!section.questions || section.questions.length === 0) return null;

        const numero = index + 1;
        const listaComIds = section.questions.map((q) => ({
          ...q,
          id: `${section.id}.${q.id}`,
        }));

        const respondido = listaComIds.some((q) => respostas[q.id]);

        return (
          <PrimaryList
            key={section.id}
            title={`${numero}. ${section.name}`}
            helperEnabled
            helperTitle={`${numero}. ${section.name}`}
            helperDescription={`Descrição do item ${section.name}`}
            respondido={respondido}
          >
            <QuestionsList
              questoes={listaComIds}
              respostas={respostas}
              onResponder={onResponder}
              onUploadImage={onUploadImage}
              onRemoveImage={onRemoveImage}
              imagens={imagens}
            />
          </PrimaryList>
        );
      })}
    </>
  );
}