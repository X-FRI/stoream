use std::{thread::sleep, time::Duration};

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
        Router::new().route("/login", get(login).layer(cors)),
    );
    info!("stoream engine started at http://localhost:9993");

    server.await.unwrap();
}

async fn login(Query(user): Query<User>) -> impl IntoResponse {
    info!("{:?}", user);
    sleep(Duration::from_secs(3));
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
