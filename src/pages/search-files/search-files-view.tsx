import React from 'react';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux'
import { bindActionCreators } from 'redux';

import { AppDispatch, RootState } from '../../redux/store';
import { saveFilters, savePagination } from '../../redux/actions/filters';
import { fetchFiles } from '../../redux/actions/files';

import Layout from '../../components/layout';
import Input from '../../components/input';
import Dropdown from '../../components/dropdown';
import SubmitButton from '../../components/submit-button';
import FileTable from './components/files-table';
import FormHelperText from '@material-ui/core/FormHelperText';

type ValidationErros = {
    query?: string,
    ownerName?: string,
}

type StateProps = {
    query: string,
    ownerName: string,
    language: string,
    error: ValidationErros,
}

type File = {
    name?: string,
    fileUrl?: string,
    description?: string,
    owner?: string,
    ownerImg?: string,
}

type PropsFromState = {
    query: string,
    ownerName: string,
    language: string,
    perPage: number,
    page: number,

    rows: Array<File>,
    isFetching: boolean,
    errorMsg: string,
    totalCount: number,
}

type RowsRequest = {
    query: string,
    ownerName: string,
    language?: string,
    perPage: number,
    page: number,
}

const mapState = (state: RootState): PropsFromState  => {
    return {
        query: state.filters.query,
        ownerName: state.filters.ownerName,
        language: state.filters.language,

        perPage: state.filters.perPage,
        page: state.filters.page,

        rows: state.files.rows,
        isFetching: state.files.isFetching,
        errorMsg: state.files.errorMsg,
        totalCount: state.files.totalCount,
    };
};

const mapDispatch = (dispatch: AppDispatch) => {
    return bindActionCreators({
        saveFilters,
        savePagination,
        fetchFiles,
    }, dispatch);
}

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Form = styled.form`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 30px 30px 50px 30px;

    button {
        margin-top: 20px;
    }
`;

class SearchFilesView extends React.Component<Props, StateProps>  {
    constructor(props: Props) {
        super(props);
        this.state = {
            query: props.query || '',
            ownerName: props.ownerName || '',
            language: props.language || '',
            error: {
                query: '',
                ownerName: '',
            }
        };
    }

    readonly tableColumns = ['Nazwa pliku', 'Opis repozytorium', 'Właściciel repozytorium'];

    fetchRows = (request: RowsRequest): void => {
        this.props.fetchFiles(request);
    };

    hasAllRequiredField = (requiredFields: ValidationErros): boolean => {
        let error = {
            query: '',
            ownerName: '',
        };
        let isValid = true;

        Object.entries(requiredFields).forEach(([key, value]) => {
            if (!value) {
                isValid = false;
            }
            error = {
                ...error,
                [key]: !value ? 'Pole jest wymagane' : '',
            }
        })

        this.setState({ error });
        return isValid;
    }

    handleFieldChange = (value: string, name: string): void => {
        this.setState({ [name]: value } as any);
    }

    hadnleClick = (): void => {
        const { query, ownerName, language} = this.state;
        if (this.hasAllRequiredField ({ query, ownerName })) {
            const payload = { query, ownerName, language };

            this.props.saveFilters(payload);
            this.fetchRows({
                ...payload,
                perPage: this.props.perPage,
                page: 1,
            });
        }
    }

    handleChangePage = (event: unknown, newPage: number): void => {
        this.props.savePagination({
            perPage: this.props.perPage,
            page: newPage + 1,
        });
        this.fetchRows({
            query: this.props.query,
            ownerName: this.props.ownerName,
            language: this.props.language,
            perPage: this.props.perPage,
            page: newPage + 1,
        });
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.savePagination({
            perPage: parseInt(event.target.value),
            page: 1,
        });
        this.fetchRows({
            query: this.props.query,
            ownerName: this.props.ownerName,
            language: this.props.language,
            perPage: parseInt(event.target.value),
            page: 1,
        });
    };

    render() {
        return (
            <Layout>
                <Form>
                    <Input
                        label="Fraza"
                        type="text"
                        name="query"
                        value={this.state.query}
                        error={this.state.error && this.state.error.query}
                        onChange={this.handleFieldChange}
                        required
                    />
                    <Input
                        label="Nazwa użytkownika"
                        type="text"
                        name="ownerName"
                        value={this.state.ownerName}
                        error={this.state.error && this.state.error.ownerName}
                        onChange={this.handleFieldChange}
                        required
                    />
                    <Dropdown
                        label="Język"
                        name="language"
                        items={[
                            {label: 'Go', value: 'go'},
                            {label: 'Java', value: 'java'},
                            {label: 'JavaScript', value: 'javascript'},
                        ]}
                        value={this.state.language}
                        onChange={this.handleFieldChange}
                    />
                    <SubmitButton
                        text="Szukaj"
                        onClick={this.hadnleClick}
                    />
                </Form>
                {this.props.errorMsg && (
                    <FormHelperText error>{this.props.errorMsg}</FormHelperText>
                )}
                <FileTable
                    columns={this.tableColumns}
                    rows={this.props.rows}
                    perPage={this.props.perPage}
                    page={this.props.page}
                    totalCount={this.props.totalCount}
                    isFetching={this.props.isFetching}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Layout>
        );
    }
}

export default connector(SearchFilesView);
