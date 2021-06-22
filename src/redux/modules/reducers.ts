import { combineReducers } from 'redux';
import attendance from './attendance';
import attendances from './attendances';
import covid from './covid';
import covids from './covids';
import event from './event';
import events from './events';
import locations from './locations';
import part from './part';
import parts from './parts';
import plans from './plans';
import practice from './practice';
import program from './program';
import programs from './programs';
import remarks from './remarks';
import role from './role';
import roles from './roles';
import user from './user';
import modal from './modal';
import show from './show';
import sign from './sign';
import tab from './tab';

const rootReducer = combineReducers({
  domain: combineReducers({
    attendances,
    covids,
    events,
    parts,
    practice,
    programs,
    roles,
  }),
  app: combineReducers({
    attendance,
    covid,
    event,
    locations,
    part,
    plans,
    program,
    remarks,
    role,
    sign,
    user,
  }),
  ui: combineReducers({ modal, show, tab }),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
