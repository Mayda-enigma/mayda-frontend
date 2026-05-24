export interface PasswordUpdateInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const toPasswordPayload = (input: PasswordUpdateInput) => ({
  currentPassword: input.currentPassword,
  newPassword: input.newPassword,
});
