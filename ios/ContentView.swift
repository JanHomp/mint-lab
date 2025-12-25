import SwiftUI

struct ContentView: View {
    var body: some View {
        WebView()
            .edgesIgnoringSafeArea(.all) // Make it look like a native full-screen app
            .statusBar(hidden: true)
    }
}

#Preview {
    ContentView()
}
