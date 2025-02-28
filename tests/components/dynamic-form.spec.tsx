
import { render, screen } from '@testing-library/react';

import DynamicForm from "@components/forms/dynamic-form";
import TestForm from '@configs/forms/test.json';


describe('Dynamic Form', () => {
    // let expectedProps;

    // beforeEach(() => {
    //     expectedProps = {
    //         config: TestForm
    //     }
    // })
    
    test('should render dynamic form', () => {
        const { getByRole, getByLabelText } = render(<DynamicForm config={TestForm} backButton={()=> {}} />);

        const username = getByRole('textbox', {
            name: /username/i
        });
        const password = getByLabelText(/password/i);
        const submitButton = getByRole('button', {
            name: /submit/i
        });
        const backButton = getByRole('button', {
            name: /back/i
        });

        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(backButton).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        screen.debug();
    })
})