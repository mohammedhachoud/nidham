// lib.rs — Tauri app setup
// Add any Rust commands or plugins here in the future.

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("error while running Nidham");
}
