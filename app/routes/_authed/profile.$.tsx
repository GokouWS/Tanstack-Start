import { createFileRoute } from "@tanstack/react-router";
import Greeting from "~/features/profile/components/Greeting";

export const Route = createFileRoute("/_authed/profile/$")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Greeting name="Will" />
    </div>
  );
}
