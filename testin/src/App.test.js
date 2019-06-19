import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, getByText } from "@testing-library/react"; // << install this
import "@testing-library/react/cleanup-after-each";

import App from "./App";
import Display from "./Display";
import Dashboard from "./Dashboard";

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

    it("increments strikes", async () => {
      const { getByText } = render(<App />);
      const StrikeButton = getByText(/hit!/i);
      const strikes = getByText(/strikes: 0/i);
      const strikesNum = strikes.textContent[strikes.textContent.length - 1];
      fireEvent.click(StrikeButton);
      expect(strikesNum).toBe("1");
    });

    it("resets balls and strikes at 3 strikes", async () => {
      const { getByText } = render(<App />);
      const StrikeButton = getByText(/hit!/i);
      const balls = getByText(/balls: 0/i);
      const ballsNum = balls.textContent[balls.textContent.length - 1];
      const strikes = getByText(/strikes: 0/i);
      const strikesNum = strikes.textContent[strikes.textContent.length - 1];
      expect(ballsNum).toBe("0");
      expect(strikesNum).toBe("0");      
      fireEvent.click(StrikeButton);
      fireEvent.click(StrikeButton);
      fireEvent.click(StrikeButton);
      const newBallsNum = balls.textContent[balls.textContent.length - 1];
      const newStrikesNum = strikes.textContent[strikes.textContent.length - 1];
      expect(newBallsNum).toBe("0");
      expect(newStrikesNum).toBe("0");
    });
  });

  describe("Ball Button", () => {
    it("exists", () => {
      const { getByText } = render(<App />);
      getByText(/ball!/i);
    });

    it("increments balls", async () => {
      const { getByText } = render(<App />);
      const BallButton = getByText(/hit!/i);
      const balls = getByText(/balls: 0/i);
      const ballsNum = balls.textContent[balls.textContent.length - 1];
      fireEvent.click(BallButton);
      expect(ballsNum).toBe("1");
    });

    it("resets balls and strikes at 4 balls", async () => {
      const { getByText } = render(<App />);
      const BallButton = getByText(/hit!/i);
      const balls = getByText(/balls: 0/i);
      const ballsNum = balls.textContent[balls.textContent.length - 1];
      const strikes = getByText(/strikes: 0/i);
      const strikesNum = strikes.textContent[strikes.textContent.length - 1];
      expect(ballsNum).toBe("0")
      expect(strikesNum).toBe("0");
      fireEvent.click(BallButton);
      fireEvent.click(BallButton);
      fireEvent.click(BallButton);
      fireEvent.click(BallButton);
      const newBallsNum = balls.textContent[balls.textContent.length - 1];
      const newStrikesNum = strikes.textContent[strikes.textContent.length - 1];
      expect(newBallsNum).toBe("0");
      expect(newStrikesNum).toBe("0");
    });
  });

  describe("Foul Button", () => {
    it("exists", () => {
      const { getByText } = render(<App />);
      getByText(/foul!/i);
    });

    it("increments strikes if there are less than 2 strikes", async () => {
      const { getByText } = render(<App />);
    });
  });

  describe("Hit Button", () => {
    it("exists", () => {
      const { getByText } = render(<App />);
      getByText(/hit!/i);
    });

    it("resets balls and strikes", async () => {
      const { getByText } = render(<App />);
      const HitButton = getByText(/hit!/i);
      const BallButton = getByText(/hit!/i);
      const StrikeButton = getByText(/strike!/i);
      await fireEvent.click(BallButton);
      await fireEvent.click(StrikeButton);
      expect(getByText(/balls:/i).textContent).toContain("1");
      expect(getByText(/strikes:/i).textContent).stringContaining("1");
      await fireEvent.click(HitButton);
      expect(getByText(/balls:/i).textContent).stringContaining("0");
      expect(getByText(/strikes:/i).textContent).stringContaining("0");
    });
  });
});
