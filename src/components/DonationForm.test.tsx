import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DonationForm from "./DonationForm";

vi.mock("@/actions/donationActions", () => ({
  default: vi.fn(() => Promise.resolve(false)),
}));

describe("DonationForm", () => {
  it("renders with default amount of 1 and shows Support $5", () => {
    render(<DonationForm email="test@example.com" />);
    expect(screen.getByRole("button", { name: /Support \$5/i })).toBeInTheDocument();
  });

  it("updates amount when quick buttons are clicked", async () => {
    const user = userEvent.setup();
    render(<DonationForm email="test@example.com" />);

    await user.click(screen.getByRole("button", { name: /3 coffees/i }));
    expect(await screen.findByRole("button", { name: /Support \$15/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /5 coffees/i }));
    expect(await screen.findByRole("button", { name: /Support \$25/i })).toBeInTheDocument();
  });

  it("allows amount of 2 (regression: was blocked by old logic)", async () => {
    const user = userEvent.setup();
    render(<DonationForm email="test@example.com" />);

    const customInput = screen.getByPlaceholderText("e.g. 10");
    await user.clear(customInput);
    await user.type(customInput, "2");

    expect(await screen.findByRole("button", { name: /Support \$10/i })).toBeInTheDocument();
  });

  it("allows amount of 4 (regression: was blocked by old logic)", async () => {
    const user = userEvent.setup();
    render(<DonationForm email="test@example.com" />);

    const customInput = screen.getByPlaceholderText("e.g. 10");
    await user.clear(customInput);
    await user.type(customInput, "4");

    expect(await screen.findByRole("button", { name: /Support \$20/i })).toBeInTheDocument();
  });

  it("disables submit and shows error when amount is out of range", async () => {
    const user = userEvent.setup();
    render(<DonationForm email="test@example.com" />);

    const customInput = screen.getByPlaceholderText("e.g. 10");
    await user.clear(customInput);
    await user.type(customInput, "5000");

    expect(await screen.findByText(/Amount must be between 1 and 1000/i)).toBeInTheDocument();
    const submit = screen.getByRole("button", { name: /Support \$/i });
    expect(submit).toBeDisabled();
  });

  it("allows selecting a different crypto", async () => {
    const user = userEvent.setup();
    render(<DonationForm email="test@example.com" />);

    const ethButton = screen.getByRole("button", { name: /ETH/i });
    await user.click(ethButton);
    expect(ethButton.className).toContain("active");
  });

  it("requires a name input", () => {
    render(<DonationForm email="test@example.com" />);
    const nameInput = screen.getByPlaceholderText("Your name");
    expect(nameInput).toBeRequired();
  });
});
