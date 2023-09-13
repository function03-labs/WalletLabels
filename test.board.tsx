import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { RadioGroupItem } from './components/ui/radio-group';

export default createBoard({
    name: 'test',
    Board: () => <RadioGroupItem />
});
