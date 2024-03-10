import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";

describe('Header Component', () => {
    it('should have Header comp.', () => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        // const headerComp = screen.getByText('/Todoist/i');
        // expect(headerComp).toBeInTheDocument();
        screen.debug()
    });
})