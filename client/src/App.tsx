import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CampingLanding from "@/pages/camping-landing";
import ToolsLanding from "@/pages/tools-landing";

function Router() {
  return (
    <Switch>
        <Route path="/" component={Home} />
        <Route path="/alquiler-cosas-camping" component={CampingLanding} />
        <Route path="/alquiler-cosas-herramientas" component={ToolsLanding} />
        <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
