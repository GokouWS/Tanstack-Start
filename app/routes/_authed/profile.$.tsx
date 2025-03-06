import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/profile/$")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>You are logged in!</div>;
}
