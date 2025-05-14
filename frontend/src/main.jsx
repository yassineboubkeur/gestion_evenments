import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LikesProvider } from "./context/LikesContext.jsx";
import { StyleProvider } from "./context/StyleContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { RefreshProvider } from "./context/RefreshContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
// import { NotificationProvider } from "./context/NotificationContext.jsx";
// import NotificationToast from "./components/NotificationToast.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RefreshProvider>
        <NotificationProvider>
            <AuthProvider>
                <StyleProvider>
                    <LikesProvider>
                        <App />

                    </LikesProvider>
                </StyleProvider>
            </AuthProvider>
            </NotificationProvider>
        </RefreshProvider>
      

    </StrictMode>
);
