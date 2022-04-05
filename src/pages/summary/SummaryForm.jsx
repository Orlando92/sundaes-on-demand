import { useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

export const SummaryForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(!isChecked)}
          label={
            <span>
              I agree to{" "}
              <OverlayTrigger
                trigger={["hover", "focus"]}
                placement="right"
                overlay={
                  <Popover id="popover-terms">
                    <Popover.Body>
                      No Ice Cream will actually be delivered
                    </Popover.Body>
                  </Popover>
                }
              >
                <span style={{ color: "blue" }}>Terms and Conditions</span>
              </OverlayTrigger>
            </span>
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isChecked}>
        Confirm order
      </Button>
    </Form>
  );
};
