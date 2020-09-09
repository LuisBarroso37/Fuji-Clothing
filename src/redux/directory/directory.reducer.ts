import { Reducer } from 'redux';

import SECTIONS from './Directory.data';

interface ISections {
  title: string;
  imageUrl: string;
  id: number;
  size?: string;
  linkUrl: string;
}

export interface IDirectoryState {
  sections: Array<ISections>;
}

interface IDirectoryAction {
  type: string;
}

const INITIAL_STATE: IDirectoryState = {
  sections: SECTIONS,
};

const directoryReducer: Reducer<IDirectoryState, IDirectoryAction> = (
  state = INITIAL_STATE,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default directoryReducer;
