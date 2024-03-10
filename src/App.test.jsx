import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";

// important difference between getBy, queryBy and findBy funnctions

describe('Header Component', () => {
    it('should have title Todoist', () => {
        render(<Provider store={store}><App/></Provider>);
        const headerComp = screen.getByText(/Todoist/);
        expect(headerComp).toBeInTheDocument();
    });

})

describe('When Todo List Renders', () => {
    it('should have input text box', () => {
        render(<Provider store={store}><App/></Provider>);
        expect(screen.queryByRole('textbox')).toBeInTheDocument();
    });

    it('should have 5 checkboxes', async () => {
        render(<Provider store={store}><App/></Provider>);
        const checkboxes = await screen.findAllByRole('checkbox');
        expect(checkboxes.length).toEqual(5);
    });    
})