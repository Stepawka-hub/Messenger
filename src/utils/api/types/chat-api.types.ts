import { TChatMessage } from '@types';

export type TSubscriber = (messages: TChatMessage[]) => void;
