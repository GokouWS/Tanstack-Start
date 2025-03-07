import React from "react";
import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";

describe("Greeting", () => {
  it("renders default greeting", () => {
    render(<Greeting />);
    expect(screen.getByText("Hello, World")).toBeInTheDocument();
  });

  // it("renders greeting with a name", () => {})
});
