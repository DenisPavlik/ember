import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccordionList from "./AccordionList";

describe("AccordionList", () => {
  it("renders all FAQ questions", () => {
    render(<AccordionList />);
    expect(screen.getByText(/Who uses Ember\?/i)).toBeInTheDocument();
    expect(screen.getByText(/How do I get paid\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Is there a fee to use Ember\?/i)).toBeInTheDocument();
  });

  it("opens the first answer by default", () => {
    render(<AccordionList />);
    expect(screen.getByText(/Anyone with an audience\./i)).toBeInTheDocument();
  });

  it("shows the answer when a closed question is clicked", async () => {
    const user = userEvent.setup();
    render(<AccordionList />);

    await user.click(screen.getByText(/How do I get paid\?/i));
    expect(await screen.findByText(/You request a payout/i)).toBeInTheDocument();
  });

  it("collapses an open answer when its question is clicked again", async () => {
    const user = userEvent.setup();
    render(<AccordionList />);

    const question = screen.getByText(/Who uses Ember\?/i);
    // First item is open by default — clicking it should close it
    expect(screen.getByText(/Anyone with an audience\./i)).toBeInTheDocument();

    await user.click(question);
    // Wait for exit animation; element should be removed
    await new Promise((r) => setTimeout(r, 350));
    expect(screen.queryByText(/Anyone with an audience\./i)).not.toBeInTheDocument();
  });

  it("opens a different answer when another question is clicked", async () => {
    const user = userEvent.setup();
    render(<AccordionList />);

    await user.click(screen.getByText(/Who uses Ember\?/i));
    await user.click(screen.getByText(/How do I get paid\?/i));

    expect(await screen.findByText(/You request a payout/i)).toBeInTheDocument();
  });
});
