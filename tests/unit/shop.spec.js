// Components
import Shop from "@/views/Shop";

describe("Shop.vue", () => {
  it("sets the correct default data", () => {
    expect(typeof Shop.data).toBe("function");
    const defaultData = Shop.data();
    expect(defaultData.success).toBe(true);
    expect(defaultData.bookLists).toEqual([]);
    expect(defaultData.cartList).toEqual([]);
    expect(defaultData.uniqueBook).toEqual([]);
    expect(defaultData.dialog).toBe(false);
    expect(defaultData.paid).toBe(0);
    expect(defaultData.change).toBe(0);

    // Validate rule
    expect(defaultData.paidRules[0]).toEqual(expect.any(Function));
    expect(defaultData.paidRules[1]).toEqual(expect.any(Function));
    expect(defaultData.paidRules[2]).toEqual(expect.any(Function));
  });
});
