import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()
        return webView
    }
    
    func updateUIView(_ webView: WKWebView, context: Context) {
        // Load the local index.html file
        if let url = Bundle.main.url(forResource: "index", withExtension: "html") {
            // Allowing read access to the directory is important for loading css/js
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        } else {
            // Debug output on screen
            webView.loadHTMLString("<h1 style='font-size:100px'>Fehler: Datei nicht gefunden!</h1><p>Bitte prüfen Sie, ob index.html wirklich im Projekt ist.</p>", baseURL: nil)
        }
    }
}
```
