import { store, persistor } from "../store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import SessionManager from "../features/auth/SessionManager";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionManager />
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
