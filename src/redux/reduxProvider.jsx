import { store, persistor } from './store.mjs';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";

export function ReduxProviders({ children }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}