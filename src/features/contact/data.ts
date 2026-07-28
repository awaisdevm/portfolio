import { ContactFormLabels } from "./types";


export function getContactFormLabels(translate: (key: string) => string): ContactFormLabels {
    return {
        nameLabel: translate("contact.form.nameLabel"),
        emailLabel: translate("contact.form.emailLabel"),
        messageLabel: translate("contact.form.messageLabel"),
        buttonSend: translate("contact.form.buttonSend")
    };
}