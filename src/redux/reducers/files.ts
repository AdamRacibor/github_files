import { AnyAction } from 'redux';
import {
    SAVE_FILES,
    SAVE_TOTAL_COUNT,
    IS_FETCHING,
    IS_ERROR,
    RowType
} from '../actions/files';

type State = {
    rows: Array<RowType>,
    isFetching: boolean,
    totalCount: number,
    errorMsg: string,
}

const initialState = {
    rows: [],
    isFetching: false,
    totalCount: 0,

    errorMsg: '',
}

export default function reducer(state: State = initialState, action: AnyAction ) {
    switch(action.type) {
        case SAVE_FILES:
            return {
                ...state,
                rows: action.payload,
                isFetching: false,
            };
        case IS_FETCHING:
            return {
                ...state,
                errorMsg: '',
                isFetching: action.payload.isFetching,
            }
        case SAVE_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.payload.totalCount,
            }
        case IS_ERROR:
            return {
                rows: [],
                isFetching: false,
                totalCount: 0,
                errorMsg: action.payload.errorMsg,
            }
        default:
            return state;
    }
}