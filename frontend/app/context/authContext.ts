import {createContext} from "react";
import type { AuthContextType } from "~/utils/types";


const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;