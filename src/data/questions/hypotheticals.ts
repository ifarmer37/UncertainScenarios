import { Question } from '../../types';

export const hypotheticalQuestions: Question[] = [
  {
    id: 'hyp-1',
    text: 'How likely is it that you could survive in a zombie apocalypse?',
    category: 'hypotheticals',
    leastDescription: 'First one gone',
    mostDescription: 'Humanity\'s last hope'
  },
  {
    id: 'hyp-2',
    text: 'How well would you handle being president for a day?',
    category: 'hypotheticals',
    leastDescription: 'Total disaster',
    mostDescription: 'Revolutionary leader'
  },
  {
    id: 'hyp-3',
    text: 'How likely is it that you\'d thrive living on Mars?',
    category: 'hypotheticals',
    leastDescription: 'Immediate return',
    mostDescription: 'Mars president'
  }
];