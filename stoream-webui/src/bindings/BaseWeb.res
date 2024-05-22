/// Copyright (c) 2024 The X-Files Research Institute
///
/// All rights reserved.
///
/// Redistribution and use in source and binary forms, with or without modification,
/// are permitted provided that the following conditions are met:
///
///     * Redistributions of source code must retain the above copyright notice,
///       this list of conditions and the following disclaimer.
///     * Redistributions in binary form must reproduce the above copyright notice,
///       this list of conditions and the following disclaimer in the documentation
///       and/or other materials provided with the distribution.
///     * Neither the name of Stoream nor the names of its contributors
///       may be used to endorse or promote products derived from this software
///       without specific prior written permission.
///
/// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
/// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
/// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
/// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
/// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
/// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
/// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
/// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
/// LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
/// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
/// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/// Base Web is a foundation for initiating, evolving, and unifying web products.
/// See: https://baseweb.design/

module Card = {
  @module("baseui/card") @react.component
  external make: (
    ~children: React.element,
    ~title: string=?,
    ~margin: array<string>=?,
    ~padding: array<string>=?,
  ) => React.element = "Card"
}

module StyledBody = {
  @module("baseui/card") @react.component
  external make: (~children: React.element) => React.element = "StyledBody"
}

module Button = {
  @module("baseui/button") @react.component
  external make: (~children: React.element, ~onClick: 'a => 'a) => React.element = "Button"
}

module Input = {
  @module("baseui/input") @react.component
  external make: (
    ~value: string=?,
    ~onChange: 'a => 'b=?,
    ~placeholder: string=?,
    @as("type") ~_type: string=?,
    ~clearable: bool=?,
    ~clearOnEscape: bool=?,
  ) => React.element = "Input"
}

module FormControl = {
  @module("baseui/form-control") @react.component
  external make: (
    ~children: React.element,
    ~label: string=?,
    ~caption: string=?,
    ~positive: string=?,
    ~error: string=?,
  ) => React.element = "FormControl"
}

module Grid = {
  @module("baseui/layout-grid") @react.component
  external make: (~children: React.element) => React.element = "Grid"
}

module Cell = {
  @module("baseui/layout-grid") @react.component
  external make: (~children: React.element, ~skip: array<int>=?, ~span: array<int>=?) => React.element =
    "Cell"
}

module Block = {
  @module("baseui/block") @react.component
  external make: (
    ~children: React.element,
    ~margin: array<string>=?,
    ~marginTop: string=?,
    ~marginLeft: string=?,
    ~marginRight: string=?,
    ~padding: array<string>=?,
  ) => React.element = "Block"
}
