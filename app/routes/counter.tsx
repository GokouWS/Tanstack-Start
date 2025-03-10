import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import Counter from "~/features/counter/components/Counter";
import { Loader } from "~/features/global/components/Loader";

export const Route = createFileRoute("/counter")({
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(
      convexQuery(api.count.getGlobalCount, {}),
    );
  },
  component: RouteComponent,
  pendingComponent: () => <Loader />,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(convexQuery(api.count.getGlobalCount, {}));
  const { mutate } = useMutation({
    mutationFn: useConvexMutation(api.count.incrementGlobalCount),
  });

  return (
    <div>
      Hello "/counter"!
      <Counter count={data?.count} incrementFn={() => mutate({ amount: 1 })} />
      {/* <Loader /> */}
    </div>
  );
}
