import React from 'react';
import { createBoard } from '@wixc3/react-board';
import SocialsPage from '../../../../pages/socials';

export default createBoard({
    name: 'SocialsPage',
    Board: () => <SocialsPage />
});
