import { createStore } from 'vuex';

interface State {
    questionProcess: number;
    startQuiz: boolean;
}

const store = createStore<State>({
    state: {
        questionProcess: 0,
        startQuiz: false
    },
    mutations: {
        SET_questionProcess(state, payload) {
            state.questionProcess = payload
        },
        SET_startQuiz(state, payload) {
            state.startQuiz = payload
        },
    },
    actions: {
        setQuestionProcess({ commit }, payload) {
            commit('SET_questionProcess', payload)
        },
        setStartQuiz({ commit }, payload) {
            commit('SET_startQuiz', payload)
        },
    },
});


export default store;