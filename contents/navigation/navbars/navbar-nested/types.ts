export type BasePlacement = "bottom" | "left" | "right" | "top"
export type VariationPlacement =
  | "bottom-end"
  | "bottom-start"
  | "left-end"
  | "left-start"
  | "right-end"
  | "right-start"
  | "top-end"
  | "top-start"
export type AutoPlacement = "auto" | "auto-end" | "auto-start"
export type Placement = AutoPlacement | BasePlacement | VariationPlacement
