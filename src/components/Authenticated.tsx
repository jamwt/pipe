import { useConvexAuth, useMutation } from "convex/react";
import {
  Context,
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { Loading } from "./Loading";
import { SignInButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";

export type AuthenticatedUser = Doc<"users">;
export const UserContext: Context<AuthenticatedUser | null> = createContext(
  null as AuthenticatedUser | null
);

export const Authenticated: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  const storeUser = useMutation(api.users.store);
  const [serverUser, setServerUser] = useState(null as AuthenticatedUser | null);
  useEffect(() => {
    // If the user is not logged in don't do anything
    if (!isAuthenticated) {
      return;
    }
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const su = await storeUser();
      setServerUser(su);
    }
    createUser();
  }, [isAuthenticated, storeUser, user?.id]);
  if (isLoading) {
    return <Loading />;
  }
  if (!isAuthenticated) {
    return <SignInButton mode="modal" />;
  }
  return (<UserContext.Provider value={serverUser}>
  <div className="logged-in-context">{children}</div>
</UserContext.Provider>
  );
};
