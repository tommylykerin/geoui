import { HOME, PROJECT } from './constants'
import { Project } from '../../types/project'

export const getProjectsAction = (userId: string) => {
    return {
        type: HOME.GET_PROJECTS,
        payload: {
            userId,
        },
    }
}

export const getProjectsSuccessAction = (projects: Project[]) => {
    return {
        type: HOME.GET_PROJECTS_SUCCESS,
        payload: {
            projects,
        }
    }
}

export const getProjectsErrorAction = (error: any) => {
    return {
        type: HOME.GET_PROJECTS_ERROR,
        payload: {
            error,
        }
    }
}

export const createProjectAction = (title: string, description: string, image: any) => {
    return {
        type: PROJECT.CREATE_PROJECT,
        payload: {
            title,
            description,
            image,
        }
    }
}

export const createProjectSuccessAction = (project: Project) => {
    return {
        type: PROJECT.CREATE_PROJECT_SUCCESS,
        payload: {
            project,
        }
    }
}

export const createProjectErrorAction = (error: any) => {
    return {
        type: PROJECT.CREATE_PROJECT_ERROR,
        payload: {
            error,
        }
    }
}

export const deleteProjectAction = (id: string) => {
    return {
        type: PROJECT.DELETE_PROJECT,
        payload: {
            id,
        }
    }
}

export const deleteProjectSuccessAction = (project: Project) => {
    return {
        type: PROJECT.DELETE_PROJECT_SUCCESS,
        payload: {
            project,
        }
    }
}

export const deleteProjectErrorAction = (error: any) => {
    return {
        type: PROJECT.DELETE_PROJECT_ERROR,
        payload: {
            error,
        }
    }
}

export const projectsHydrateAction = () => {
    return {
        type: HOME.HYDRATE
    }
}
