import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "~/features/global/components/Loader";

export const Route = createFileRoute("/counter")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/counter"!
      <Loader />
    </div>
  );
}
