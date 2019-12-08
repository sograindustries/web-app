import * as React from 'react';
import { Action } from '../reducers/app';

interface Viewer {
    uuid: string;
    token: string;
}

type ViewerAction = Action<'set_viewer', Viewer>;

function viewer(state: Viewer | null = null, action: ViewerAction): Viewer | null {
    switch (action.type) {
        case 'set_viewer':
            return {
                ...action.payload,
            };
        default:
            return state;
    }
}

export const ViewerContext = React.createContext<{
    viewer: Viewer | null;
    setViewer: (viewer: Viewer) => void;
}>({ viewer: null, setViewer: () => {} });

export const ViewerProvider = ViewerContext.Provider;
export const ViewerConsumer = ViewerContext.Consumer;

export default function ViewerContextProvider(props: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(viewer, null);

    const setViewer = (viewer: Viewer) => {
        dispatch({ type: 'set_viewer', payload: viewer });
    };

    return <ViewerProvider value={{ viewer: state, setViewer }}>{props.children}</ViewerProvider>;
}
