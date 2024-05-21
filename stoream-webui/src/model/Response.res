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

@genType
module User = {
  /// Get the status value from the response returned by engine
  let status = (response: Js.Json.t): result<string, Errors.t> => {
    switch response
    ->Js.Json.decodeObject
    ->Option.flatMap(response => {
      response
      ->Js_dict.get("status")
      ->Option.flatMap(status => {
        switch status {
        | Js.Json.String(status) => Some(status)
        | _ => None
        }
      })
    }) {
    | Some(status) => Ok(status)
    | None => Error(Errors.User(Errors.User.CannotGetTheStatus))
    }
  }
}

@genType
module FileTree = {
  @genType.import("./FileTree.gen.tsx")
  type t

  /// Get the file name in the path.
  /// NOTE: Backslashes may be used as path separators in the paths returned by engine on Windows.
  let basename = (path: string): result<string, Errors.t> => {
    let path_array = String.split(path, "/")
    Array.reverse(path_array)
    switch path_array[0] {
    | Some(path) => Ok(path)
    | None => Error(Errors.FileTree(Errors.FileTree.CannotGetTheBasename(path)))
    }
  }

  /// Convert the response returned by engine to FileTree.t
  let toFolderList = (response: Js.Json.t, path: string): result<FileTree.t, Errors.t> => {
    switch response {
    | Js.Json.Array(folderList) =>
      basename(path)->Result.map(name => {
        open FileTree
        {name, sub: folderList->Array.map(from_json), path}
      })
    | _ => Error(Errors.Request(Errors.Request.RequestError))
    }
  }
}
