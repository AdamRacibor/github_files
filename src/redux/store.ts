import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { mainReducer } from './reducers/index';

const getLocalFilters = () => {
    const filters = localStorage.getItem("github_files_filters");

    if (filters === null) {
        return {};
    }

    return JSON.parse(filters);
};

export const store = createStore(mainReducer, getLocalFilters(), composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
    const state = store.getState();
    const filters = {
        filters: {
            query: state.filters.query,
            ownerName: state.filters.ownerName,
            language: state.filters.language,

            perPage: 5,
            page: 1,
        }
    };
    const serializedState = JSON.stringify(filters);
    localStorage.setItem("github_files_filters", serializedState);
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;