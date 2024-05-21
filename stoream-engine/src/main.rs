use std::{
    env,
    fs::{self, Metadata},
    thread::sleep,
    time::Duration,
};

use axum::{
    extract::Query,
    http::{HeaderValue, StatusCode},
    response::IntoResponse,
    routing::get,
    Json, Router,
};
use colog::log::{error, info};
use serde::{Deserialize, Serialize};
use serde_json::json;
use tower_http::cors::{Any, CorsLayer};

#[derive(Serialize, Deserialize, Debug)]
struct User {
    username: String,
    password: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Path {
    path: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct Folder {
    name: String,
    path: String,
}

#[tokio::main]
async fn main() {
    colog::init();

    let cors = CorsLayer::new()
        .allow_methods(Any)
        .allow_headers(Any)
        .allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap());

    info!("starting stoream engine...");
    let server = axum::serve(
        tokio::net::TcpListener::bind("localhost:9993")
            .await
            .unwrap(),
        Router::new()
            .route("/login", get(login).layer(cors.clone()))
            .route("/path", get(path).layer(cors)),
    );
    info!("stoream engine started at http://localhost:9993");

    server.await.unwrap();
}

fn get_dir_list(path: String) -> Vec<Folder> {
    fs::read_dir(path)
        .unwrap()
        .filter(move |file| {
            file.as_ref()
                .map(|file| std::fs::metadata(file.path()).unwrap())
                .map(|metadata| metadata.is_dir())
                .unwrap()
        })
        .map(|dir| dir.unwrap())
        .map(|dir_entry| Folder {
            name: dir_entry.file_name().to_str().unwrap().to_string(),
            path: dir_entry.path().to_str().unwrap().to_string(),
        })
        .collect::<Vec<_>>()
}

async fn path(Query(path): Query<Path>) -> impl IntoResponse {
    info!("request path {}", path.path);

    (
        StatusCode::OK,
        Json(json!(if path.path.is_empty() {
            get_dir_list((env::args().collect::<Vec<String>>()[1]).clone())
        } else {
            get_dir_list(path.path)
        })),
    )
}

async fn login(Query(user): Query<User>) -> impl IntoResponse {
    info!("{:?}", user);
    info!("request login {}", user.username);
    if user.username == "admin" && user.password == format!("{:x}", md5::compute("admin")) {
        info!("login to user {} successfully", user.username);
        (
            StatusCode::OK,
            Json(json!({
                "status": "OK",
            })),
        )
    } else {
        error!("login to user {} failed, wrong password", user.username);
        (
            StatusCode::OK,
            Json(json!({
                "status": "ERR"
            })),
        )
    }
}
