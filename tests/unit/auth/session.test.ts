import {
  createSessionToken,
  isHouseholdPasswordValid,
  verifySessionToken
} from "@/lib/auth";

test("validates the configured shared household password", () => {
  expect(isHouseholdPasswordValid("change-me")).toBe(true);
  expect(isHouseholdPasswordValid("wrong-password")).toBe(false);
});

test("creates and verifies a signed session token", () => {
  const token = createSessionToken();

  expect(verifySessionToken(token)).toBe(true);
  expect(verifySessionToken(`${token}tampered`)).toBe(false);
});
