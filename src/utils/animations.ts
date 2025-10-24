import { useEffect, useRef, type MutableRefObject } from "react";

type AnimationOptions = KeyframeAnimationOptions & {
  keyframes?: Keyframe[] | PropertyIndexedKeyframes;
};

const defaultKeyframes: Keyframe[] = [
  { opacity: 0, transform: "translateY(16px)" },
  { opacity: 1, transform: "translateY(0)" },
];

export function useAnimatedReveal<T extends HTMLElement>(
  enabled = true,
  options: AnimationOptions = {},
): MutableRefObject<T | null> {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    const element = elementRef.current;
    if (!element || typeof element.animate !== "function") {
      return;
    }

    const { keyframes = defaultKeyframes, ...animationOptions } = options ?? {};
    const animation = element.animate(keyframes, {
      duration: 450,
      easing: "ease-out",
      fill: "both",
      ...animationOptions,
    });

    return () => animation.cancel();
  }, [enabled, options]);

  return elementRef;
}

export function animateOnChange<T>(
  _value: T,
  ref: MutableRefObject<HTMLElement | null>,
  options: AnimationOptions = {},
): void {
  if (typeof window === "undefined") {
    return;
  }

  const element = ref.current;
  if (!element || typeof element.animate !== "function") {
    return;
  }

  const { keyframes = defaultKeyframes, ...animationOptions } = options ?? {};
  element.animate(keyframes, {
    duration: 300,
    easing: "ease-out",
    fill: "both",
    ...animationOptions,
  });
}


