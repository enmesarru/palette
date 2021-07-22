import colorSlice from "./colorSlice";

describe("color reducer", () => {
  const initialState = {
    palette: []
  };

  it("should handle initial state", () => {
    expect(colorSlice(undefined, { type: "unknown" })).toEqual(initialState);
  });
});
