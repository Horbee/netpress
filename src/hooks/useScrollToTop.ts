import { useRef, useState } from "react";

import { ScrollDetail } from "@ionic/react";

export const useScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const contentRef = useRef<HTMLIonContentElement>(null)

  const handleScroll = (e: CustomEvent<ScrollDetail>) => {
    if (e.detail.scrollTop > contentRef.current?.scrollHeight!) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => contentRef.current?.scrollToTop(500)

  return { isVisible, handleScroll, scrollToTop, contentRef }
}
