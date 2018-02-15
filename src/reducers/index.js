import { combineReducers } from 'redux';
// import  RegisterReducer from './registerReducer';
import NotesReducer from './notesReducer';
import AuthReducer from './authReducer';
import ProjectsReducer from './projectsReducer';

const rootReducer = combineReducers({
  // register: RegisterReducer,
  notes: NotesReducer,
  authenticated: AuthReducer,
  projects: ProjectsReducer
});

export default rootReducer;
