// import { ReactNode } from "react";
// import { useUser } from "@clerk/clerk-react";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// interface RequireAuthProps {
//   children: ReactNode;
// }

// export function RequireAuth({ children }: RequireAuthProps) {
//   const { isSignedIn } = useUser();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isSignedIn) {
//       alert("Please sign in to access this page.");
//       navigate("/login");
//     }
//   }, [isSignedIn, navigate]);

//   if (!isSignedIn) return null;

//   return <>{children}</>;
// }



import { ReactNode, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  // Prevent double alert in React Strict Mode
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (!isSignedIn && !hasAlerted.current) {
      alert("Please sign in to access this page.");
      hasAlerted.current = true;
      navigate("/login");
    }
  }, [isSignedIn, navigate]);

  if (!isSignedIn) return null;

  return <>{children}</>;
}
