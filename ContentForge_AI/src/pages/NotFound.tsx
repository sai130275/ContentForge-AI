import { memo, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const NotFound = memo(() => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center max-w-md space-y-6">
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default" className="gap-2">
            <Link to="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2" onClick={() => window.history.back()}>
            <button>
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          {APP_NAME} • {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
});

NotFound.displayName = "NotFound";

export default NotFound;
