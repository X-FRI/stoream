use serde::{Deserialize, Serialize};
use std::ffi::OsString;
use std::fs::{self, read_dir};
use std::io::ErrorKind;
use std::path::PathBuf;
use std::{env, io};

use crate::{server, storage};

#[derive(Serialize, Deserialize, Debug)]
pub struct Config {
    pub server: server::Config,
    pub storage: storage::Config,
}

impl Config {
    fn with_log(self) -> Self {
        self
    }

    pub fn init() -> Self {
        serde_json::from_str::<Config>(
            fs::read_to_string(get_project_root().unwrap().join("stoream-engine.json"))
                .unwrap()
                .as_str(),
        )
        .unwrap()
        .with_log()
    }
}

/// Get the project root (relative to closest Cargo.lock file)
fn get_project_root() -> io::Result<PathBuf> {
    let path = env::current_dir()?;
    let mut path_ancestors = path.as_path().ancestors();

    while let Some(p) = path_ancestors.next() {
        let has_cargo = read_dir(p)?
            .into_iter()
            .any(|p| p.unwrap().file_name() == OsString::from("Cargo.lock"));
        if has_cargo {
            return Ok(PathBuf::from(p));
        }
    }
    Err(io::Error::new(
        ErrorKind::NotFound,
        "Ran out of places to find Cargo.toml",
    ))
}
