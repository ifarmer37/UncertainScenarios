import { Question } from '../types';
import { travelQuestions } from './questions/travel';
import { workQuestions } from './questions/work';
import { relationshipQuestions } from './questions/relationships';
import { childhoodQuestions } from './questions/childhood';
import { healthQuestions } from './questions/health';

// Map category IDs to their respective questions
const questionsByCategory: Record<string, Question[]> = {
  health: healthQuestions,
  travel: travelQuestions,
  childhood: childhoodQuestions,
  work: workQuestions,
  relationships: relationshipQuestions
};

export const defaultQuestions = Object.values(questionsByCategory).flat();

export function getQuestionsForCategory(categoryId: string): Question[] {
  return questionsByCategory[categoryId] || [];
}