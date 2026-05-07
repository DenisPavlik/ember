import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DonationList from "./DonationList";
import { Donation } from "@/models/Donation";

const makeDonation = (overrides: Partial<Donation> = {}): Donation => ({
  _id: "1",
  amount: 1,
  name: "Alice",
  message: "Keep it up!",
  crypto: "btc",
  paid: true,
  email: "creator@ember.app",
  ...overrides,
});

describe("DonationList", () => {
  it("renders the empty state when there are no donations", () => {
    render(<DonationList donations={[]} />);
    expect(screen.getByText(/No recent donations/i)).toBeInTheDocument();
  });

  it("renders 'a coffee' for amount = 1", () => {
    render(<DonationList donations={[makeDonation({ amount: 1 })]} />);
    expect(screen.getByText(/a coffee/i)).toBeInTheDocument();
    expect(screen.queryByText(/coffees/i)).not.toBeInTheDocument();
  });

  it("renders 'N coffees' for amount > 1", () => {
    render(<DonationList donations={[makeDonation({ amount: 5 })]} />);
    expect(screen.getByText(/5 coffees/i)).toBeInTheDocument();
  });

  it("displays the supporter name", () => {
    render(<DonationList donations={[makeDonation({ name: "Bohdan" })]} />);
    expect(screen.getByText("Bohdan")).toBeInTheDocument();
  });

  it("renders the message when present", () => {
    render(<DonationList donations={[makeDonation({ message: "Loved this!" })]} />);
    expect(screen.getByText("Loved this!")).toBeInTheDocument();
  });

  it("does not render an empty message paragraph when message is missing", () => {
    const { container } = render(
      <DonationList donations={[makeDonation({ message: "" })]} />
    );
    // Only the heading <h3> should remain inside the donation row, no <p> for the message
    const messageBoxes = container.querySelectorAll("p.bg-gray-100");
    expect(messageBoxes.length).toBe(0);
  });

  it("renders multiple donations with unique keys", () => {
    const donations = [
      makeDonation({ _id: "1", name: "Alice" }),
      makeDonation({ _id: "2", name: "Bob" }),
      makeDonation({ _id: "3", name: "Carol" }),
    ];
    render(<DonationList donations={donations} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Carol")).toBeInTheDocument();
  });
});
