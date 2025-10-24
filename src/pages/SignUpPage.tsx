import { SignupSection } from "@/components/sections/signup-section";
import { useContentStore } from "@/state/content-store";

export const SignUpPage = () => {
  const signup = useContentStore((state) => state.content.signUp);

  return <SignupSection section={signup} />;
};
