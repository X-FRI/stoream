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

let parseInt = (response: Js_dict.t<_>, key: string): int => {
  switch response->Js_dict.get(key)->Option.getExn {
  | Js.Json.Number(int) => int->Float.toInt
  | _ => failwith(`Cannot parse ${key} to number`)
  }
}

let parseString = (response: Js_dict.t<_>, key: string): string => {
  switch response->Js_dict.get(key)->Option.getExn {
  | Js.Json.String(str) => str
  | _ => failwith(`Cannot parse ${key} to string`)
  }
}

module User = {
  /// Get the status value from the response returned by engine
  let status = (response: Js.Json.t): string => {
    switch response
    ->Js.Json.decodeObject
    ->Option.getExn
    ->Js_dict.get("status")
    ->Option.getExn {
    | Js.Json.String(status) => status
    | _ => failwith("The status is not string")
    }
  }
}

module File = {
  let parse = (response: Js_dict.t<_>): File.t => {
    open File
    {
      filename: response->parseString("filename"),
      filepath: response->parseString("path"),
      filesize: response->parseInt("size"),
    }
  }
}

module Directory = {
  let files = (response: Js_dict.t<_>) => {
    switch response->Js_dict.get("files")->Option.getExn {
    | Js.Json.Array(files) =>
      files
      ->Array.map(files => Js.Json.decodeObject(files)->Option.getExn)
      ->Array.map(File.parse)
    | _ => failwith(`Cannot parse files from response: ${Js.String.make(response)}`)
    }
  }

  /// Convert the response returned by engine to Directory.t
  let rec parse = (response: Js_dict.t<_>): Directory.t => {
    open Directory
    {
      name: response->parseString("dirname"),
      path: response->parseString("path"),
      size: response->parseInt("size"),
      files: response->files,
      sub: response
      ->Js_dict.get("sub")
      ->Option.getExn
      ->Js.Json.decodeArray
      ->Option.getExn
      ->Array.map(v => Js.Json.decodeObject(v)->Option.getExn->parse),
    }
  }
}
