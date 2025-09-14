// API service for backend communication

const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // File Upload
    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        return this.request('/upload', {
            method: 'POST',
            headers: {}, // Remove Content-Type to let browser set it for FormData
            body: formData,
        });
    }

    async getUploadStatus(fileId) {
        return this.request(`/upload/${fileId}/status`);
    }

    async getUserDocuments() {
        return this.request('/documents');
    }

    // Quiz Generation
    async generateQuiz(documentId, settings) {
        return this.request('/generate-quiz', {
            method: 'POST',
            body: JSON.stringify({
                documentId,
                questionCount: settings.questionCount,
                difficulty: settings.difficulty,
                questionTypes: settings.questionTypes,
                title: settings.title,
            }),
        });
    }

    async getQuizStatus(quizId) {
        return this.request(`/quiz/${quizId}/status`);
    }

    async getQuiz(quizId) {
        return this.request(`/quiz/${quizId}`);
    }

    async getUserQuizzes() {
        return this.request('/quizzes');
    }

    // Quiz Interaction
    async startQuizSession(quizId) {
        return this.request(`/quiz/${quizId}/start`, {
            method: 'POST',
        });
    }

    async submitAnswer(quizId, answerData) {
        return this.request(`/quiz/${quizId}/answer`, {
            method: 'POST',
            body: JSON.stringify(answerData),
        });
    }

    async getNextQuestion(quizId, sessionId) {
        return this.request(`/quiz/${quizId}/next?sessionId=${sessionId}`);
    }

    async completeQuiz(quizId, sessionId) {
        return this.request(`/quiz/${quizId}/complete`, {
            method: 'POST',
            body: JSON.stringify({ sessionId }),
        });
    }

    // Special Features
    async simplifyExplanation(explanation) {
        return this.request('/eli5', {
            method: 'POST',
            body: JSON.stringify({ explanation }),
        });
    }

    async generateStudyGuide(sessionId) {
        return this.request('/export-study-guide', {
            method: 'POST',
            body: JSON.stringify({ sessionId }),
        });
    }

    // Analytics
    async getPerformanceAnalytics() {
        return this.request('/analytics/performance');
    }

    async getPerformanceTrends(days = 30) {
        return this.request(`/analytics/trends?days=${days}`);
    }

    async getTopicAnalytics() {
        return this.request('/analytics/topics');
    }

    async getDifficultyAnalytics() {
        return this.request('/analytics/difficulty');
    }
}

export default new ApiService();