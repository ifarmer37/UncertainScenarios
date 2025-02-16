import { Question } from '../../types';
import { relationshipQuestions } from './relationships';
import { workQuestions } from './work';
import { childhoodQuestions } from './childhood';
import { travelQuestions } from './travel';
import { healthQuestions } from './health';

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