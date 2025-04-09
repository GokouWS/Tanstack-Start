import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import Greeting from "~/features/profile/components/Greeting";
import Counter from "~/features/counter/components/Counter";

export const Route = createFileRoute("/_authed/profile/$")({
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(convexQuery(api.users.current, {}));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useSuspenseQuery(convexQuery(api.users.current, {}));
  const { mutate } = useMutation({
    mutationFn: useConvexMutation(api.count.incrementUserCount),
  });

  return (
    <div className="p-4">
      <Greeting name={user?.name} />
      {JSON.stringify(user)}
      <div className="mt-6">
        <h2 className="mb-2 text-xl font-semibold">Your Personal Counter</h2>
        <Counter count={user?.count} incrementFn={() => mutate({ amount: 1 })} />
      </div>
    </div>
  );
}
