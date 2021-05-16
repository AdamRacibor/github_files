import { AnyAction } from "redux";

export const SAVE_FILTERS: string = 'filters/saveFilters';
export const SAVE_PAGINATION: string = 'filters/savePagination';

type FilterType = {
    query?: string,
    ownerName?: string,
    language?: string,
}

type PaginationType = {
    perPage: number,
    page: number,
}

export const saveFilters = (payload: FilterType): AnyAction => {
    return {
        type: SAVE_FILTERS,
        payload,
    }
};

export const savePagination = (payload: PaginationType): AnyAction => {
    return {
        type: SAVE_PAGINATION,
        payload,
    }
};
