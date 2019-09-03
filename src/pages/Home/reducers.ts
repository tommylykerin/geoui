import { HOME, PROJECT } from './constants';
import { Project } from '../../types/project';

const initialHomeState = {
    gettingProjects: false,
    gotProjects: false,
    gettingProjectsError: null,
    projects: <Project[]>{},
    creatinProject: false,
    createdProject: false,
    createProjectError: null, 

};

const reducer = (state = initialHomeState, action: any) => {
    switch (action.type) {
        case HOME.GET_PROJECTS:
            return {
                ...state,
                gettingProjects: true,
            };

        case HOME.GET_PROJECTS_SUCCESS:
            return {
                ...state,
                gettingProjects: false,
                gotProjects: true,
                projects: action.payload.projects
            };

        case HOME.GET_PROJECTS_ERROR:
            return {
                ...state,
                gettingProjects: false,
                gettingProjectsError: action.payload.error
            }
            
        default:
            return state
    }
};

export default reducer