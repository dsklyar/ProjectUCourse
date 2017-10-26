import { UserQuestion } from '../models/userQuestion.model';
export class QuestionService {
    private userQuestions : UserQuestion[] = [
        { title: 'STuff', question: 'WHy do I hate this keyvboard?', answer: 'reasons' },
        { title: 'STuff', question: 'WHy do I hate this keyvboard?', answer: 'reasons' },
        { title: 'STuff', question: 'WHy do I hate this keyvboard?', answer: 'reasons' },
        { title: 'STuff', question: 'WHy do I hate this keyvboard?', answer: 'reasons' },
    ];

    getQuestions(){
        return this.userQuestions;
    }
}