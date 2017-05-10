declare namespace sp {
  enum TransformMode {
    Normal,
    OnlyTranslation,
    NoRotationOrReflection,
    NoScale,
    NoScaleOrReflection,
  }

  enum AttachmentType {
    Region,
    BoundingBox,
    Mesh,
    LinkedMesh,
    Path,
  }

  enum BlendMode {
    Normal,
    Additive,
    Multiply,
    Screen,
  }

  enum TimelineType {
    Rotate,
    Translate,
    Scale,
    Shear,
    Attachment,
    Color,
    Deform,
    Event,
    DrawOrder,
    IKConstraint,
    TransformConstraint,
    PathConstraintPosition,
    PathConstraintSpacing,
    PathConstraintMix,
  }

  export type StartListener = (entry: ITrackEntry) => void
  export type InterruptListener = (entry: ITrackEntry) => void
  export type EndListener = (entry: ITrackEntry) => void
  export type DisposeListener = (entry: ITrackEntry) => void
  export type CompleteListener = (entry: ITrackEntry) => void
  export type EventListener = (entry: ITrackEntry , event: IEvent) => void

  export interface IEventData {
    name: string
    intValue: number
    floatValue: number
    stringValue: string
  }

  export interface IEvent {
    data: IEventData
    intValue: number
    floatValue: number
    stringValue: string
  }

  export interface IBoneData {
    index: number
    name: string
    parent: IBoneData
    length: number
    x: number
    y: number
    rotation: number
    scaleX: number
    scaleY: number
    shearX: number
    shearY: number
    transformMode: TransformMode
  }

  export interface IBone {
    data: IBoneData
    parent: IBone
    x: number
    y: number
    rotation: number
    scaleX: number
    scaleY: number
    shearX: number
    shearY: number
    m00: number
    m01: number
    worldX: number
    m10: number
    m11: number
    worldY: number
  }

  export interface ISkeleton {
    x: number
    y: number
    flipX: boolean
    flipY: boolean
    time: number
    boneCount: number
    slotCount: number
  }

  export interface IAttachment {
    name: string
    type: AttachmentType
  }

  export interface ISlotData {
    name: string
    attachmentName: string
    r: number
    g: number
    b: number
    a: number
    blendMode: BlendMode
    boneData: IBoneData
  }

  export interface ISlot {
    data: ISlotData
    r: number
    g: number
    b: number
    a: number
    bone: IBone
    attachment: IAttachment
  }

  export interface ITimeline {
    type: TimelineType
  }

  export interface IAnimationState {
    timeScale: number
    trackCount: number
  }

  export interface IAnimation {
    duration: number
    timelineCount: number
    name: string
    timelines: ITimeline[]
  }

  export interface ITrackEntry {
    delay: number
    trackIndex: number
    loop: number
    eventThreshold: number
    attachmentThreshold: number
    drawOrderThreshold: number
    animationStart: number
    animationEnd: number
    animationLast: number
    nextAnimationLast: number
    trackTime: number
    trackLast: number
    nextTrackLast: number
    trackEnd: number
    timeScale: number
    alpha: number
    mixTime: number
    mixDuration: number
    mixAlpha: number
    timelinesFirstCount: number
    timelinesRotationCount: number
    animation: IAnimation

    mixingFrom (): ITrackEntry
    next (): ITrackEntry
  }

  export class Skeleton extends cc.Node {
    public static create (): Skeleton
    public constructor (skeletonDataFile: string, atlasFile: string, scale?: number)

    public setBonesToSetupPose (): void
    public setSlotsToSetupPose (): void
    public setToSetupPose (): void
    public updateWorldTransform (): void

    public getAttachment (slotName: string, attachmentName: string): IAttachment
    public setAttachment (slotName: string, attachmentName: string): boolean

    public getDebugSlotsEnabled (): boolean
    public setDebugSlotsEnabled (enabled: boolean): void

    public getBlendFunc (): cc.BlendFunc
    public setBlendFunc (blendFunc: cc.BlendFunc): void

    public getDebugBonesEnabled (): boolean
    public setDebugBonesEnabled (enabled: boolean): void

    public getTimeScale (): number
    public setTimeScale (timeScale: number): void

    public setSkin (skinName: string): void

    public getSkeleton (): ISkeleton

    public findBone (boneName: string): IBone
    public findSlot (slotName: string): ISlot
  }

  export class SkeletonAnimation extends Skeleton {
    public static createWithBinaryFile (skeletonBinaryFile: string, atlasFile: string, scale?: number): SkeletonAnimation
    public static createWithJsonFile (skeletonJsonFile: string, atlasFile: string, scale?: number): SkeletonAnimation

    public addAnimation (trackIndex: number, name: string, loop: boolean): ITrackEntry
    public clearTrack (trackIndex?: number): void
    public clearTracks (): void

    public findAnimation (name: string): IAnimation
    public getCurrent (trackIndex: number): ITrackEntry
    public getState (): IAnimationState
    public setAnimation (trackIndex: number, name: string, loop: boolean, delay?: number): void

    public setCompleteListener (listener: CompleteListener): void
    public setDisposeListener (listener: DisposeListener): void
    public setEndListener (listener: EndListener): void
    public setEventListener (listener: EventListener): void
    public setInterruptListener (listener: InterruptListener): void
    public setStartListener (listener: StartListener): void

    public setTrackCompleteListener (entry: ITrackEntry, listener: CompleteListener): void
    public setTrackDisposeListener (entry: ITrackEntry, listener: DisposeListener): void
    public setTrackEndListener (entry: ITrackEntry, listener: EndListener): void
    public setTrackEventListener (entry: ITrackEntry, listener: EventListener): void
    public setTrackInterruptListener (entry: ITrackEntry, listener: InterruptListener): void
    public setTrackStartListener (entry: ITrackEntry, listener: StartListener): void

    public setMix (fromAnimation: string, toAnimation: string, duration: number): void
  }
}
