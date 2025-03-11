import React from "react";
import { render, screen } from "@testing-library/react";
import Counter from "./Counter";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";

describe("Counter", () => {
  it("renders on no count", () => {
    render(<Counter count={undefined} incrementFn={() => {}} />);
    const text = screen.getByText("Cannot find count");
    expect(text).toBeInTheDocument();
  });
});
