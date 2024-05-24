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

use std::fs;
use std::io::{self};
use std::path::Path;

use crate::storage::directory::Directory;
use crate::storage::file::File;
use crate::storage::Storage;

use super::FileSystem;

fn get_directory_size(path: &Path) -> io::Result<u64> {
    let mut total_size = 0;
    if path.is_file() {
        return Ok(fs::metadata(path)?.len());
    } else {
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            if path.is_dir() {
                total_size += get_directory_size(&path)?;
            } else {
                total_size += fs::metadata(&path)?.len();
            }
        }
    }
    Ok(total_size)
}

fn build_directory_structure(path: &Path) -> io::Result<Directory> {
    let entries = fs::read_dir(path)?;
    let mut files = vec![];
    let mut directories = vec![];

    for entry in entries {
        let entry = entry?;
        let path = entry.path();

        if path.is_dir() {
            directories.push(build_directory_structure(&path)?);
        } else {
            let metadata = fs::metadata(&path)?;
            let size = metadata.len();
            files.push(File {
                filename: path.file_name().unwrap().to_str().unwrap().to_string(),
                path: path.to_str().unwrap().to_string(),
                size,
            });
        }
    }

    let directory_path = path.to_str().unwrap().to_string();
    let directory_name = path.file_name().unwrap().to_str().unwrap().to_string();
    let size = get_directory_size(path)?;

    Ok(Directory {
        dirname: directory_name,
        path: directory_path,
        size: size,
        files: files,
        sub: directories,
    })
}

impl Storage<FileSystem> for FileSystem {
    fn ls(self, path: String) -> Directory {
        build_directory_structure(Path::new(path.as_str())).unwrap()
    }
}
