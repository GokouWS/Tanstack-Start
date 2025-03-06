import * as fs from "node:fs";
import { useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Button } from "@global/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";

const filePath = "count.txt";

async function readCount() {
  return parseInt(await fs.promises.readFile(filePath, "utf-8").catch(() => "0"));
}

const updateCount = createServerFn({ method: "POST" })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + data}`);
  });

const Counter = () => {
  const router = useRouter();
  const { data } = useSuspenseQuery(convexQuery(api.count.getGlobalCount, {}));

  return (
    <Button
      type="button"
      onClick={() => {
        updateCount({ data: 1 }).then(() => {
          router.invalidate();
        });
      }}
      className="h-10 w-full bg-(--grape)"
    >
      Add 1 to {data?.count}?
    </Button>
  );
};

export default Counter;
