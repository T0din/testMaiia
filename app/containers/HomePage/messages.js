/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from "react-intl";

export const scope = "boilerplate.containers.HomePage";

export default defineMessages({
  startProjectHeader: {
    id: `${scope}.start_project.header`,
    defaultMessage: "Accueil du test",
  },
  startProjectMessage: {
    id: `${scope}.start_project.message`,
    defaultMessage: "Un test fait avec amour et passion :)",
  },
  trymeHeader: {
    id: `${scope}.tryme.header`,
    defaultMessage: "Try me!",
  },
  trymeMessage: {
    id: `${scope}.tryme.message`,
    defaultMessage: "Show Github repositories by",
  },
  trymeAtPrefix: {
    id: `${scope}.tryme.atPrefix`,
    defaultMessage: "@",
  },
});
