// __root.tsx
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  createRootRouteWithContext,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/tanstack-start";
import { getAuth } from "@clerk/tanstack-start/server";

import appCss from "~/styles/app.css?url";
import { DefaultCatchBoundary } from "~/features/global/components/DefaultCatchboundary";
import { NotFound } from "~/features/global/components/NotFound";
import { ConvexQueryClient } from "@convex-dev/react-query";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { createServerFn } from "@tanstack/start";
import { getWebRequest } from "vinxi/http";
import { useRouteContext } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const auth = await getAuth(getWebRequest());
  const token = await auth.getToken({ template: "convex" });

  return {
    userId: auth.userId,
    token,
  };
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  convexClient: ConvexReactClient;
  convexQueryClient: ConvexQueryClient;
}>()({
  head: () => {
    return {
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      links: [{ rel: "stylesheet", href: appCss }],
    };
  },
  beforeLoad: async (ctx) => {
    const auth = await fetchClerkAuth();
    const { userId, token } = auth;

    // During SSR only (the only time serverHttpClient exists),
    // set the Clerk auth token to make HTTP queries with.
    if (token) {
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token);
    }

    return {
      userId,
      token,
    };
  },
  errorComponent: (props) => (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  ),
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  // const { theme } = Route.useLoaderData(); // Corrected: Use useLoaderData to get the loaded data
  return (
    // <ThemeProvider initialTheme={theme}>
    <RootDocument>
      <Outlet />
    </RootDocument>
    // </ThemeProvider>
  );
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
  const context = useRouteContext({ from: Route.id });

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={context.convexClient} useAuth={useAuth}>
        <html>
          <head>
            <HeadContent />
          </head>
          <body>
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
                to="/profile"
                activeProps={{
                  className: "font-bold",
                }}
              >
                Profile
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
            {children}
            <ReactQueryDevtools buttonPosition="bottom-left" />
            <TanStackRouterDevtools position="bottom-right" />
            <Scripts />
          </body>
        </html>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
