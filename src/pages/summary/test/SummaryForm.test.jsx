import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";
import userEvent from "@testing-library/user-event";
const getCheckbox = () => {
  return screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
};

const getButton = () => {
  return screen.getByRole("button", {
    name: "Confirm order",
  });
};

describe("Tests on <SummaryForm />", () => {
  test("should have a checkbox unchecked", () => {
    render(<SummaryForm />);
    const checkbox = getCheckbox();
    expect(checkbox).not.toBeChecked();
  });
  test("should have a button disabled", () => {
    render(<SummaryForm />);
    const button = getButton();

    expect(button).toBeDisabled();
  });
  test("should enable button when checking checkbox", async () => {
    render(<SummaryForm />);
    const checkbox = getCheckbox();
    const button = getButton();
    await userEvent.click(checkbox);
    expect(button).toBeEnabled();
    expect(checkbox).toBeChecked();
  });
  test("should disable button when checking checkbox twice", async () => {
    render(<SummaryForm />);
    const checkbox = getCheckbox();
    const button = getButton();
    await userEvent.click(checkbox);
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  test("popover responds to hover", () => {
    render(<SummaryForm />);
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();
  });

  test("should show popover when hover", async () => {
    render(<SummaryForm />);
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await userEvent.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();
  });
  test("should hide popover when unhover", async () => {
    render(<SummaryForm />);
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await userEvent.hover(termsAndConditions);
    await userEvent.unhover(termsAndConditions);
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();
  });
});
