import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from '@mui/material';
import { IssueTokenVM } from '../model/IssueTokenVM';
import './IssueToken.scss';

interface IssueTokenProps {
  viewModel: IssueTokenVM;
}

export const IssueToken: React.FC<IssueTokenProps> = observer(({ viewModel }) => {
  return (
    <Button
      variant="contained"
      color={viewModel.isIssued ? 'default' : 'success'}
      onClick={() => viewModel.issueCSBT()}
      disabled={viewModel.isLoading || viewModel.isIssued}
      className="issue-token-button"
    >
      {viewModel.isLoading
        ? 'Выдача токена...'
        : viewModel.isIssued
        ? `✓ Токен выдан`
        : `Выдать cSBT`}
    </Button>
  );
});

