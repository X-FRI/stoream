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

impl Storage for FileSystem {
    fn ls(self, path: String) -> super::directory::Directory {
        build_directory_structure(Path::new(path.as_str())).unwrap()
    }
}
