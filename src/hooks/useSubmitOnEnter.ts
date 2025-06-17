import { useCallback } from "react";

type TUseSubmitOnEnterArgs = {
  onSubmit: () => void;
};

export const useSubmitOnEnter = ({ onSubmit }: TUseSubmitOnEnterArgs) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        onSubmit();
      }
    },
    [onSubmit]
  );

  return { handleKeyDown };
};
