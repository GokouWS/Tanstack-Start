import { createFileRoute } from "@tanstack/react-router";
import Counter from "~/features/counter/components/Counter";
import { Loader } from "~/features/global/components/Loader";

export const Route = createFileRoute("/counter")({
  component: RouteComponent,
  pendingComponent: () => <Loader />,
});

function RouteComponent() {
  return (
    <div>
      Hello "/counter"!
      <Counter />
      {/* <Loader /> */}
    </div>
  );
}
