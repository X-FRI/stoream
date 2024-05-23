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

@genType.as("FileType")
type t =
  | Image
  | Document
  | Video
  | Audio
  | Other

/** Proportion of file types, unit is quantity */
@genType.as("FileTypeProportion")
type proportion = {
  image: int,
  document: int,
  video: int,
  audio: int,
  other: int,
}

module Suffix = {
  let image = Set.fromArray(["png", "jpg", "jpeg", "webp", "svg", "gif"])
  let document = Set.fromArray(["pdf", "doc", "docx", "md", "tex", "epub"])
  let video = Set.fromArray(["mkv", "mp4"])
  let audio = Set.fromArray(["mp3", "aac", "wav"])

  let getType = (filename: string): t => {
    switch filename->String.split(".")->Array.last {
    | None => Other
    | Some(suffix) =>
      if Set.has(image, suffix) {
        Image
      } else if Set.has(document, suffix) {
        Document
      } else if Set.has(video, suffix) {
        Video
      } else if Set.has(audio, suffix) {
        Audio
      } else {
        Other
      }
    }
  }
}
