import { getActiveSegmentationInfo } from './activeSegmentationController'
import { getGlobalSegmentationDataByUID } from '../../stateManagement/segmentation/segmentationState'
import { triggerSegmentationGlobalStateModified } from '.'

/**
 * Returns the active segment index for the active segmentation in the tool group
 *
 * @param {string} toolGroupUID - The UID of the tool group that contains an
 * active segmentation.
 * @returns The active segment index.
 */
function getActiveSegmentIndex(toolGroupUID: string): number | undefined {
  const segmentationInfo = getActiveSegmentationInfo(toolGroupUID)

  if (!segmentationInfo) {
    throw new Error('toolGroup does not contain an active segmentation')
  }

  const { volumeUID } = segmentationInfo
  const activeSegmentationGlobalState =
    getGlobalSegmentationDataByUID(volumeUID)

  if (activeSegmentationGlobalState) {
    return activeSegmentationGlobalState.activeSegmentIndex
  }
}

/**
 * Set the active segment index for the active segmentation of the toolGroup.
 * It fires a global state modified event.
 *
 * @event {SEGMENTATION_GLOBAL_STATE_MODIFIED}
 * @param {string} toolGroupUID - The UID of the tool group that contains the
 * segmentation.
 * @param {number} segmentIndex - The index of the segment to be activated.
 */
function setActiveSegmentIndex(
  toolGroupUID: string,
  segmentIndex: number
): void {
  const segmentationInfo = getActiveSegmentationInfo(toolGroupUID)

  if (!segmentationInfo) {
    throw new Error('element does not contain an active segmentation')
  }

  const { volumeUID: segmentationUID } = segmentationInfo
  const activeSegmentationGlobalState =
    getGlobalSegmentationDataByUID(segmentationUID)

  if (activeSegmentationGlobalState?.activeSegmentIndex !== segmentIndex) {
    activeSegmentationGlobalState.activeSegmentIndex = segmentIndex

    triggerSegmentationGlobalStateModified(segmentationUID)
  }
}

/**
 * Set the active segment index for a segmentation UID. It fires a global state
 * modified event.
 *
 * @event {SEGMENTATION_GLOBAL_STATE_MODIFIED}
 * @param {string} segmentationUID - The UID of the segmentation that the segment
 * belongs to.
 * @param {number} segmentIndex - The index of the segment to be activated.
 */
function setActiveSegmentIndexForSegmentation(
  segmentationUID: string,
  segmentIndex: number
): void {
  const activeSegmentationGlobalState =
    getGlobalSegmentationDataByUID(segmentationUID)

  if (activeSegmentationGlobalState?.activeSegmentIndex !== segmentIndex) {
    activeSegmentationGlobalState.activeSegmentIndex = segmentIndex

    triggerSegmentationGlobalStateModified(segmentationUID)
  }
}

/**
 * Get the active segment index for a segmentation in the global state
 * @param {string} segmentationUID - The UID of the segmentation to get the active
 * segment index from.
 * @returns The active segment index for the given segmentation.
 */
function getActiveSegmentIndexForSegmentation(
  segmentationUID: string
): number | undefined {
  const activeSegmentationGlobalState =
    getGlobalSegmentationDataByUID(segmentationUID)

  if (activeSegmentationGlobalState) {
    return activeSegmentationGlobalState.activeSegmentIndex
  }
}

export default {
  // toolGroup Active Segmentation
  getActiveSegmentIndex,
  setActiveSegmentIndex,
  // global segmentation
  getActiveSegmentIndexForSegmentation,
  setActiveSegmentIndexForSegmentation,
}

export {
  // toolGroup Active Segmentation
  getActiveSegmentIndex,
  setActiveSegmentIndex,
  // global segmentation
  getActiveSegmentIndexForSegmentation,
  setActiveSegmentIndexForSegmentation,
}