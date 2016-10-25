//
//  KeySender.swift
//  Boteillier
//
//  Created by Daniel Corn on 19/10/16.
//
//

import Foundation

struct KeySender {
    static func send(key: String) -> Bool {
        let eventSource = CGEventSource(stateID:CGEventSourceStateID.hidSystemState)

        let keyCode = KeyCode.enumWith(string: key)

        guard let virtualKey:CGKeyCode = keyCode?.rawValue else {
            return false
        }

        let keyDown = CGEvent(keyboardEventSource: eventSource, virtualKey: virtualKey, keyDown: true)
        let keyUp = CGEvent(keyboardEventSource: eventSource, virtualKey: virtualKey, keyDown: false)


        let loc = CGEventTapLocation.cghidEventTap

        keyDown!.post(tap: loc)
        keyUp!.post(tap: loc)

        return true
    }
}
