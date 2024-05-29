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

module Directory = {
  let tree = async (): Directory.t => {
    await Fetch.fetch(`/tree`, {mode: #cors})
    ->Promise.then(Fetch.Response.json)
    ->Promise.thenResolve(response =>
      response->Js.Json.decodeObject->Option.getExn->Response.Directory.parse
    )
  }

  let capacity = async (): float => {
    await Fetch.fetch(`/capacity`, {mode: #cors})
    ->Promise.then(Fetch.Response.json)
    ->Promise.thenResolve(response =>
      switch response->Js.Json.decodeObject->Option.getExn->Js_dict.get("Capacity") {
      | Some(Js.Json.Number(capacity)) => capacity
      | _ => Js.Exn.raiseError("Cannot get the capacity")
      }
    )
  }

  let createdir = async (path: string): unit => {
    await Fetch.fetch(`/createdir?path=${path}`, {mode: #cors})
    ->Promise.then(Fetch.Response.json)
    ->Promise.thenResolve(response => {
      response
      ->Response.parseStatus
      ->(
        status => {
          switch status {
          | "OK" => ()
          | _ => Js.Exn.raiseError(`Cannot create directory at ${path}`)
          }
        }
      )
    })
  }

  let deletedir = async (path: string): unit => {
    await Fetch.fetch(`/deletedir?path=${path}`, {mode: #cors})
    ->Promise.then(Fetch.Response.json)
    ->Promise.thenResolve(response => {
      response
      ->Response.parseStatus
      ->(
        status => {
          switch status {
          | "OK" => ()
          | _ => Js.Exn.raiseError(`Cannot create directory at ${path}`)
          }
        }
      )
    })
  }
}

module File = {
  let cat = async (file: File.t): Fetch.Blob.t => {
    await Fetch.fetch(
      `/cat?path=${file.filepath}`,
      {mode: #cors},
    )->Promise.then(Fetch.Response.blob)
  }

  let upload = async (filename: string, directory: string, filevalue: Fetch.FormData.t) => {
    await Fetch.fetch(
      `/upload?path=${directory}/${filename}`,
      {
        method: #POST,
        mode: #cors,
        body: filevalue->Fetch.Body.formData,
      },
    )
    ->Promise.then(Fetch.Response.json)
    ->Promise.thenResolve(response => {
      response
      ->Response.parseStatus
      ->(
        status => {
          switch status {
          | "OK" => ()
          | _ => Js.Exn.raiseError(`Cannot upload file ${filename} to ${directory}`)
          }
        }
      )
    })
  }

  let deletefile = async (path: string): unit => {
    await Fetch.fetch(`/deletefile?path=${path}`, {mode: #cors})
    ->Promise.then(Fetch.Response.json)
    ->Promise.thenResolve(response => {
      response
      ->Response.parseStatus
      ->(
        status => {
          switch status {
          | "OK" => ()
          | _ => Js.Exn.raiseError(`Cannot create directory at ${path}`)
          }
        }
      )
    })
  }
}

module User = {
  open User

  let request = async (user: User.t): unit => {
    await user
    ->Encrypted.encryptedUser
    ->(
      async user =>
        await Fetch.fetch(
          `/login?username=${user.username}&password=${user.password}`,
          {mode: #cors},
        )
        ->Promise.then(Fetch.Response.json)
        ->Promise.thenResolve(response => {
          response
          ->Response.parseStatus
          ->(
            status => {
              switch status {
              | "OK" => ()
              | _ => failwith("Wrong username or password")
              }
            }
          )
        })
    )
  }
}
