import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/superbase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    console.log("Current URL:", window.location.href);
    console.log("Current pathname:", window.location.pathname);
    console.log("Current search:", window.location.search);
    console.log("Current hash:", window.location.hash);

    const initializeAuth = async () => {
      try {
        const storageKeys = Object.keys(localStorage).filter(
          (key) => key.includes("supabase") || key.includes("auth"),
        );
        console.log("Supabase-related localStorage keys:", storageKeys);
        storageKeys.forEach((key) => {
          const value = localStorage.getItem(key);
          console.log(
            `  ${key}:`,
            value ? "EXISTS (length: " + value.length + ")" : "NULL",
          );
        });

        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession();

        console.log("Session retrieved:", currentSession);

        if (error) {
          console.error("Get session error:", error);
          if (isMounted) {
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);

          if (currentSession?.user) {
            console.log("User authenticated:");
            console.log("  - User ID:", currentSession.user.id);
            console.log("  - Email:", currentSession.user.email);
            console.log(
              "  - Provider:",
              currentSession.user.app_metadata?.provider,
            );
            console.log(
              "  - User Metadata:",
              currentSession.user.user_metadata,
            );
          } else {
            console.log("No authenticated session found");
          }
        }
      } catch (error) {
        console.error("Authentication initialization error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
          console.log("Auth initialization complete");
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log("Event:", event);
      console.log("Session:", currentSession);

      if (currentSession?.user) {
        console.log("User Info:");
        console.log("  - User ID:", currentSession.user.id);
        console.log("  - Email:", currentSession.user.email);
        console.log(
          "  - Provider:",
          currentSession.user.app_metadata?.provider,
        );
        console.log(
          "  - Full Name:",
          currentSession.user.user_metadata?.full_name,
        );
      }

      console.log("Loading:", false);

      if (isMounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        if (event === "INITIAL_SESSION") {
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
