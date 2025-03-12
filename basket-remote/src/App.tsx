import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BasketList from "./components/BasketList";
import { Provider } from "react-redux";
import store from "host/store";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <h1>Hello, World!</h1>
          <BasketList />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
