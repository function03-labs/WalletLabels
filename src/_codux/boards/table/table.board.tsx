import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { Table } from '../../../../components/ui/table';

export default createBoard({
    name: 'Table',
    Board: () => <Table />
});
