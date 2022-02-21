import { AnimatePresence, motion } from "framer-motion";
import { chevronUpOutline } from "ionicons/icons";

import { IonFab, IonFabButton, IonIcon } from "@ionic/react";

const MotionIonFab = motion(IonFab)

interface ScrollToTopButtonProps {
  isVisible: boolean
  onScrollToTop: () => void
}

export const ScrollToTopButton = ({
  isVisible,
  onScrollToTop,
}: ScrollToTopButtonProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <MotionIonFab
          vertical="bottom"
          horizontal="end"
          slot="fixed"
          animate={{ y: 0 }}
          initial={{ y: '100vh' }}
          exit={{ y: '100vh' }}
        >
          <IonFabButton onClick={onScrollToTop}>
            <IonIcon icon={chevronUpOutline} />
          </IonFabButton>
        </MotionIonFab>
      )}
    </AnimatePresence>
  )
}
