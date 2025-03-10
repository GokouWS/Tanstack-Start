import { Button } from "@global/components/ui/button";

interface CounterProps {
  count?: number;
  incrementFn: () => void;
}
const Counter = ({ count, incrementFn }: CounterProps) => {
  return (
    <Button
      type="button"
      disabled={!count}
      onClick={() => {
        incrementFn();
      }}
      className="h-10 w-full bg-(--grape)"
    >
      {count ? `Add 1 to ${count}?` : "Cannot find count"}
    </Button>
  );
};

export default Counter;
