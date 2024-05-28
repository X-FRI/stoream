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

@genType.as("Directory")
type rec t = {
  name: string,
  size: int,
  sub: array<t>,
  path: string,
  files: array<File.t>,
}

let findFile = (dir: t, filename: string): array<File.t> => {
  let rec __find = (dir: t, files: array<File.t>): array<File.t> => {
    switch dir.files->Array.find(file => file.filename == filename) {
    | Some(file) => files->Array.concat([file])
    | None =>
      if dir.sub->Array.length == 0 {
        []
      } else {
        dir.sub
        ->Array.map(sub => __find(sub, files)->Array.concat(files))
        ->Array.flat
      }
    }
  }

  __find(dir, [])
}

let flatFile = (dir: t): array<File.t> => {
  let rec __flat = (dir: t, files: array<File.t>): array<File.t> => {
    dir.files->Array.concat(
      dir.sub
      ->Array.map(sub => __flat(sub, files)->Array.concat(files))
      ->Array.flat,
    )
  }
  __flat(dir, [])
}

let stringOfDirectorySize = File.stringOfFileSize

/** Slice the dir tree structure based on the provided path */
let slice = (dir: t, path: string): t => {
  if dir.path == path {
    dir
  } else {
    let path = path->String.split("/")->Array.sliceToEnd(~start=1)
    let rec __slice = (dir: t, progres: int): t => {
      switch path[progres] {
      | None => dir
      | Some(path) =>
        if dir.name == path {
          dir
        } else {
          __slice(
            switch dir.sub->Array.find(sub => sub.name == path) {
            | Some(dir) => dir
            | None => dir
            },
            progres + 1,
          )
        }
      }
    }
    __slice(dir, 0)
  }
}

/** Calculate the file type proportion of all files in dir */
let calculateFileTypeProportion = (dir: t) => {
  let rec __calculateFileTypeProportion = (
    ~init: FileType.proportion={image: 0, document: 0, video: 0, audio: 0, other: 0},
    dir: t,
  ): FileType.proportion => {
    open FileType

    let __calculateFiles = (~init: FileType.proportion, files: array<File.t>) => {
      files->Array.reduce(init, (proportion, file) => {
        switch FileType.Suffix.getType(file.filename) {
        | FileType.Image => {...proportion, image: proportion.image + 1}
        | FileType.Document => {...proportion, document: proportion.document + 1}
        | FileType.Video => {...proportion, video: proportion.video + 1}
        | FileType.Audio => {...proportion, audio: proportion.audio + 1}
        | FileType.Other => {...proportion, other: proportion.other + 1}
        }
      })
    }

    dir.sub->Array.reduce(init, (proportion, dir) => {
      __calculateFileTypeProportion(~init=__calculateFiles(~init=proportion, dir.files), dir)
    })
  }

  __calculateFileTypeProportion(dir)
}
