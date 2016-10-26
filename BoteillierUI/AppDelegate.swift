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
    var statusItem: NSStatusItem!
    
    @IBOutlet weak var window: NSWindow!
    @IBOutlet weak var commandOutlet: NSTextField!

    func applicationDidFinishLaunching(_ aNotification: Notification) {
        self.commandOutlet.stringValue = ""
        
        let server = ServerBootstrap.create(withDocumentRoot:Bundle.main.resourcePath! + "/WebApp/dist") {
            key, sent in
            print("Received \(key)")
            DispatchQueue.main.async {
                self.receivedCommand(key, sent)
            }
        }
        ServerBootstrap.startServerOnNewThread(server)
        
        createStatusItem()
    }
    
    func receivedCommand(_ key: String, _ sent: Bool) {
        animateReceivedOn(key:key)
        
        DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 1) {
            self.animateReceivedOff()
        }
    }
    
    func animateReceivedOn(key: String) {
        commandOutlet.stringValue = key
        statusItem.image = #imageLiteral(resourceName: "StatusBarIconOutline")
    }
    
    
    func animateReceivedOff() {
        commandOutlet.stringValue = ""
        statusItem.image = #imageLiteral(resourceName: "StatusBarIcon")
    }
    
    func createStatusItem() {
        statusItem = NSStatusBar.system().statusItem(withLength: NSSquareStatusItemLength)
        statusItem.image = #imageLiteral(resourceName: "StatusBarIcon")
        statusItem.alternateImage = #imageLiteral(resourceName: "StatusBarIconOutline")
        
        statusItem.action = #selector(AppDelegate.clickedStatusItem(_:))
        
        print(statusItem.button, statusItem.isEnabled)
    }
    
    func clickedStatusItem(_ sender: AnyObject) {
        print("hello")
    }

    func applicationWillTerminate(_ aNotification: Notification) {
        // Insert code here to tear down your application
    }
    
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
}

