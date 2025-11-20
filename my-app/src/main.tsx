import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import {BrowserRouter} from "react-router-dom";
import {Provider} from "./components/ui/provider.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider defaultTheme="light">
				<AuthProvider>
					<App />
				</AuthProvider>
			</Provider>
		</BrowserRouter>
	</StrictMode>,
);
