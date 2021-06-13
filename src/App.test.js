import React from "react";
import { render } from "@testing-library/react";
import { SWRConfig, cache } from "swr";
import App from "./App";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
      ]),
    );
  }),
);
describe("test", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    cache.clear();
    server.resetHandlers();
  });

  test("renders learn react link", async () => {
    const { findByText } = render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <App />
      </SWRConfig>,
    );
    const element = await findByText(
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    );
    expect(element).toBeInTheDocument();
  });
});
