import { ContactFormLabels } from "./types";

/**
 * Resolves contact-specific form labels using the provided translation function.
 * This keeps the JSON keys (namespaces) encapsulated within the feature layer,
 * so page.tsx doesn't need to know about "contact.form.nameLabel".
 */
export function getContactFormLabels(translate: (key: string) => string): ContactFormLabels {
    return {
        nameLabel: translate("contact.form.nameLabel"),
        emailLabel: translate("contact.form.emailLabel"),
        messageLabel: translate("contact.form.messageLabel"),
        buttonSend: translate("contact.form.buttonSend")
    };
}