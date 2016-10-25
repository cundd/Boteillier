//
//  AppDelegate.swift
//  BoteillierUI
//
//  Created by Daniel Corn on 23.10.16.
//
//

import Cocoa
import PerfectHTTPServer

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {

    var server: HTTPServer!
    
    @IBOutlet weak var window: NSWindow!
    @IBOutlet weak var commandOutlet: NSTextField!

    func applicationDidFinishLaunching(_ aNotification: Notification) {
        self.commandOutlet.stringValue = ""
        
        let server = ServerBootstrap.create(withDocumentRoot:Bundle.main.resourcePath! + "/WebApp/dist") {
            key, sent in
            print("Received \(key)")
            DispatchQueue.main.async {
                self.commandOutlet.stringValue = key
            }
        }
        ServerBootstrap.startServerOnNewThread(server)
    }

    func applicationWillTerminate(_ aNotification: Notification) {
        // Insert code here to tear down your application
    }
    
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
}

