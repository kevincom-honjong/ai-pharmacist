import { useEffect, useCallback, useRef } from "react";

// Push a history entry for the current screen state
export function pushHistory(state: string) {
  window.history.pushState({ screen: state }, "");
}

// Hook: listen for browser back button and call onBack
export function useBackButton(onBack: (() => void) | null) {
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  const handler = useCallback((e: PopStateEvent) => {
    if (onBackRef.current) {
      e.preventDefault();
      onBackRef.current();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [handler]);
}
