import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    const registerUseCase = new RegisterUseCase({
      findByEmail: async () => null,
      async create(data) {
        return {
          id: "user-123",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    });

    const isPasswordCorrectyHashed = await compare(
      "password123",
      user.password_hash,
    );

    expect(isPasswordCorrectyHashed).toBe(true);
  });
});
