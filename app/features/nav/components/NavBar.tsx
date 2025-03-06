import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/tanstack-start";
import { Link, useRouterState } from "@tanstack/react-router";
import { Loader } from "~/features/global/components/Loader";

const NavBar = () => {
  return (
    <div className="flex gap-2 p-2 text-lg">
      <LoadingIndicator />
      <Link
        to="/"
        activeProps={{
          className: "font-bold",
        }}
        activeOptions={{ exact: true }}
      >
        Home
      </Link>{" "}
      <Link
        to="/profile/$"
        activeProps={{
          className: "font-bold",
        }}
      >
        Profile
      </Link>
      <Link
        to="/counter"
        activeProps={{
          className: "font-bold",
        }}
      >
        Counter
      </Link>
      <div className="ml-auto">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
      </div>
    </div>
  );
};

export default NavBar;

function LoadingIndicator() {
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  return (
    <div
      className={`h-12 transition-all duration-300 ${
        isLoading ? `opacity-100 delay-300` : `opacity-0 delay-0`
      }`}
    >
      <Loader />
    </div>
  );
}
