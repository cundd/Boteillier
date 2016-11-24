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

    let port:UInt16 = 8181
    
    var server: HTTPServer!
    var statusItem: NSStatusItem!
    
    @IBOutlet weak var infoTextOutlet: NSTextField!
    @IBOutlet weak var window: NSWindow!
    @IBOutlet weak var commandOutlet: NSTextField!
    @IBAction func openButtonClicked(_ sender: AnyObject) {
        openLinkInBrowser()
    }
    
    var address: String {
        get {
            let addresses = NetworkService.getIpAddresses()
            
            return addresses.first!
        }
    }
    
    var infoText: String {
        get {
            return "Waiting to serve you on http://\(self.address):\(self.port)/"
        }
    }
    
    func applicationDidFinishLaunching(_ aNotification: Notification) {
        self.commandOutlet.stringValue = ""
        
        print(self.infoText)
        
        let server = ServerBootstrap.create(withDocumentRoot:Bundle.main.resourcePath! + "/WebAppDist", onPort: self.port) {
            key, sent in
            print("Received \(key)")
            DispatchQueue.main.async {
                self.receivedCommand(key, sent)
            }
        }
        ServerBootstrap.startServerOnNewThread(server)
        
        createStatusItem()
        prepareInfoText()
    }
    
    func prepareInfoText() {
        infoTextOutlet.stringValue = self.infoText
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
    }
    
    func clickedStatusItem(_ sender: AnyObject) {
        print("Clicked status item")
        openLinkInBrowser()
    }
    
    func openLinkInBrowser() {
        print("Open http://\(self.address):\(self.port)/")
        let url = URL(string: "http://\(self.address):\(self.port)/")
        
        NSWorkspace.shared().open(url!)
    }
    

    func applicationWillTerminate(_ aNotification: Notification) {
        // Insert code here to tear down your application
    }
    
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
}

