import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, getByText } from "@testing-library/react"; // << install this
import "@testing-library/react/cleanup-after-each";

import App from "./App";

describe("<App />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders without errors", () => {
    const queries = render(<App />);
    // console.log(queries.debug())
    // if there are errors rendering the component, the test will fail
  });

  it("displays balls", () => {
    const { getByText } = render(<App />);
    getByText(/balls: [0-3]/i);
  });

  it("displays strikes", () => {
    const { getByText } = render(<App />);
    getByText(/strikes: [0-2]/i);
  });

  it("exists", () => {
    const { getByText } = render(<App />);
    getByText(/foul!/i);
  });

  it("exists", () => {
    const { getByText } = render(<App />);
    getByText(/hit!/i);
  });

  describe("Strike Button", () => {
    it("exists", () => {
      const { getByText } = render(<App />);
      getByText(/strike!/i);
    });

    it("increments strikes", () => {
      const { getByText } = render(<App />);
      const strikeButton = getByText(/strike!/i);
      fireEvent.click(strikeButton);
      expect(getByText(/strikes:/i).textContent).toContain("1");     
    });

    it("resets balls and strikes at 3 strikes", () => {
      const { getByText } = render(<App />);
      const ballButton = getByText(/ball!/i);
      const strikeButton = getByText(/strike!/i);
      expect(getByText(/balls:/i).textContent).toContain("0");
      expect(getByText(/strikes:/i).textContent).toContain("0");     
      fireEvent.click(strikeButton);
      fireEvent.click(strikeButton);
      fireEvent.click(ballButton);
      expect(getByText(/balls:/i).textContent).toContain("1");
      expect(getByText(/strikes:/i).textContent).toContain("2");
      fireEvent.click(strikeButton);
      expect(getByText(/balls:/i).textContent).toContain("0");
      expect(getByText(/strikes:/i).textContent).toContain("0");
    });
  });

  describe("Ball Button", () => {
    it("exists", () => {
      const { getByText } = render(<App />);
      getByText(/ball!/i);
    });

    it("increments balls", () => {
      const { getByText } = render(<App />);
      const ballButton = getByText(/ball!/i);
      fireEvent.click(ballButton);
      expect(getByText(/balls:/i).textContent).toContain("1");
    });

    it("resets balls and strikes at 4 balls", () => {
      const { getByText } = render(<App />);
      const ballButton = getByText(/ball!/i);
      const strikeButton = getByText(/strike!/i);
      expect(getByText(/balls:/i).textContent).toContain("0");
      expect(getByText(/strikes:/i).textContent).toContain("0");
      fireEvent.click(ballButton);
      fireEvent.click(ballButton);
      fireEvent.click(ballButton);
      fireEvent.click(strikeButton);
      expect(getByText(/balls:/i).textContent).toContain("3");
      expect(getByText(/strikes:/i).textContent).toContain("1");
      fireEvent.click(ballButton);
      expect(getByText(/balls:/i).textContent).toContain("0");
      expect(getByText(/strikes:/i).textContent).toContain("0");
    });
  });

  describe("Foul Button", () => {
    it("exists", () => {
      const { getByText } = render(<App />);
      getByText(/foul!/i);
    });

    it("increments strikes if there are less than 2 strikes", () => {
      const { getByText } = render(<App />);
      const foulButton = getByText(/foul!/i);
      expect(getByText(/strikes:/i).textContent).toContain("0");
      fireEvent.click(foulButton);
      expect(getByText(/strikes:/i).textContent).toContain("1");
      fireEvent.click(foulButton);
      expect(getByText(/strikes:/i).textContent).toContain("2");
      fireEvent.click(foulButton);
      expect(getByText(/strikes:/i).textContent).toContain("2");
    });
  });

  describe("Hit Button", () => {
    it("exists", () => {
      const { getByText } = render(<App />);
      getByText(/hit!/i);
    });

    it("resets balls and strikes", () => {
      const { getByText } = render(<App />);
      const hitButton = getByText(/hit!/i);
      const ballButton = getByText(/ball!/i);
      const strikeButton = getByText(/strike!/i);
      fireEvent.click(ballButton);
      fireEvent.click(strikeButton);
      expect(getByText(/balls:/i).textContent).toContain("1");
      expect(getByText(/strikes:/i).textContent).toContain("1");
      fireEvent.click(hitButton);
      expect(getByText(/balls:/i).textContent).toContain("0");
      expect(getByText(/strikes:/i).textContent).toContain("0");
    });
  });
});
