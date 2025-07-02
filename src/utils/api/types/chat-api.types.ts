import { TChatMessage, TSocketStatus } from "@types";

export type TEventDataTypes = {
  "message-received": TChatMessage[];
  "status-changed": TSocketStatus;
};

export type TEventNames = keyof TEventDataTypes;

export type TSubscriber<Event extends TEventNames> = (
  data: TEventDataTypes[Event]
) => void;

export type TSubscribers = {
  [Event in TEventNames]: TSubscriber<Event>[];
};
