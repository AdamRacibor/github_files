import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

export const IS_FETCHING = 'files/isFetching';
export const IS_ERROR = 'files/isError';
export const SAVE_FILES = 'files/fetchFiles';
export const SAVE_TOTAL_COUNT = 'files/saveTotalCount';

type RequestType = {
    query: string,
    ownerName: string,
    language?: string,

    perPage: number,
    page: number,
}

type Owner = {
    login: string,
    avatar_url: string,
}

type Repository = {
    description: string | null,
    owner: Owner,
}

type FileData = {
    name: string,
    html_url: string,
    repository: Repository,
}

export type RowType = {
    name?: string,
    fileUrl?: string,
    description?: string,
    owner?: string,
    ownerImg?: string,
}

export const startFetchingFiles = (): AnyAction => {
    return {
        type: IS_FETCHING,
        payload: {
            isFetching: true,
        }
    }
};

export const saveFiles = (rows: Array<RowType>): AnyAction => {
    return {
        type: SAVE_FILES,
        payload: rows,
    }
};

export const saveTotalCount = (totalCount: number): AnyAction => {
    return {
        type: SAVE_TOTAL_COUNT,
        payload: {
            totalCount,
        },
    }
}

const isError = (errorMsg: string): AnyAction => {
    return {
        type: IS_ERROR,
        payload: {
            errorMsg,
        }
    }
}

export const fetchFiles = (request: RequestType): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    dispatch(startFetchingFiles());

    const {
        query,
        ownerName,
        language,
        perPage,
        page,
    } = request;

    const languageParam = language ? `+language:${language}` : '';
    await fetch(`https://api.github.com/search/code?q=${query}+user:${ownerName}${languageParam}&per_page=${perPage}&page=${page}`)
        .then(reply => reply.json())
        .then((response) => {
            dispatch(saveTotalCount(response.total_count))
            const rows = response.items.map((item: FileData) => {
                return {
                    name: item.name,
                    description: item.repository.description,
                    owner: item.repository.owner.login,
                    ownerImg: item.repository.owner.avatar_url,
                    fileUrl: item.html_url,
                }
            });
            dispatch(saveFiles(rows));
        })
        .catch(() => {
            dispatch(isError('Przekroczono limit zapytań do API. Spróbuj ponownie później.'))
        });

}
