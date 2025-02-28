import FormWizard from "@components/forms/form-wizard"
import wizard from "@configs/forms/wizard"
import { act, fireEvent, render, screen } from "@testing-library/react"


describe('form wizard', () => {
    test('wizard form is showing', () => {
        const { queryByRole, getByLabelText, getByRole } = render(<FormWizard onWizardSubmit={()=> {}} formIsLoading={false} config={wizard} />);

        const continueButton = getByRole('button', {
            name: /continue/i
        });
        const backButton = queryByRole('button', {
            name: /back/i
        });
        const accountNumber = getByRole('textbox', {
            name: /Enter your Account Number/i
        })
        const phoneNumber = getByRole('textbox', {
            name: /phone number/i
        })
        const idType = getByLabelText(/select id type/i);
        const idNumber = getByRole('textbox', {
            name: /enter your id number/i
        });

        expect(continueButton).toBeInTheDocument();
        expect(backButton).not.toBeInTheDocument();
        expect(accountNumber).toBeInTheDocument();
        expect(phoneNumber).toBeInTheDocument();
        expect(idType).toBeInTheDocument();
        expect(idNumber).toBeInTheDocument();

        screen.debug();
    });

    let expectedAcNumber: string, expectedPhone: string, expectedIdType: string, expectedId: string;
    beforeEach(() => {
        expectedAcNumber = '0160163724372'
        expectedPhone = '254715748115'
        expectedIdType = 'National ID'
        expectedId = '33122724'
    });
    test('wizard form navigation when all fields are filled', async () => {
        const { getByLabelText, getByRole, getByText } = render(<FormWizard onWizardSubmit={()=> {}} formIsLoading={false} config={wizard} />);

        const accountNumber = getByRole('textbox', {
            name: /account number/i
        });
        const phoneNumber = getByRole('textbox', {
            name: /phone number/i
        });
        const idType = getByLabelText(/select id type/i);
        const idNumber = getByRole('textbox', {
            name: /id number/i
        });
        const continueButton = getByRole('button', {
            name: /continue/i
        });

        await act( async () => {
            fireEvent.change(accountNumber, { target: { value: expectedAcNumber }});
            fireEvent.change(phoneNumber, { target: { value: expectedPhone}});
            fireEvent.change(idType, { target: { value: expectedIdType }});
            fireEvent.change(idNumber, { target: { value: expectedId }});
            fireEvent.click(continueButton);
        });

        const backButton = getByRole('button', {
            name: /back/i
        });
        expect(backButton).toBeInTheDocument();

        const accountNo = getByRole('textbox', {
            name: /account number/i
        });
        const passportNo = getByRole('textbox', {
            name: /passport number/i
        });
        const acName = getByRole('textbox', {
            name: /account name/i
        });
        const acEmail = getByRole('textbox', {
            name: /email/i
        });
        const kraPin = getByRole('textbox', {
            name: 'KRA PIN'
        });
        const cKraPin = getByRole('textbox', {
            name: /confirm kra pin/i
        });

        await act( async () => {
            fireEvent.change(accountNo, { target: { value: expectedAcNumber}});
            fireEvent.change(passportNo, { target: { value: expectedId}});
            fireEvent.change(acName, { target: { value: 'Maru'}});
            fireEvent.change(acEmail, { target: { value: 'maru@gmail.com'}});
            fireEvent.change(kraPin, { target: { value: 'q123456789o'}});
            fireEvent.change(cKraPin, { target: { value: 'q123456789o'}});
            fireEvent.click(continueButton);
        });

        const txnLimit = getByRole('textbox', { name: /per transaction limit/i})
        const dailyLimit = getByRole('textbox', { name: /daily transaction limit/i})

        expect(txnLimit).toBeInTheDocument();
        expect(dailyLimit).toBeInTheDocument();
        await act( async() => {
            fireEvent.change(txnLimit, { target: { value: '50000000'}});
            fireEvent.change(dailyLimit, { target: { value: '500000000'}})
            fireEvent.click(continueButton);
        });

        const confirmLabel = getByText('Confirm Registration');
        const confirmButton = getByRole('button', { name: /register/i});

        expect(confirmLabel).toBeInTheDocument();
        expect(confirmButton).toBeInTheDocument();

        //test back button
        await act( async() => {
            fireEvent.click(backButton);
        });
        const txLimit = getByRole('textbox', { name: /per transaction limit/i})
        expect(txLimit).toBeInTheDocument();
    });
    test('user is prevented from proceeding without filling form', async () => {
        const { getByRole, getByText } = render(<FormWizard onWizardSubmit={()=> {}} formIsLoading={false} config={wizard} />);

        const continueButton = getByRole('button', {
            name: /continue/i
        });

        await act( async () => {
            fireEvent.click(continueButton);
        });

        const phoneNumberError = getByText('phoneNumber cannot be empty');
        const acNumberError = getByText('accountNumber cannot be empty');

        expect(phoneNumberError).toBeInTheDocument();
        expect(acNumberError).toBeInTheDocument();
    });
})