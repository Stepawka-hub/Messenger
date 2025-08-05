import { useCallback } from "react";

type TUseSubmitOnEnterArgs = {
  disabled: boolean;
  onSubmit: () => void;
};

export const useSubmitOnEnter = ({
  disabled,
  onSubmit,
}: TUseSubmitOnEnterArgs) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (!disabled) {
          onSubmit();
        }
      }
    },
    [disabled, onSubmit]
  );

  return { handleKeyDown };
};
