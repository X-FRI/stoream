mod capacity;
mod cat;
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
mod tree;
use std::path::Path;

use crate::storage::Storage;
use crate::{server::request::Request, storage::directory};
use axum::{extract::Query, http::StatusCode, routing, Json};
use colog::log::info;
use serde::{Deserialize, Serialize};
use serde_json::json;
use tokio_util::io::ReaderStream;

use super::directory::Directory;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct FileSystem {
    pub root: String,
}

impl Storage for FileSystem {
    async fn cat(self, path: String) -> ReaderStream<tokio::fs::File> {
        tokio_util::io::ReaderStream::new(tokio::fs::File::open(path).await.unwrap())
    }

    async fn tree(self, path: String) -> Directory {
        info!("tree directory {}", path);
        unsafe {
            directory::TREE =
                Some(tree::build_directory_structure(Path::new(path.as_str())).unwrap());
            directory::TREE.clone().unwrap()
        }
    }

    async fn capacity(self, directory: Directory) -> f32 {
        unsafe {
            directory::TREE =
                Some(tree::build_directory_structure(Path::new(directory.path.as_str())).unwrap());
        }
        capacity::capacity().await
    }
}

impl Request for FileSystem {
    async fn handlers(self) -> crate::server::request::Handlers {
        let tree = self.clone().tree(self.root).await;

        vec![
            (
                "/tree",
                routing::get(move || async { (StatusCode::OK, Json(tree)) }),
            ),
            (
                "/cat",
                routing::get(move |Query(args): Query<cat::Args>| async { cat::cat(args).await }),
            ),
            (
                "/capacity",
                routing::get(move || async {
                    (
                        StatusCode::OK,
                        Json(json!(
                            {
                                "capacity": capacity::capacity().await
                            }
                        )),
                    )
                }),
            ),
        ]
    }
}
