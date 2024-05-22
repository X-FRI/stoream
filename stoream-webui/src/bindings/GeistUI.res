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

module User = {
  @module("@geist-ui/core") @react.component
  external make: (
    ~children: React.element,
    ~src: string,
    ~name: string,
    ~onClick: 'a => 'a,
    ~scale: float,
  ) => React.element = "User"
}

module Avatar = {
  @module("@geist-ui/core") @react.component
  external make: (~src: string) => React.element = "Avatar"
}

module Drawer = {
  @module("@geist-ui/core") @react.component
  external make: (
    ~children: React.element,
    ~visible: bool,
    ~onClose: 'a => 'a,
    ~placement: string,
  ) => React.element = "Drawer"

  module Title = {
    @module("@geist-ui/core/esm/modal/modal-title") @react.component
    external make: (~children: React.element) => React.element = "default"
  }

  module Subtitle = {
    @module("@geist-ui/core/esm/modal/modal-subtitle") @react.component
    external make: (~children: React.element) => React.element = "default"
  }

  module Content = {
    @module("@geist-ui/core/esm/modal/modal-content") @react.component
    external make: (~children: React.element) => React.element = "default"
  }
}

module Card = {
  @module("@geist-ui/core") @react.component
  external make: (~children: React.element, ~width: string) => React.element = "Card"

  module Footer = {
    @module("@geist-ui/core/esm/card/card-footer") @react.component
    external make: (~children: React.element) => React.element = "default"
  }
}

module Link = {
  @module("@geist-ui/core") @react.component
  external make: (
    ~children: React.element,
    ~icon: bool,
    ~block: bool,
    ~underline: bool,
    ~color: bool,
    ~href: string,
  ) => React.element = "Link"
}

module Text = {
  @module("@geist-ui/core") @react.component
  external make: (~children: React.element, ~h4: bool, ~my: int) => React.element = "Text"
}
