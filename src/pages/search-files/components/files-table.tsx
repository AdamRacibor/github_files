import React, { useState } from 'react';
import styled from 'styled-components';
import uniqid from 'uniqid';

import { withStyles, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Link';
import Modal from '@material-ui/core/Modal';

import LinkIcon from '@material-ui/icons/Link';
import PersonIcon from '@material-ui/icons/Person';

type File = {
    name?: string,
    fileUrl?: string,
    description?: string,
    owner?: string,
    ownerImg?: string,
}

type Props = {
    columns: Array<string>,
    rows: Array<File>,
    page: number,
    perPage: number,
    totalCount: number,
    isFetching: boolean,
    onChangePage: (event: unknown, newPage: number) => void,
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const ModalWrapper = styled.div`
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledTableCell = withStyles(() =>
    createStyles({
        head: {
            backgroundColor: '#1976D2',
            color: '#FFFFFF',
        },
    }),
)(TableCell);

const StyledTableCellWithBtn = withStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
        },
    }),
)(TableCell);

const StyledTableRow = withStyles(() =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
         },
    }),
)(TableRow);


const FileTable: React.FC<Props> = (props) => {
    const [ownerAvatar, setOwnerAvatar] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const getTableHeaders = (): React.ReactNodeArray => {
        return props.columns.map(name => (
            <StyledTableCell key={name}>{name}</StyledTableCell> 
        ));
    };

    const openModal = (avatarSrc: string): void => {
        setOwnerAvatar(avatarSrc);
        setIsOpen(true);
    };

    const closeModal = (): void => {
        setOwnerAvatar('');
        setIsOpen(false);
    };

    const getTableBody = (): React.ReactNodeArray | React.ReactNode => {
        if (props.rows.length === 0) {
            return (
                <TableRow key={uniqid()}>
                    <td>Brak Danych</td>
                </TableRow>
            )
        }

        return props.rows.map(row => (
            <StyledTableRow key={uniqid()}>
                <StyledTableCellWithBtn>
                    {row.name}
                    <Link href={row.fileUrl} target="_blank" style={{ marginLeft: '5px', paddingTop: '5px' }}>
                        <LinkIcon />
                    </Link>
                </StyledTableCellWithBtn>
                <TableCell>{row.description}</TableCell>
                <StyledTableCellWithBtn>
                    {row.owner}
                    <Button style={{ marginLeft: '5px', paddingTop: '5px' }} onClick={() => openModal(row.ownerImg || '')}>
                        <PersonIcon />
                    </Button>
                </StyledTableCellWithBtn>
            </StyledTableRow>
        ));
    };

    const allPages = props.totalCount % props.perPage ? Math.floor(props.totalCount / props.perPage) + 1 : Math.ceil(props.totalCount / props.perPage);

    return (
        <TableContainer component={Paper}>
            <Table style={{ position: 'relative' }}>
                <TableHead>
                    <TableRow>
                        {getTableHeaders()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getTableBody()}
                </TableBody>
            </Table>
            {props.rows.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={props.totalCount || 0}
                    rowsPerPage={props.perPage}
                    page={props.page - 1}
                    onChangePage={props.onChangePage}
                    onChangeRowsPerPage={props.onChangeRowsPerPage}
                    labelRowsPerPage="Ilość rekordów na stronie: "
                    labelDisplayedRows={() => `${props.page} / ${allPages}`}
                />
            )}
            <Modal
                open={isOpen}
            >
                <ModalWrapper onClick={closeModal}>
                    <img src={ownerAvatar} alt="Avatar właściciela repozytorium" />
                </ModalWrapper>
            </Modal>
        </TableContainer>
    );
};

export default FileTable;
