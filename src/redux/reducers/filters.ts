import { AnyAction } from "redux";
import {
    SAVE_FILTERS,
    SAVE_PAGINATION,
} from '../actions/filters';

type State = {
    query?: string,
    ownerName?: string,
    language?: string,

    perPage?: number,
    page?: number,
}

const initialState: State = {
    query: '',
    ownerName: '',
    language: '',

    perPage: 5,
    page: 1,
};

export default function reducer(state = initialState, action: AnyAction) {
    switch(action.type) {
        case SAVE_FILTERS:
            return {
                query: action.payload.query,
                ownerName: action.payload.ownerName,
                language: action.payload.language,
                perPage: state.perPage,
                page: 1,
            }
        case SAVE_PAGINATION:
            return {
                ...state,
                perPage: action.payload.perPage,
                page: action.payload.page,
            }
        default:
            return state;
    }
}
