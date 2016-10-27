import Foundation

func prompt() {
    print("key code > ", terminator:"")
}



prompt()

_ = ServerBootstrap.create(withDocumentRoot: "", receivedCommandCallback: {_,_ in })

prompt()
while let response = readLine(strippingNewline: true) {
    if response == "quit" {
        break
    }
    if KeySender.send(key: response) {
        let key = KeyCode.enumWith(string: response)!
        print("Insert '\(key)'")
    } else {
        print("Could not determine virtual key for '\(response)'")
    }

    prompt()
}





/*

var locked: Bool = true
let semaphore = DispatchSemaphore(value: 0)

let queue = DispatchQueue(label: "net.cundd.boteillier")
// let queue = DispatchQueue.main

queue.asyncAfter(deadline: .now() + .seconds(2), execute: {
    _ = KeySender.send(key: "space")

//    //let src = CGEventSourceCreate(CGEventSourceStateID(kCGEventSourceStateHIDSystemState)).takeRetainedValue()
//    let src = CGEventSource(stateID:CGEventSourceStateID.hidSystemState)
//
//    //let cmdd = CGEvent(keyboardEventSource: src, virtualKey: 0x38, keyDown: true)
//    //let cmdu = CGEvent(keyboardEventSource: src, virtualKey: 0x38, keyDown: false)
//
//    let key = KeyCode.space
//    let f = "\(key)"
//
//    let fb = KeyCode.enumWith(string: "space")
//    print(f)
//
//    let virtualKey:CGKeyCode = 0x31
//    // (space)
//    let cmdd = CGEvent(keyboardEventSource: src, virtualKey: virtualKey, keyDown: true)
//    let cmdu = CGEvent(keyboardEventSource: src, virtualKey: virtualKey, keyDown: false)
//
//    // // y
//    // let cmdd = CGEvent(keyboardEventSource: src, virtualKey: 0x6, keyDown: true)
//    // let cmdu = CGEvent(keyboardEventSource: src, virtualKey: 0x6, keyDown: false)
//
//    //let spcd = CGEventCreateKeyboardEvent(src, 0x31, true).takeRetainedValue()
//    //let spcu = CGEventCreateKeyboardEvent(src, 0x31, false).takeRetainedValue()
//
//    //CGEventSetFlags(spcd, CGEventFlags(kCGEventFlagMaskCommand));
//    //CGEventSetFlags(spcd, CGEventFlags(kCGEventFlagMaskCommand));
//
//    let loc = CGEventTapLocation.cghidEventTap
//
//    cmdd!.post(tap: loc)
//    //CGEventPost(loc, spcd)
//    //CGEventPost(loc, spcu)
//    cmdu!.post(tap: loc)
//
//    // locked = false
//
//    print("insert \"\(virtualKey)\"")
    sleep(1)
    semaphore.signal()

})

func prompt() {
    print("key code > ", terminator:"")
}

prompt()
while let response = readLine(strippingNewline: true) {
    if KeySender.send(key: response) {
        let key = KeyCode.enumWith(string: response)!
        print("Insert '\(key)'")
    } else {
        print("Could not determine virtual key for '\(response)'")
    }

     prompt()
}


_ = semaphore.wait(timeout: DispatchTime.now() + 5)

// print("hellp")
//
// var i = 0
// while (locked) {
//     i += 1
//     //print("\(i)")
//     usleep(5000)
// }

//
// // Send the key events to paste
// 	CGEventSource source = NULL;
// //	source = CGEventSourceCreate(kCGEventSourceStateCombinedSessionState);
//
// 	CGEventRef vDown, vUp;
// 	vDown	= CGEventCreateKeyboardEvent (source, (CGKeyCode)9,	true);
// 	CGEventSetFlags(vDown, kCGEventFlagMaskCommand);
//
// 	vUp		= CGEventCreateKeyboardEvent (source, (CGKeyCode)9,	false);
// 	CGEventSetFlags(vUp, kCGEventFlagMaskCommand);
//
// 	CGEventPost(kSnipperEventTap, vDown);
// 	CGEventPost(kSnipperEventTap, vUp);
//
// 	CFRelease(vDown);
// 	CFRelease(vUp);

// func myCGEventCallback(proxy: CGEventTapProxy, type: CGEventType, event: CGEvent, refcon: UnsafeMutableRawPointer?) -> Unmanaged<CGEvent>? {
//
//     if [.keyDown , .keyUp].contains(type) {
//         var keyCode = event.getIntegerValueField(.keyboardEventKeycode)
//         if keyCode == 0 {
//             keyCode = 6
//         } else if keyCode == 6 {
//             keyCode = 0
//         }
//         event.setIntegerValueField(.keyboardEventKeycode, value: keyCode)
//     }
//     return Unmanaged.passRetained(event)
// }
//
// let eventMask = (1 << CGEventType.keyDown.rawValue) | (1 << CGEventType.keyUp.rawValue)
// guard let eventTap = CGEvent.tapCreate(tap: .cgSessionEventTap,
//                                       place: .headInsertEventTap,
//                                       options: .defaultTap,
//                                       eventsOfInterest: CGEventMask(eventMask),
//                                       callback: myCGEventCallback,
//                                       userInfo: nil) else {
//                                         print("failed to create event tap")
//                                         exit(1)
// }
//
// let runLoopSource = CFMachPortCreateRunLoopSource(kCFAllocatorDefault, eventTap, 0)
// CFRunLoopAddSource(CFRunLoopGetCurrent(), runLoopSource, .commonModes)
// CGEvent.tapEnable(tap: eventTap, enable: true)
// CFRunLoopRun()
// */
