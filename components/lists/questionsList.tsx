import React from 'react';
import PrimaryQuestion from '../questions/primaryQuestion';

interface questionsListProps {
    questoes: { id: string; description: string }[];
    respostas: { [id: string]: 'sim' | 'nao' | 'na' | null };
    onResponder: (id: string, value: 'sim' | 'nao' | 'na') => void;
}

export default function questionsList({ questoes, respostas, onResponder }: questionsListProps) {
    return (
        <>
            {questoes.map((q) => (
                <PrimaryQuestion
                    key={q.id}
                    title={`Item ${q.id}`}
                    description={q.description}
                    selectedOption={respostas[q.id] || null}
                    onSelect={(value) => onResponder(q.id, value)}
                />
            ))}
        </>
    );
}
