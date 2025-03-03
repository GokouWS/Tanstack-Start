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

import appCss from "~/styles/app.css?url";
import { DefaultCatchBoundary } from "~/features/global/components/DefaultCatchboundary";
import { NotFound } from "~/features/global/components/NotFound";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
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
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
