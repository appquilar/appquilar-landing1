import {Route, Switch} from "wouter";
import {queryClient} from "./lib/queryClient";
import {QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CampingLanding from "@/pages/camping-landing";
import ToolsLanding from "@/pages/tools-landing";
import {generateRoutesByProvince} from '@/utils/provinceRoutes';

const campingRoutes = generateRoutesByProvince('alquiler-cosas-camping');
const toolsRoutes = generateRoutesByProvince('alquiler-herramientas');

function Router() {
    return (
        <Switch>
            <Route path="/" component={Home} />
            {/* Rutas de camping */}
            {campingRoutes.map(({ path, province }) => (
                <Route
                    key={path}
                    path={path}
                    component={() => <CampingLanding province={province} />}
                />
            ))}
            {/*Rutas herramientas */}
            {toolsRoutes.map(({ path, province }) => (
                <Route
                    key={path}
                    path={path}
                    component={() => <ToolsLanding province={province} />}
                />
            ))}
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
