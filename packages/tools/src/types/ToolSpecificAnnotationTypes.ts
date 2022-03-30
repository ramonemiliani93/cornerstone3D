import type { Types } from '@cornerstonejs/core'
import { Annotation } from './AnnotationTypes'

interface ROICachedStats {
  [targetId: string]: {
    Modality: string
    area: number
    max: number
    mean: number
    stdDev: number
  }
}

export interface RectangleROIAnnotation extends Annotation {
  data: {
    handles: {
      points: Types.Point3[]
      activeHandleIndex: number | null
      textBox: {
        hasMoved: boolean
        worldPosition: Types.Point3
        worldBoundingBox: {
          topLeft: Types.Point3
          topRight: Types.Point3
          bottomLeft: Types.Point3
          bottomRight: Types.Point3
        }
      }
    }
    label: string
    cachedStats?:
      | ROICachedStats
      | {
          projectionPoints?: Types.Point3[]
          projectionPointsImageIds?: string[]
        }
  }
}

export interface ProbeAnnotation extends Annotation {
  data: {
    handles: { points: Types.Point3[] }
    cachedStats: {
      [targetId: string]: {
        Modality: string
        index: Types.Point3
        value: number
      }
    }
    label: string
  }
}

export interface LengthAnnotation extends Annotation {
  data: {
    handles: {
      points: Types.Point3[]
      activeHandleIndex: number | null
      textBox: {
        hasMoved: boolean
        worldPosition: Types.Point3
        worldBoundingBox: {
          topLeft: Types.Point3
          topRight: Types.Point3
          bottomLeft: Types.Point3
          bottomRight: Types.Point3
        }
      }
    }
    label: string
    cachedStats: {
      [targetId: string]: {
        length: number
      }
    }
  }
}

export interface EllipticalROIAnnotation extends Annotation {
  data: {
    handles: {
      points: [Types.Point3, Types.Point3, Types.Point3, Types.Point3] // [bottom, top, left, right]
      activeHandleIndex: number | null
      textBox?: {
        hasMoved: boolean
        worldPosition: Types.Point3
        worldBoundingBox: {
          topLeft: Types.Point3
          topRight: Types.Point3
          bottomLeft: Types.Point3
          bottomRight: Types.Point3
        }
      }
    }
    label: string
    cachedStats?: ROICachedStats
  }
}

export interface BidirectionalAnnotation extends Annotation {
  data: {
    handles: {
      points: Types.Point3[]
      activeHandleIndex: number | null
      textBox: {
        hasMoved: boolean
        worldPosition: Types.Point3
        worldBoundingBox: {
          topLeft: Types.Point3
          topRight: Types.Point3
          bottomLeft: Types.Point3
          bottomRight: Types.Point3
        }
      }
    }
    label: string
    cachedStats: {
      [targetId: string]: {
        length: number
        width: number
      }
    }
  }
}

export interface RectangleROIThresholdAnnotation extends Annotation {
  metadata: {
    cameraPosition?: Types.Point3
    cameraFocalPoint?: Types.Point3
    viewPlaneNormal?: Types.Point3
    viewUp?: Types.Point3
    annotationUID?: string
    FrameOfReferenceUID: string
    referencedImageId?: string
    toolName: string
    enabledElement: Types.IEnabledElement // Todo: how to remove this from the annotation??
    volumeId: string
  }
  data: {
    label: string
    handles: {
      points: Types.Point3[]
      activeHandleIndex: number | null
    }
  }
}

export interface RectangleROIStartEndThresholdAnnotation extends Annotation {
  metadata: {
    cameraPosition?: Types.Point3
    cameraFocalPoint?: Types.Point3
    viewPlaneNormal?: Types.Point3
    viewUp?: Types.Point3
    annotationUID?: string
    FrameOfReferenceUID: string
    referencedImageId?: string
    toolName: string
    enabledElement: any // Todo: how to remove this from the annotation??
    volumeId: string
    spacingInNormal: number
  }
  data: {
    label: string
    startSlice: number
    endSlice: number
    cachedStats: {
      projectionPoints: Types.Point3[][] // first slice p1, p2, p3, p4; second slice p1, p2, p3, p4 ...
      projectionPointsImageIds: string[]
    }
    handles: {
      points: Types.Point3[]
      activeHandleIndex: number | null
    }
  }
}