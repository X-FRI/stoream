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
    @scope("Drawer")
    @module("@geist-ui/core") @react.component
    external make: (~children: React.element) => React.element = "Title"
  }

  module Subtitle = {
    @scope("Drawer")
    @module("@geist-ui/core") @react.component
    external make: (~children: React.element) => React.element = "Subtitle"
  }

  module Content = {
    @scope("Drawer")
    @module("@geist-ui/core") @react.component
    external make: (~children: React.element) => React.element = "Content"
  }
}

module Card = {
  @module("@geist-ui/core") @react.component
  external make: (~children: React.element, ~width: string) => React.element = "Card"

  module Footer = {
    @scope("Card")
    @module("@geist-ui/core") @react.component
    external make: (~children: React.element) => React.element = "Footer"
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
