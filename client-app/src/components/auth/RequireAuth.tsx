import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  children: ReactNode;
}

export default function RequireAuth({ children }: Props) {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate({ to: "/login" });
    }
  }, [loading, isLoggedIn, navigate]);

  if (loading || !isLoggedIn) {
    return <></>;
  }

  return <>{children}</>;
}
