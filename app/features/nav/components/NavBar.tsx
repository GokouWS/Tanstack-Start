import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/tanstack-start";
import { Link } from "@tanstack/react-router";

const NavBar = () => {
  return (
    <div className="flex gap-2 p-2 text-lg">
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
