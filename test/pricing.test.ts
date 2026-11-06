import { StandardDiscount, HappyHourDiscount, LoyaltyDiscount, PromotionCodeDiscount } from "../src/domain/order/order.discount.js"
import { describe, it, expect } from "vitest";

describe("Discount Strategies", () => {
  it("should calculate standard pricing correctly", () => {
    const strategy = new StandardDiscount();
    expect(strategy.calculatePrice(100)).toBe(100);
  });

  it("should calculate happy hour pricing correctly", () => {
    const strategy = new HappyHourDiscount();
    expect(strategy.calculatePrice(100)).toBe(80);
  });

  it("should calculate loyalty pricing correctly", () => {
    const strategy = new LoyaltyDiscount();
    expect(strategy.calculatePrice(100)).toBe(90);
  });

  it("should calculate promotion code pricing correctly", () => {
    const strategy = new PromotionCodeDiscount(0.1);
    expect(strategy.calculatePrice(100)).toBe(90);
  });
});