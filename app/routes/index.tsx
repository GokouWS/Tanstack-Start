import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { Button } from "@global/components/ui/button";
import { Loader } from "~/features/global/components/Loader";
import Counter from "~/features/counter/components/Counter";

export const Route = createFileRoute("/")({
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(convexQuery(api.count.list, {}));
    await opts.context.queryClient.ensureQueryData(
      convexQuery(api.count.getGlobalCount, {}),
    );
  },
  component: Home,
  pendingComponent: () => <Loader />,
});

function Home() {
  const { data: users } = useSuspenseQuery(convexQuery(api.count.list, {}));
  const { data: globalCount } = useSuspenseQuery(
    convexQuery(api.count.getGlobalCount, {}),
  );
  const { mutate } = useMutation({
    mutationFn: useConvexMutation(api.count.incrementGlobalCount),
  });

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">User Counts</h1>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Global Count</h2>
        <Counter count={globalCount?.count} incrementFn={() => mutate({ amount: 1 })} />
      </div>

      <div>
        <h2 className="mb-2 text-xl font-semibold">Individual User Counts</h2>
        <div className="space-y-2">
          {users?.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md border p-3"
            >
              <span className="font-medium">{user.name}</span>
              <span className="rounded-full bg-gray-100 px-3 py-1">
                Count: {user.count ?? 0}
              </span>
            </div>
          ))}
          {users?.length === 0 && <p className="text-gray-500 italic">No users found</p>}
        </div>
      </div>
    </div>
  );
}
