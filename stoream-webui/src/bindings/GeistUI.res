module Tooltip = {
  @module("@geist-ui/core") @react.component
  external make: (
    ~children: React.element,
    @as("type") ~_type: string,
    ~text: string,
    ~placement: string,
  ) => React.element = "Tooltip"
}

module Capacity = {
  @module("@geist-ui/core") @react.component
  external make: (
    ~value: int,
    ~limit: int,
    ~color: string,
    ~width: int,
    ~scale: float,
  ) => React.element = "Capacity"
}