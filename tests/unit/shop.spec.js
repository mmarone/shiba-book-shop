// Components
import Shop from "@/views/Shop";
import request from "./mock/request";

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

  it("should return the correct data.", () => {
    return request().then(res => {
      expect(res).toBeDefined();
      expect(res.entity.books).not.toBeNull();
      expect(res.entity.books.length).toBe(7);

      expect(res.entity.books[0]).toMatchObject({
        cover:
          "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/4088/9781408855652.jpg",
        price: "350",
        title: "Harry Potter and the Philosopher's Stone (I)",
        id: "9781408855652"
      });
    });
  });
});
