import {
  useEffect,
  useRef,
} from 'react';

export default function useEventListener (eventName: string, handler: (event: Event) => void, element=window): void {
  const savedHandler = useRef((event: Event)=>{});

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      const eventListener = (event: Event) => savedHandler.current(event);
      element.addEventListener(eventName, eventListener);

      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element]
  );
}