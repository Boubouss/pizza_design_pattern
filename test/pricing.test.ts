import { StandardPricing, HappyHourPricing, LoyaltyPricing, PromotionCodePricing } from "../src/pricing.js"
import { describe, it, expect } from "vitest";

describe("Pricing Strategies", () => {
  it("should calculate standard pricing correctly", () => {
    const strategy = new StandardPricing();
    expect(strategy.calculatePrice(100)).toBe(100);
  });

  it("should calculate happy hour pricing correctly", () => {
    const strategy = new HappyHourPricing();
    expect(strategy.calculatePrice(100)).toBe(80);
  });

  it("should calculate loyalty pricing correctly", () => {
    const strategy = new LoyaltyPricing();
    expect(strategy.calculatePrice(100)).toBe(90);
  });

  it("should calculate promotion code pricing correctly", () => {
    const strategy = new PromotionCodePricing(0.1);
    expect(strategy.calculatePrice(100)).toBe(90);
  });
});